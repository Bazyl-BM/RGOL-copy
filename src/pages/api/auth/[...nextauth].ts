/* eslint-disable no-param-reassign */
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcrypt';
import dotenv from 'dotenv';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@/models/UserModel';
import dbConnect from '@/utils/dbConnect';
import clientPromise from '@/utils/mongodb';

const jwt = require('jsonwebtoken');

dotenv.config();
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
}
async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const user2 = await jwt.verify(
      tokenObject.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (user2.expiresAt < Date.now()) {
      throw new Error('Token is expired');
    }
    const user = await jwt.verify(
      tokenObject.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = generateAccessToken({
      user: user.email,
      expiresAt: Date.now() + 20 * 1000,
    });

    return {
      ...tokenObject,
      accessToken,
      expiresAt: Date.now() + 20 * 1000,
    };
  } catch (error) {
    console.log(error);
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    };
  }
}
export default NextAuth({
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Email & Password
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        });

        // Email Not found
        if (!user) {
          throw new Error('Email is not registered');
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password!
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect');
        }

        const accessToken = generateAccessToken(user.toJSON());
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
        const newUser = {
          email: user.email,
          accessToken,
          refreshToken,
        };
        return newUser;
      },
    }),
  ],
  pages: {
    signIn: '/access/login',
  },
  debug: false,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      // Here we pass accessToken to the client to be used in authentication with your API
      session.accessToken = token.accessToken;
      session.accessTokenExpiry = token.accessTokenExpiry;
      session.error = token.error;

      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // This will only be executed at login. Each next invocation will skip this part.
        token.accessToken = user.accessToken;
        token.expiresAt = Date.now() + 20 * 1000;
        token.refreshToken = user.refreshToken;
      }

      // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.

      // If the token is still valid, just return it.
      if (Date.now() < token.expiresAt - 20 * 1000) {
        return Promise.resolve(token);
      }

      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      token = refreshAccessToken(token);
      return Promise.resolve(token);
    },
  },
  jwt: {
    secret: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
    maxAge: 20,
  },
  secret: 'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=',
});

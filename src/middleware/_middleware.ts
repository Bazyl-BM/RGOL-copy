import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // return early if url isn't supposed to be protected
  if (!req.url.includes('/myAccount')) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.SECRET });
  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.redirect('/access/login');

  // If user is authenticated, continue.
  return NextResponse.next();
}

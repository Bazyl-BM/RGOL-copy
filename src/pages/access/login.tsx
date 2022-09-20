/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import React from 'react';
import styled, { css } from 'styled-components';

import {
  FormField,
  FormFieldInput,
  FormFieldLabel,
} from '@/components/AccordianProduct/AskForm';

export const Wrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;
export const Cointeiner = styled.div`
  padding-bottom: 4.8rem;
  margin-top: 2.4rem;
`;
export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
  justify-content: space-between;
`;
export const LeftItem = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  flex: 0 0 100%;
  max-width: 100%;
  padding-right: 0;
  padding-left: 0;
  @media (min-width: 992px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 1.6rem;
    margin-top: 4.8rem;
  }
  @media (min-width: 768px) {
    padding-right: 1.6rem;
    margin-top: 7.2rem;
  }
`;
export const RightItem = styled.div`
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;

  flex: 0 0 100%;
  max-width: 100%;

  padding-right: 0;
  padding-left: 0;
  margin-top: 4.8rem;
  @media (min-width: 992px) {
    flex: 0 0 41.66667%;
    max-width: 41.66667%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 1.6rem;
  }
  svg {
    height: 20px;
    margin-right: 0.8rem;
    path {
      fill: #86c042;
      height: 20px;
    }
  }
`;
export const Title = styled.h3`
  margin-bottom: 2.4rem;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  font-size: 2rem;
`;
const FacebookStyle = css`
  background-color: #3b5998 !important;
  color: #fff !important;
  border: 2px solid #3b5998 !important;
`;
const GoogleStyle = css`
  background-color: #dd4d3f !important;
  color: #fff !important;
  border: 2px solid #dd4d3f !important;
`;
const PrimaryStyle = css`
  background-color: #86c042;
  border: 2px solid #86c042;
  color: #fff;
  margin: 1.6rem 0 !important;
  :active,
  :hover {
    background-color: #79ae3a;
    border-color: #79ae3a;
    color: #fff;
  }
`;

interface Props {
  facebook?: boolean;
  google?: boolean;
  primary?: boolean;
}
export const Button = styled.button<Props>`
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
    border 0.15s ease-in-out;
  width: 100%;
  display: inline-block;
  margin-bottom: 0.8rem;
  text-align: center;
  vertical-align: middle;
  user-select: none;

  padding: 0.8rem 4.8rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-radius: 0;

  ${(props) => (props.facebook ? FacebookStyle : '')};
  ${(props) => (props.google ? GoogleStyle : '')};
  ${(props) => (props.primary ? PrimaryStyle : '')};
`;
export const LinkButton = styled.a`
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
    border 0.15s ease-in-out;
  width: 100%;
  display: inline-block;
  margin-bottom: 0.8rem;
  text-align: center;
  vertical-align: middle;
  user-select: none;

  padding: 0.8rem 4.8rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-radius: 0;
  background-color: #86c042;
  border: 2px solid #86c042;
  color: #fff;
  margin: 1.6rem 0 !important;
  :active,
  :hover {
    background-color: #79ae3a;
    border-color: #79ae3a;
    color: #fff;
  }
`;
export const ForgotWrap = styled.div`
  text-align: center;
  a {
    text-transform: uppercase;
    text-decoration: underline;
    font-weight: 400;
    display: inline-block;
    color: #000;
    border-bottom: 0;
  }
  p {
    margin: 1rem 0;
  }
`;

const Login = () => {
  const redirectToHome = () => {
    // TODO: redirect to a success register page
    Router.push('/');
  };
  const loginUser = async () => {
    const res: any = await signIn('credentials', {
      redirect: false,
      email: 'bartekmnb@wp.pl',
      password: 'Test@12345',
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };
  return (
    <Wrapper>
      <div>
        <Cointeiner>
          <Flex>
            <LeftItem>
              <div>
                <Title>ZALOGUJ SIĘ</Title>
                <FormField>
                  <FormFieldInput
                    name="email"
                    required
                    maxLength={64}
                    type="email"
                    notFocus
                  />
                  <FormFieldLabel>Adres e-mail</FormFieldLabel>
                </FormField>
                <FormField>
                  <FormFieldInput
                    name="email"
                    required
                    maxLength={64}
                    type="password"
                    notFocus
                  />
                  <FormFieldLabel>Twoje Hasło</FormFieldLabel>
                </FormField>
                <Button primary onClick={() => loginUser()}>
                  Zaloguj się
                </Button>
                <ForgotWrap>
                  <a>Zapomniałem hasła</a>
                  <p>lub</p>
                </ForgotWrap>
                <Button facebook>Zaloguj przez Facebook</Button>
                <Button google>Zaloguj przez Google</Button>
              </div>
            </LeftItem>
            <RightItem>
              <Title>Nie posiadam konta</Title>
              <div>
                <p>
                  <strong>Dzięki założeniu konta będziesz mógł:</strong>
                </p>
                <p>
                  <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                  szybciej zrobić następne zakupy dzięki zapisanym danym
                  adresowym
                </p>
                <p>
                  <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                  śledzić na bieżąco status swojego zamówienia
                </p>
                <p>
                  <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                  sprawdzić historię wszystkich swoich zamówień
                </p>
                <Link passHref href="registration_step1">
                  <LinkButton>Załóż konto</LinkButton>
                </Link>
              </div>
            </RightItem>
          </Flex>
        </Cointeiner>
      </div>
    </Wrapper>
  );
};
export default Login;

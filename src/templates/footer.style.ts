import styled from 'styled-components';

export const Wrapper = styled.footer`
  @media (min-width: 768px) {
    margin-top: 4.8rem !important;
  }
  @media (max-width: 992px) {
    margin-bottom: 55px;
  }
  margin-top: 0;
  font-weight: 200;
  background: #fff;
  font-size: 16px;
`;

export const AccordionWrapper = styled.div`
  background-color: #f2f2f2;
  padding-bottom: 4.8rem;
  padding-top: 4.8rem;
`;
export const AccordionConteiner = styled.div`
  width: 100%;
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
`;
export const AccordionFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Accordiondd = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;
export const ContactWrapper = styled.div`
  @media (min-width: 1200px) {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
    margin-left: 16.66667%;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
  position: relative;
  padding-right: 10px;
  padding-left: 10px;
  width: 100%;
`;

export const SocialMediaList = styled.ul`
  @media (max-width: 992px) {
    justify-content: center;
    margin: 3.2rem 0;
  }
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
  margin: 3.2rem 0 1.6rem;

  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  li {
    :last-child {
      margin-right: 0;
    }
    margin-left: 1.8rem;
    margin-right: 1.8rem;
    @media (max-width: 991.98px) {
      margin-left: 1rem !important;
      margin-right: 1rem !important;
    }
    list-style: none;
    a {
      display: block;
      border: 0;
      line-height: 1;
      cursor: pointer;
      font-weight: 400;
      text-transform: uppercase;
      transition: color 0.25s;
      color: #000;
      :hover {
        color: #86c042;
      }
      svg {
        width: 23px;
        height: 23px;
      }
    }
  }
`;

export const UnderFooterWrapper = styled.div`
  padding: 1.6rem;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 1200px) {
    max-width: 1600px;
  }
  @media (min-width: 992px) and (max-width: 1200px) {
    max-width: 1199px;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    max-width: 991px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    max-width: 767px;
  }
`;
export const UnderFooterFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
  align-items: flex-end;
`;
export const LogoList = styled.div`
  @media (min-width: 992px) {
    justify-content: flex-end;
  }
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 992px) {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
  display: flex;
  justify-content: center;
  margin-top: 4.8rem;
  a {
    :not(:first-child) {
      margin-left: 30px;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
`;
export const LanguageWrapper = styled.div`
  @media (min-width: 992px) {
    order: 1;
    flex: 0 0 50%;
    max-width: 50%;
  }
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

export const LanguageConteiner = styled.div`
  padding-top: 0.5rem;
`;

export const LanguageNavConteiner = styled.div`
  @media (max-width: 991.98px) {
    align-items: center;
    justify-content: center;
  }
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;
export const LanguageSelect = styled.a`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  color: #000;
  text-align: right;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
  ::after {
    position: relative;
    right: 0;
    display: inline-block;
    content: '>';
    margin-left: 1rem;
    font-size: 17px;
    font-weight: 300;
    transition: transform 0.2s ease-in-out 0s;
    transform: rotate(90deg);
  }
  img {
    display: inline-block;
    width: 20px;
    margin-right: 5px;
    vertical-align: middle;
  }
`;
export const LanguageList = styled.ul`
  justify-content: flex-end;
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-top: 0;
  li {
    padding: 0.8rem;
    a {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: 400;
      text-transform: uppercase;
      line-height: 1.5;
      color: #000;
      font-size: 14px;
      transition: color 0.25s;
      :hover {
        color: #86c042;
      }
      img {
        display: inline-block;
        width: 20px;
        margin-right: 5px;
      }
    }
  }
`;
export const BrandWrapper = styled.div`
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  flex: 0 0 100%;
  max-width: 100%;

  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  div {
    margin-top: 1rem;
    background-color: #fff;
    font-size: 12px;
    @media (max-width: 992px) {
      text-align: center;
    }
    a {
      color: #000;
      border-bottom: 0;
    }
  }
`;

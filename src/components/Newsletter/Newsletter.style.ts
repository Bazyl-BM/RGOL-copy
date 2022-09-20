import styled from 'styled-components';

export const NewsletterWrapper = styled.div`
  padding-top: 2.4rem;

  background-color: #fafafa;
`;
export const Newsletter = styled.div`
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
  h3 {
    text-align: center;
    @media (max-width: 1200px) {
      font-size: 18px;
    }
    @media (max-width: 768px) {
      font-size: 16px;
    }
    span {
      background-color: #86c042;
      height: 0.5em;
      width: 0.5em;
      border-radius: 50%;
      display: inline-block;
      margin-right: 0.8rem;
    }
  }
  p {
    text-align: center;
    font-size: 14px;
  }
`;
export const InputEl = styled.input`
  text-align: center;
  border: none;
  border-color: #e0e0e0;

  box-shadow: none;
  outline: none;
  display: block;
  width: 100%;
  height: auto;
  padding: 0.8rem 1.6rem;
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.5;
  color: #495057;
  background-color: #e0e0e0;
  background-clip: padding-box;

  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: visible;
  &:focus + label {
    top: -1.6rem;
    font-size: 80%;
    @media (max-width: 992px) {
      font-size: 70%;
    }
    color: #727272;
  }
`;

export const LabelEl = styled.label`
  top: 1.3rem;
  @media (max-width: 992px) {
    font-size: 90%;
    top: 1.52rem;
  }
  font-size: 100%;
  color: #000;
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  position: absolute;

  pointer-events: none;
  transition: all 0.25s;

  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 500;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ErrorLabel = styled.div`
  text-align: center;
  width: 100%;
  color: #e72b37;
  font-size: 1.2rem;
  font-weight: unset;
`;
export const NewsletterInputWrapper = styled.div`
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
`;
export const NewsletterInput = styled.div`
  padding-right: 0;
  padding-left: 0;
  flex: 0 0 100%;
  margin: auto;
  max-width: 100%;
  position: relative;
  width: 100%;
  @media (min-width: 992px) {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
`;
export const NewsletterFormDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: 0;
  margin-left: 0;
`;
export const NewsletterInputDiv = styled.div`
  padding-right: 0;
  padding-left: 0;
  margin: auto;
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  @media (min-width: 992px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    flex: 0 0 83.33333%;
    max-width: 83.33333%;
  }
`;
export const NewsletterLabelWrapper = styled.div`
  margin-bottom: 0;
  display: block;
  margin-bottom: 2.4rem;
  position: relative;
  padding-top: 0.8rem;
  .not-empty {
    top: -1.6rem !important;
    font-size: 80% !important;
    color: #727272 !important;
  }
`;
export const CheckboxWrapper = styled.div`
  margin-right: 0;
  margin-left: 0;
  display: flex;
  flex-wrap: wrap;
`;
export const CheckboxConteiner = styled.div`
  padding-right: 0;
  padding-left: 0;
  margin: auto;
  flex: 0 0 100%;
  max-width: 100%;

  @media (min-width: 768px) {
    flex: 0 0 66.66667%;
    max-width: 66.66667%;
  }
  position: relative;
  width: 100%;
`;
export const CheckboxDiv = styled.div`
  margin-bottom: 2.4rem;
`;
export const Checkbox = styled.div`
  display: block;
  margin-bottom: 2.4rem;
  position: relative;
  padding-top: 0.8rem;
  div {
    position: relative;
    margin-top: -0.8rem;
    margin-bottom: 0.8rem;
    input {
      position: absolute;
      opacity: 0;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      overflow: visible;
      &:checked + label:before {
        background-color: #e0e0e0;
        border: 1px solid #e0e0e0;
      }
      &:checked + label:after {
        border: 2px solid #000;
        opacity: 1;
      }
      &:focus + label:before {
        outline: none;
        border-color: #86c042;
      }
    }
    label {
      cursor: pointer;
      position: relative;
      margin: 0;
      line-height: 20px;
      display: inline-block;
      ::before {
        content: '';
        background: #e0e0e0;
        border: 1px solid #e0e0e0;
        display: inline-block;
        width: 20px;
        height: 20px;
        position: relative;
        top: 0;
        margin-right: 1em;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 0.25s ease;
      }
      :after {
        content: '';
        display: block;
        width: 5px;
        height: 10px;
        border: solid #fff;
        border-width: 0 1px 1px 0 !important;
        transform: rotate(45deg);
        transition: all 0.25s ease;
        position: absolute;
        top: 3px;
        left: 8px;
        opacity: 0;
      }
      p {
        display: inline;
      }
    }
  }
`;
export const ButtonWrapper = styled.div`
  margin-bottom: 0;
  display: block;
  margin-bottom: 1.5rem;
  position: relative;

  button {
    background-color: #86c042;
    border: 2px solid #86c042;
    color: #fff;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
      border 0.15s ease-in-out;
    width: 100%;
    padding: 1.1rem 5.4rem;
    font-size: 14px;
    &:not(:disabled) {
      cursor: pointer;
    }
    &:hover {
      background-color: #79ae3a;
      border-color: #79ae3a;
      color: #fff;
    }
  }
`;

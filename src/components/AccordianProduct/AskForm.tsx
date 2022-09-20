import type { FieldMetaProps, FormikProps } from 'formik';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import {
  Checkbox,
  CheckboxConteiner,
  CheckboxDiv,
  CheckboxWrapper,
} from '../Newsletter/Newsletter.style';

export const Wrapper = styled.div`
  padding-top: 1.1rem;
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Cointeiner = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;
export const FormField = styled.div`
  display: block;
  margin-bottom: 2.4rem;
  position: relative;
  padding-top: 0.8rem;
`;
interface Props {
  notFocus?: boolean;
  type?: string | undefined;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}
const FocusStyle = css`
  &:not(:focus) + label {
    top: 1.52rem;
    left: 1.6rem;
    font-size: 100%;
    color: #000;
  }
`;
export const FormFieldInput = styled.input<Props & any>`
  border-width: 0;
  border-color: #e0e0e0;
  padding: 0.8rem 1.6rem;
  box-shadow: none;
  outline: none;
  display: block;
  width: 100%;
  height: auto;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.5;
  color: #495057;
  background-color: #e0e0e0;
  background-clip: padding-box;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  :disabled {
    background-color: #fafafa;
    opacity: 1;
    border-width: 0;
  }
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  ${(props) => (props.notFocus ? '' : FocusStyle)};
`;
export const FormFieldLabel = styled.label`
  text-transform: uppercase;
  position: absolute;
  top: -1.6rem;
  left: 0;
  pointer-events: none;
  transition: all 0.25s;
  font-size: 80%;
  color: #727272;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 500;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const FormFieldTextArea = styled.textarea`
  border-width: 0;
  border-color: #e0e0e0;
  padding: 0.8rem 1.6rem;
  box-shadow: none;
  outline: none;
  display: block;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.5;
  color: #495057;
  background-color: #e0e0e0;
  background-clip: padding-box;
  border: 1px solid #e0e0e0;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
export const FormFieldButton = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: #86c042;
  border: 2px solid #86c042;
  color: #fff;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  width: 100%!;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out,
    border 0.15s ease-in-out;
  padding: 0.8rem 4.8rem;
  font-size: 1.4rem;
  line-height: 1.5;
  border-radius: 0;
`;
const AskForm = () => {
  const [message, setMessage] = useState('');
  console.log(message);
  return (
    <Wrapper>
      <Cointeiner>
        <form>
          <div>
            <FormField>
              <FormFieldInput
                name="email"
                required
                maxLength={64}
                type="email"
              />
              <FormFieldLabel>
                <span>*</span>
                Adres e-mail
              </FormFieldLabel>
            </FormField>
            <FormField>
              <div>
                <FormFieldTextArea
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div>Pozostało znaków: {2048 - message.length}</div>
              </div>
              <FormFieldLabel>
                <span>*</span>
                Treść zgłoszenia
              </FormFieldLabel>
            </FormField>
            <FormField>
              <CheckboxWrapper>
                <CheckboxConteiner>
                  <CheckboxDiv>
                    <Checkbox>
                      <div>
                        <input id="checkbox" type="checkbox" />
                        <label htmlFor="checkbox">
                          <p>
                            *Chcę otrzymywać informację handlową o ofercie
                            R-GOL.com na podany adres e-mail.
                          </p>
                        </label>
                      </div>
                    </Checkbox>
                    {/* <ErrorLabel>
                      Pole *Wyrażam zgodę na otrzymywanie drogą mailową
                      (newsletter) informacji o promocjach i nowościach
                      pojawiających się w sklepie. Jest wymagane.
                    </ErrorLabel> */}
                  </CheckboxDiv>
                </CheckboxConteiner>
              </CheckboxWrapper>
            </FormField>
            <FormField>
              <div style={{ textAlign: 'right' }}>
                <FormFieldButton>Wyślij</FormFieldButton>
              </div>
            </FormField>
          </div>
        </form>
      </Cointeiner>
    </Wrapper>
  );
};
export default AskForm;

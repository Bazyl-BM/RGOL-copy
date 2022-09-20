import React, { useState } from 'react';

import {
  ButtonWrapper,
  Checkbox,
  CheckboxConteiner,
  CheckboxDiv,
  CheckboxWrapper,
  InputEl,
  LabelEl,
  Newsletter,
  NewsletterFormDiv,
  NewsletterInput,
  NewsletterInputDiv,
  NewsletterInputWrapper,
  NewsletterLabelWrapper,
  NewsletterWrapper,
} from './Newsletter.style';

const NewsletterSection = () => {
  const [value, setValue] = useState('');
  const [visibility, setVisibility] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    setVisibility(true);
  };

  return (
    <NewsletterWrapper>
      <Newsletter>
        <h3>
          <span></span>Newsletter
        </h3>
        <p>
          Zapisz się na nasz newsletter i dowiedz się jako pierwszy o
          najnowszych promocjach.
        </p>
        <NewsletterInputWrapper>
          <NewsletterInput>
            <form>
              <NewsletterFormDiv>
                <NewsletterInputDiv>
                  <NewsletterLabelWrapper>
                    <InputEl
                      ref={(input) => {
                        if (input && value !== '') {
                          input.focus();
                        }
                      }}
                      type="text"
                      value={value}
                      onChange={handleChange}
                    />
                    <LabelEl className={visibility ? 'not-empty' : ''}>
                      Wpisz adres e-mail
                    </LabelEl>
                    {/* <ErrorLabel>
                    Pole Podaj adres e-mail jest wymagane.
                  </ErrorLabel> */}
                  </NewsletterLabelWrapper>
                </NewsletterInputDiv>
              </NewsletterFormDiv>
              {visibility && (
                <CheckboxWrapper>
                  <CheckboxConteiner>
                    <CheckboxDiv>
                      <Checkbox>
                        <div>
                          <input id="checkbox" type="checkbox" />
                          <label htmlFor="checkbox">
                            <p>
                              *Wyrażam zgodę na otrzymywanie drogą mailową
                              (newsletter) informacji o promocjach i nowościach
                              pojawiających się w sklepie.
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

                    <ButtonWrapper>
                      <button>Subskrybuj</button>
                    </ButtonWrapper>
                  </CheckboxConteiner>
                </CheckboxWrapper>
              )}
            </form>
          </NewsletterInput>
        </NewsletterInputWrapper>
      </Newsletter>
    </NewsletterWrapper>
  );
};
export default NewsletterSection;

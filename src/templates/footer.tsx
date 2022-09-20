import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import NewsletterSection from '@/components/Newsletter/Newsletter';

import FunduszeImg from '../assets/image/fundusze.png';
import PolskaImg from '../assets/image/polska.png';
import UniaImg from '../assets/image/unia.png';
import Accordion from '../components/Accordian/Accordian';
import { accordianData, languageData } from '../components/Accordian/data';
import {
  AccordionConteiner,
  Accordiondd,
  AccordionFlex,
  AccordionWrapper,
  BrandWrapper,
  ContactWrapper,
  LanguageConteiner,
  LanguageList,
  LanguageNavConteiner,
  LanguageSelect,
  LanguageWrapper,
  LogoList,
  SocialMediaList,
  UnderFooterFlex,
  UnderFooterWrapper,
  Wrapper,
} from './footer.style';

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeCountryKey, setActiveCountryKey] = useState('pl');

  const activeCountry = languageData.find(
    (country) => country.key === activeCountryKey
  );

  return (
    <Wrapper>
      <NewsletterSection />
      <AccordionWrapper>
        <AccordionConteiner>
          <AccordionFlex>
            {accordianData.map((info) => (
              <Accordion key={1} title={info.title} links={info.links} />
            ))}
            <ContactWrapper>
              <AccordionFlex>
                <Accordion
                  title={'Kontakt'}
                  content={[
                    'eSklep@R-GOL.com',
                    '+48 22 122 02 90',
                    'Infolinia czynna:',
                    'poniedziałek - piątek 8:00-18:00',
                  ]}
                  isContact
                />
                <Accordiondd>
                  <SocialMediaList>
                    <li>
                      <a>
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li>
                      <a>
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                    <li>
                      <a>
                        <FontAwesomeIcon icon={faTiktok} />
                      </a>
                    </li>
                  </SocialMediaList>
                  <LogoList>
                    <a href="#">
                      <img src={FunduszeImg.src} />
                    </a>
                    <a href="#">
                      <img src={PolskaImg.src} />
                    </a>
                    <a href="#">
                      <img src={UniaImg.src} />
                    </a>
                  </LogoList>
                </Accordiondd>
              </AccordionFlex>
            </ContactWrapper>
          </AccordionFlex>
        </AccordionConteiner>
      </AccordionWrapper>
      <UnderFooterWrapper>
        <UnderFooterFlex>
          <LanguageWrapper>
            <LanguageConteiner>
              <LanguageNavConteiner>
                <LanguageSelect
                  onClick={() => {
                    setIsOpen((prev) => !prev);
                    window.setTimeout(() => {
                      window.scrollTo({
                        top: document.body.scrollHeight,

                        behavior: 'smooth',
                      });
                    }, 10);
                  }}
                >
                  Język (<img src={activeCountry!.image}></img>
                  {activeCountry!.key})
                </LanguageSelect>
                {isOpen && (
                  <LanguageList>
                    {languageData.map((item) => (
                      <li
                        key={item.key}
                        onClick={() => setActiveCountryKey(item.key)}
                      >
                        <a
                          style={
                            item.key === activeCountryKey
                              ? {
                                  borderBottom: '3px solid #000',
                                }
                              : {}
                          }
                        >
                          <img src={item.image}></img>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </LanguageList>
                )}
              </LanguageNavConteiner>
            </LanguageConteiner>
          </LanguageWrapper>
          <BrandWrapper>
            <div>
              Kopia Strony <a href="https://www.r-gol.com">R-gol</a>
              <br />
              Wykonał Bartosz Miazek
            </div>
          </BrandWrapper>
        </UnderFooterFlex>
      </UnderFooterWrapper>
    </Wrapper>
  );
};

export default Footer;

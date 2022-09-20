import React from 'react';

import {
  BasketWrap,
  Breadcrumb,
  Col,
  Conteiner,
  Padding,
  Row,
  Wrapper,
} from '@/pages/basket';

const BasketPageWrap = ({ children, step }) => {
  return (
    <section>
      <Wrapper>
        <Conteiner>
          <BasketWrap>
            <div>
              <Row>
                <Col>
                  <Padding>
                    <div>
                      <Breadcrumb step={step}>
                        <li>
                          <span>Koszyk</span>
                        </li>
                        <li>
                          <span>Dostawa i płatność</span>
                        </li>
                      </Breadcrumb>
                    </div>
                  </Padding>
                </Col>
              </Row>
              {children}
            </div>
          </BasketWrap>
        </Conteiner>
      </Wrapper>
    </section>
  );
};
export default BasketPageWrap;

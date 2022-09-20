import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';

import InpostMap from './InpostMap';

export const Title = styled.label`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  text-align: center;
  display: block;
  color: #000;
  font-size: 2.8rem;
  font-family: Oswald, Fira Sans Extra Condensed, sans-serif;
  line-height: 1.2;
  margin-bottom: 1.6rem;
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  margin-left: -10px;
`;
export const Col = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
  ul {
    max-width: 340px;
    padding-left: 0;
    list-style: none;
    li {
      line-height: 1.8rem;
      :last-of-type {
        margin-top: 0.8rem;
      }
    }
  }
`;
export const NewLocationBnt = styled.a`
  color: #000;
  border-bottom: 0;
`;
const MapView = ({
  mapType,
  setBasketValue,
  deliveryPlace,
  setIsSetInvoke,
  setIsAddressFormOpen,
}) => {
  const MyCustomMap = dynamic(
    () => import('@/components/CustomMap/CustomMap'),
    {
      ssr: false,
    }
  );

  return (
    <>
      <Title>
        {deliveryPlace === null
          ? 'WYBIERZ PUNKT ODBIORU'
          : 'WYBRANY PUNKT DOSTAWY'}
      </Title>
      {mapType === 'InPost Paczkomaty 24/7' && deliveryPlace === null && (
        <InpostMap setDeliveryPlace={setBasketValue} />
      )}
      {mapType === 'DPD Pickup' && deliveryPlace === null && (
        <MyCustomMap setDeliveryPlace={setBasketValue} />
      )}
      {deliveryPlace !== null && mapType === 'InPost Paczkomaty 24/7' && (
        <>
          <Row>
            <Col>
              <ul>
                <li>{deliveryPlace.name}</li>
                <li style={{ fontWeight: '500' }}>
                  {deliveryPlace.address.line1}
                </li>
                <li>{deliveryPlace.address.line2}</li>
                <li>
                  Godziny otwarcia:
                  <div>24/7</div>
                </li>
              </ul>
            </Col>
          </Row>
          <NewLocationBnt
            onClick={() => {
              setBasketValue((prev) => ({ ...prev, deliveryPlace: null }));
              setIsSetInvoke(false);
              setIsAddressFormOpen(false);
            }}
          >
            Wybierz inny punkt dostawy
          </NewLocationBnt>
        </>
      )}
      {deliveryPlace !== null && mapType === 'DPD Pickup' && (
        <>
          <Row>
            <Col>
              <ul>
                <li>PL17279</li>
                <li style={{ fontWeight: '500' }}>{deliveryPlace.name}</li>
                <li style={{ fontWeight: '500' }}>{deliveryPlace.address}</li>
                <li>
                  Godziny otwarcia:
                  <div>
                    pon 08:30 - 16:30, wt 08:30 - 16:30, sr 08:30 - 16:30, czw
                    08:30 - 16:30, pt 08:30 - 16:30
                  </div>
                </li>
              </ul>
            </Col>
          </Row>
          <NewLocationBnt onClick={() => setDeliveryPlace(null)}>
            Wybierz inny punkt dostawy
          </NewLocationBnt>
        </>
      )}
    </>
  );
};

export default MapView;

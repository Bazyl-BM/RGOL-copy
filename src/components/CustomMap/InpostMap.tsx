import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 50vh;
`;

const InpostMap = ({ setDeliveryPlace }) => {
  useEffect(() => {
    window.easyPackAsyncInit = function () {
      easyPack.init({
        mapType: 'osm',
        searchType: 'osm',
      });

      easyPack.mapWidget('easypack-map', function (point) {
        setDeliveryPlace((prev) => ({ ...prev, deliveryPlace: point }));
      });
    };
    if (window.easyPackConfig) {
      easyPack.mapWidget('easypack-map', function (point) {
        setDeliveryPlace((prev) => ({ ...prev, deliveryPlace: point }));
      });
      setTimeout(() => {
        document.querySelector('.loading-icon-wrapper')?.remove();
      }, 1);
    }
    setTimeout(() => {
      document.querySelector('.type-filter')?.remove();
    }, 500);
  }, []);
  return (
    <>
      <MapContainer
        id="easypack-map"
        style={{ width: '100%', height: '50vh' }}
      />
    </>
  );
};

export default InpostMap;

import * as L from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  FormField,
  FormFieldInput,
  FormFieldLabel,
} from '../AccordianProduct/AskForm';
import { data } from './data';

const MapContainer = styled.div`
  width: 100%;
  height: 50vh;
  margin-top: 2rem;
`;

const MyCustomMap = ({ setDeliveryPlace }) => {
  const inputRef = useRef();
  const map = useRef<L.Map>();
  const [place, setPlace] = useState('');

  const clusterLayer = useRef<L.MarkerClusterGroup>();
  const greenIcon = L.icon({
    iconUrl: 'https://www.r-gol.com/static/www/map/default/point.png',

    iconSize: [50, 56], // size of the icon
  });
  useEffect(() => {
    if (map.current) {
      clusterLayer.current?.remove();

      if (clusterLayer && clusterLayer.current) {
        map.current.removeLayer(clusterLayer.current);
        clusterLayer.current?.remove();
      }

      clusterLayer.current = new L1.MarkerClusterGroup();

      data.forEach((v) =>
        L.marker([v.lat, v.lon], {
          icon: greenIcon,
        })
          .bindPopup(
            `<div><div><div class="font-weight-bold"><h6>Punkt</h6> <strong>PL${v.id.slice(
              0,
              5
            )}</strong></div></div></divbr> <strong>DPD Pickup – "${
              v.name
            }"</strong></div> <p class="mb-0">
            ${v.address} <br>
             
        </p> <div class="mt-2"><h6>Godziny otwarcia:</h6> <p>pon 05:30 - 21:30, wt 05:30 - 21:30, sr 05:30 - 21:30, czw 05:30 - 21:30, pt 05:30 - 21:30, sob 05:30 - 21:30</p></div> <div class="mt-3"><button type="button" class="btn btn-primary" tabindex="0">
                Wybierz
            </button></div> <div class="mt-3"><h6>Dodatkowe informacje:</h6> <p> Odbiór w punkcie Pickup, COD, Nadanie opłaconej przesyłki</p></div></div></div>`
          )
          .addTo(clusterLayer.current!)
          .on('popupopen', (a) => {
            const px = map.current.project(a.target._popup._latlng); // find the pixel location on the map where the popup anchor is
            px.y -= a.target._popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
            map.current.panTo(map.current.unproject(px), { animate: true });
            const popUp = a.target.getPopup();
            popUp
              .getElement()
              .querySelector('.btn-primary')
              .addEventListener('click', (e) => {
                setDeliveryPlace((prev) => ({ ...prev, deliveryPlace: v }));
              });
          })
      );

      map.current.addLayer(clusterLayer.current);
    }
  }, [data]);

  useEffect(() => {
    if (!map.current) {
      const mapNode = document.getElementById('mapId');

      map.current = L.map(mapNode).setZoom(11).setView(L.latLng(54.44, 18.41));
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
      }).addTo(map.current);
    }
  }, []);

  useEffect(() => {
    const places = new google.maps.places.Autocomplete(inputRef.current);

    // Set initial restriction to the greater list of countries.
    places.setComponentRestrictions({
      country: ['pl'],
    });
    google.maps.event.addListener(places, 'place_changed', function () {
      const place = places.getPlace();

      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      map.current?.setZoom(13).setView(L.latLng(latitude, longitude));
    });
  }, []);

  return (
    <>
      <FormField>
        <FormFieldInput
          notFocus={place.length !== 0}
          onChange={(e) => setPlace(e.target.value)}
          ref={inputRef}
          placeholder=""
        />
        <FormFieldLabel>Wyszukaj Lokalizację</FormFieldLabel>
        <MapContainer id="mapId" />
      </FormField>
    </>
  );
};

export default MyCustomMap;

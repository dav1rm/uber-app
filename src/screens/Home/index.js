import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from "react-native";
import MapView from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";

import { MAP_API_KEY } from '../../config'

import {
  Container,
  IntineraryArea,
  IntineraryItem,
  IntineraryLabel,
  IntineraryTitle,
  IntineraryPointer,
  IntineraryValue,
  IntineraryPlaceholder,
} from './styles'

const Home = () => {
  const [mapLoc, setMapLoc] = useState({
    center: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    zoom: 16,
    pitch: 0,
    altitude: 0,
    heading: 0,
  });
  const [fromLoc, setFromLoc] = useState();
  const [toLoc, setToLoc] = useState();

  // Refs
  const mapRef = useRef();

  useEffect(() => {
    Geocoder.init(MAP_API_KEY, { language: 'pt-br' });

    getMyCurrentPosition();
  }, []);

  const getMyCurrentPosition = () => {
    Geolocation.getCurrentPosition(async info => {
      const { latitude, longitude } = info.coords;

      const geo = await Geocoder.from(latitude, longitude);

      if(geo.results.length > 0) {
        const loc = {
          name: geo.results[0].formatted_address,
          center: {
            latitude,
            longitude,
          },
          zoom: 16,
          pitch: 0,
          altitude: 0,
          heading: 0,
        };

        setMapLoc(loc);
        setFromLoc(loc);
      }
    }, error => {});
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <MapView ref={mapRef} style={{ flex: 1 }} provider="google" camera={mapLoc} />
      <IntineraryArea>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPointer color="#0000ff" />
              <IntineraryTitle>Origem</IntineraryTitle>
            </IntineraryLabel>
            {fromLoc?.name ? (
                <IntineraryValue>{fromLoc?.name}</IntineraryValue>
              ) : (
                <IntineraryPlaceholder>Escolha um local de origem</IntineraryPlaceholder>
              )
            }
          </>
        </IntineraryItem>
        <IntineraryItem>
          <>
            <IntineraryLabel>
              <IntineraryPointer color="#00ff00"/>
              <IntineraryTitle>Destino</IntineraryTitle>
            </IntineraryLabel>
            {toLoc?.name ? (
                <IntineraryValue>{toLoc?.name}</IntineraryValue>
              ) : (
                <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
              )
            }
          </>
        </IntineraryItem>
      </IntineraryArea>
    </Container>
  );
};

export default Home;

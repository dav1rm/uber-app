import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from "react-native";
import MapView from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import MapViewDirections from 'react-native-maps-directions';

import AddressModal from '../../components/AddressModal';
import { GOOGLE_MAP_API_KEY } from '../../config/dev';
import useRequest from '../../hooks/useRequest';

import {
  Container,
  IntineraryArea,
  IntineraryItem,
  IntineraryLabel,
  IntineraryTitle,
  IntineraryPointer,
  IntineraryValue,
  IntineraryPlaceholder,
  RequestArea,
  RequestDetail,
  RequestTitle,
  RequestValue,
  RequestButtons,
  RequestButton,
  RequestButtonText
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
  const [showDirections, setShowDirections] = useState(false);
  const [requestDistance, setRequestDistance] = useState(0);
  const [requestTime, setRequestTime] = useState(0);
  const [requestPrice, setRequestPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalField, setModalField] = useState('');

  // Refs
  const mapRef = useRef();

  // Hooks
  const request = useRequest();

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY, { language: 'pt-br' });

    getMyCurrentPosition();
  }, []);

  useEffect(() => {
    if(fromLoc && toLoc) {
      setShowDirections(true);
    }
  }, [fromLoc, toLoc]);

  const getMyCurrentPosition = () => {
    Geolocation.getCurrentPosition(async info => {
      // const { latitude, longitude } = info.coords;
      const latitude = -5.80087;
      const longitude = -35.20146;

      const geo = await Geocoder.from(latitude, longitude);

      if(geo.results.length > 0) {
        const loc = {
          name: geo.results[0].formatted_address,
          center: {
            latitude: -5.80087, longitude: -35.20146
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

  const handleFromPress = () => {
    setModalTitle('Escolha uma origem')
    setModalField('from');
    setModalVisible(true);
  };

  const handleToPress = () => {
    setModalTitle('Escolha um destino')
    setModalField('to');
    setModalVisible(true);
  };

  const handleDirectionsReady = async res => {
    const { distance, duration, coordinates } = res;
    const response = await request.getPrice(distance, duration);

    if(!response.error) {
      setRequestPrice(response.price);
    }
    setRequestDistance(distance);
    setRequestTime(duration);

    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: {
        left: 50,
        right: 50,
        bottom: 50,
        top: 550,
      }
    });
  };

  const handleConfirmRequest = () => {
    // TODO
  };

  const handleCancelRequest = () => {
    setToLoc({});
    setShowDirections(false);
    setRequestDistance(0);
    setRequestPrice(0);
    setRequestTime(0);

    setMapLoc(fromLoc);
  };

  const handleMapChange = async () => {
    const cam = await mapRef.current?.getCamera();
    cam.altitude = 0;

    setMapLoc(cam);
  };

  const handleSelectAddress = loc => {
    if(modalField === 'to') {
      setToLoc(loc);
    }else {
      setMapLoc(loc);
      setFromLoc(loc)
    }
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <AddressModal
        title={modalTitle}
        visible={modalVisible}
        setModalVisible={setModalVisible}
        selectAddress={handleSelectAddress}
      />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        provider="google"
        camera={mapLoc}
        onRegionChangeComplete={handleMapChange}
      >
        {fromLoc?.center && (
          <MapView.Marker pinColor="#0000ff" coordinate={fromLoc.center} />
        )}
        {toLoc?.center && (
          <MapView.Marker pinColor="#00ff00" coordinate={toLoc.center} />
        )}
        {showDirections && (
           <MapViewDirections
           origin={fromLoc.center}
           destination={toLoc.center}
           strokeWidth={5}
           strokeColor="black"
           apikey={GOOGLE_MAP_API_KEY}
           onReady={handleDirectionsReady}
         />
        )}
      </MapView>
      <IntineraryArea>
        <IntineraryItem onPress={handleFromPress}>
          <>
            <IntineraryLabel>
              <IntineraryPointer color="#0000ff" />
              <IntineraryTitle>Origem</IntineraryTitle>
            </IntineraryLabel>
            {fromLoc?.name ? (
                <IntineraryValue numberOfLines={2}>{fromLoc?.name}</IntineraryValue>
              ) : (
                <IntineraryPlaceholder>Escolha um local de origem</IntineraryPlaceholder>
              )
            }
          </>
        </IntineraryItem>
        <IntineraryItem onPress={handleToPress}>
          <>
            <IntineraryLabel>
              <IntineraryPointer color="#00ff00"/>
              <IntineraryTitle>Destino</IntineraryTitle>
            </IntineraryLabel>
            {toLoc?.name ? (
                <IntineraryValue numberOfLines={2}>{toLoc?.name}</IntineraryValue>
              ) : (
                <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
              )
            }
          </>
        </IntineraryItem>
        { fromLoc?.center && toLoc?.center && (
          <IntineraryItem>
            <>
              <RequestArea>
                <RequestDetail>
                  <RequestTitle>Distância</RequestTitle>
                  <RequestValue>{requestDistance ? `${requestDistance.toFixed(1)}km` : '---'}</RequestValue>
                </RequestDetail>
                <RequestDetail>
                  <RequestTitle>Tempo</RequestTitle>
                  <RequestValue>{requestTime ? `${requestTime.toFixed(0)}min` : '---'}</RequestValue>
                </RequestDetail>
                <RequestDetail>
                  <RequestTitle>Preço</RequestTitle>
                  <RequestValue>{requestPrice ? `R$ ${requestTime.toFixed(2)}` : '---'}</RequestValue>
                </RequestDetail>
              </RequestArea>
              <RequestButtons>
                <RequestButton onPress={handleConfirmRequest} color="#00ff00">
                  <RequestButtonText color="#111">Solicitar Motorista</RequestButtonText>
                </RequestButton>
                <RequestButton onPress={handleCancelRequest} color="#ff0000">
                  <RequestButtonText>Cancelar</RequestButtonText>
                </RequestButton>
              </RequestButtons>
            </>
          </IntineraryItem>
        )}
      </IntineraryArea>
    </Container>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import Geocoder from "react-native-geocoding";

import { GOOGLE_MAP_API_KEY } from '../../config/dev';

import {
  Content,
  ModalHeader,
  ModalClose,
  ModalCloseText,
  ModalInput,
  ModalResults,
  ModalResult,
  ModalResultText,
} from './styles';

let timer;

const AddressModal = props => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY, { language: 'pt-br' });
  }, []);

  useEffect(() => {
    if(searchText) {
      if(timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const geo = await Geocoder.from(searchText);

        if(geo.results.length > 0) {
          const newResults = geo.results.map(result => {
            return {
              address: result.formatted_address,
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
             };
          });

          setResults(newResults);
        }else {
          setResults([]);
        }
      }, 1000);
    }
  }, [searchText, setResults]);

  const handleCloseAction = () => {
    setResults([]);
    setSearchText('');
    props.setModalVisible(false);
  };

  const handleSelectAddress = result => {
    const loc = {
      name: result.address,
      center: {
        latitude: result.latitude,
        longitude: result.longitude,
      },
      zoom: 16,
      pitch: 0,
      altitude: 0,
      heading: 0,
    };

    props.selectAddress(loc);
    handleCloseAction();
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.visible}
      onRequestClose={handleCloseAction}
    >
      <Content>
        <ModalHeader>
          <ModalClose onPress={handleCloseAction}>
            <ModalCloseText>x</ModalCloseText>
          </ModalClose>
          <ModalInput placeholder={props.title} autoFocus value={searchText} onChangeText={text => setSearchText(text)} />
        </ModalHeader>

        <ModalResults keyboardShouldPersistTaps='handled'>
          {results.map((result, index) => (
            <ModalResult key={index} onPress={() => handleSelectAddress(result)}>
              <ModalResultText>{result.address}</ModalResultText>
            </ModalResult>
          ))}
        </ModalResults>
      </Content>
    </Modal>
  );
}

export default AddressModal;

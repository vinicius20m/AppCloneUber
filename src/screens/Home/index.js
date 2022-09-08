import React, { useRef, useState, useEffect } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { MapsAPI } from '../../config';
import MapView from "react-native-maps";
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import useDevsUberApi from '../../useDevsUberApi';

import AddressModal from "../../components/AddressModal";
import DriverModal from "../../components/DriverModal";

import c from './styled';

const Page = (props) => {
  const map = useRef();
  const api = useDevsUberApi();

  const [mapLoc, setMapLoc] = useState({
    center: {
      latitude: 37.78825,
      longitude: -122.4324
    },
    zoom: 16,
    pitch: 0,
    altitude: 0,
    heading: 0
  });
  const [fromLoc, setFromLoc] = useState({});
  const [toLoc, setToLoc] = useState({});
  const [showDirections, setShowDirections] = useState(false);
  const [requestDistance, setRequestDistance] = useState(0);
  const [requestTime, setRequestTime] = useState(0);
  const [requestPrice, setRequestPrice] = useState(0);

  const [modalTitle, setModalTitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState('');

  const [driverInfo, setDriverInfo] = useState({});
  const [driverModalVisible, setDriverModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fromLoc.center && toLoc.center) {
      setShowDirections(true);
    }
  }, [toLoc]);

  useEffect(() => {
    if (fromLoc.center) {
      setMapLoc(fromLoc);
    }
  }, [fromLoc]);

  const handleFromClick = () => {
    setModalTitle('Escolha uma origem');
    setModalField('from');
    setModalVisible(true);
  };

  const handleToClick = () => {
    setModalTitle('Escolha um destino');
    setModalField('to');
    setModalVisible(true);
  };


  const handleDirectionsReady = async (r) => {
    setRequestDistance(r.distance);
    setRequestTime(r.duration);

    // const priceReq = await api.getRequestPrice(r.distance);
    // if (!priceReq.error) {
    //   setRequestPrice(priceReq.price);
    // }

    map.current.fitToCoordinates(r.coordinates, {
      edgePadding: {
        left: 50,
        right: 50,
        bottom: 20,
        top: 1100
      }
    });
  };

  const handleRequestGo = async () => {
    setLoading(true);
    const driver = await api.findDriver({
      fromlat: fromLoc.center.latitude,
      fromlng: fromLoc.center.longitude,
      tolat: toLoc.center.latitude,
      tolng: toLoc.center.longitude
    });
    setLoading(false);

    if (!driver.error) {
      setDriverInfo(driver.driver);
      setDriverModalVisible(true);

      handleRequestCancel();
    } else {
      alert(driver.error);
    }
  };

  const handleRequestCancel = () => {
    setToLoc({});
    setShowDirections(false);
    setRequestDistance(0);
    setRequestTime(0);
    setRequestPrice(0);

    setMapLoc(fromLoc);
  };

  const handleMapChange = async () => {
    const cam = await map.current.getCamera();
    cam.altitude = 0;
    setMapLoc(cam);
  };

  const handleModalClick = (field, address) => {
    const loc = {
      name: address.address,
      center: {
        latitude: address.latitude,
        longitude: address.longitude
      },
      zoom: 16,
      pitch: 0,
      altitude: 0,
      heading: 0
    };
    console.log(address);
    switch (field) {
      case 'from':
        setFromLoc(loc);
        break;
      case 'to':
        setToLoc(loc);
        break;
    }
  };

  const handleMenu = () => {
    props.navigation.openDrawer();
  };

  return (
    <c.Container>
      <StatusBar barStyle="dark-content" />
      <DriverModal
        driver={driverInfo}
        visible={driverModalVisible}
        visibleAction={setDriverModalVisible}
      />
      <AddressModal
        title={modalTitle}
        visible={modalVisible}
        visibleAction={setModalVisible}
        field={modalField}
        clickAction={handleModalClick}
      />
      <MapView
        ref={map}
        style={{ flex: 1 }}
        provider="google"
        camera={mapLoc}
        onRegionChangeComplete={handleMapChange}
      >

        {fromLoc.center &&
          <MapView.Marker pinColor="black" coordinate={fromLoc.center} />
        }

        {toLoc.center &&
          <MapView.Marker pinColor="black" coordinate={toLoc.center} />
        }

        {showDirections &&
          <MapViewDirections
            origin={fromLoc.center}
            destination={toLoc.center}
            strokeWidth={5}
            strokeColor="black"
            apikey={MapsAPI}
            onReady={handleDirectionsReady}
          />
        }

      </MapView>
      <c.MenuArea onPress={handleMenu} underlayColor="transparent">
        <c.MenuImage source={require('../../assets/menu.png')} />
      </c.MenuArea>
      <c.IntineraryArea>
        <c.IntineraryItem onPress={handleFromClick} underlayColor="#EEE">
          <>
            <c.IntineraryLabel>
              <c.IntineraryPoint color="#0000FF" />
              <c.IntineraryTitle>Origem</c.IntineraryTitle>
            </c.IntineraryLabel>
            {fromLoc.name &&
              <c.IntineraryValue>{fromLoc.name}</c.IntineraryValue>
            }
            {!fromLoc.name &&
              <c.IntineraryPlaceHolder>Escolha um local de origem</c.IntineraryPlaceHolder>
            }
          </>
        </c.IntineraryItem>
        <c.IntineraryItem onPress={handleToClick} underlayColor="#EEE">
          <>
            <c.IntineraryLabel>
              <c.IntineraryPoint color="#00FF00" />
              <c.IntineraryTitle>Destino</c.IntineraryTitle>
            </c.IntineraryLabel>
            {toLoc.name &&
              <c.IntineraryValue>{toLoc.name}</c.IntineraryValue>
            }
            {!toLoc.name &&
              <c.IntineraryPlaceHolder>Escolha um local de destino</c.IntineraryPlaceHolder>
            }
          </>
        </c.IntineraryItem>
        {fromLoc.center && toLoc.center &&
          <c.IntineraryItem>
            <>
              <c.RequestDetails>
                <c.RequestDetail>
                  <c.RequestTitle>Distância</c.RequestTitle>
                  <c.RequestValue>{requestDistance > 0 ? `${requestDistance.toFixed(1)}km` : '--'}</c.RequestValue>
                </c.RequestDetail>
                <c.RequestDetail>
                  <c.RequestTitle>Tempo</c.RequestTitle>
                  <c.RequestValue>{requestTime > 0 ? `${requestTime.toFixed(0)}mins` : '--'}</c.RequestValue>
                </c.RequestDetail>
                <c.RequestDetail>
                  <c.RequestTitle>Preço</c.RequestTitle>
                  <c.RequestValue>{requestPrice > 0 ? `R$ ${requestPrice.toFixed(2)}` : '--'}</c.RequestValue>
                </c.RequestDetail>
              </c.RequestDetails>
              <c.RequestButtons>
                <c.RequestButton color="#00FF00" onPress={handleRequestGo}>
                  <c.RequestButtonText>Solicitar Motorista</c.RequestButtonText>
                </c.RequestButton>
                <c.RequestButton color="#FF0000" onPress={handleRequestCancel}>
                  <c.RequestButtonText>Cancelar</c.RequestButtonText>
                </c.RequestButton>
              </c.RequestButtons>
            </>
          </c.IntineraryItem>
        }
      </c.IntineraryArea>
      {loading &&
        <c.LoadingArea>
          <ActivityIndicator size="large" color="#FFF" />
        </c.LoadingArea>
      }
    </c.Container>
  );
};

export default Page;

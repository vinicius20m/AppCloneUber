import React, { useRef, useState } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";
import useDevsUberApi from '../../useDevsUberApi';

import c from './styled';

const Page = () => {
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

  const [loading, setLoading] = useState(false);

  const handleMapChange = () => {return null;};

  const handleFromClick = () => {return null;};

  const handleToClick = () => {return null;};

  return (
    <c.Container>
      <StatusBar barStyle="dark-content" />
        <MapView
          ref={map}
          style={{ flex: 1 }}
          provider="google"
          camera={mapLoc}
          onRegionChangeComplete={handleMapChange}
        >
      </MapView>
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
                  <RequestTitle>Distância</RequestTitle>
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

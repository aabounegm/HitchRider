import React, { useState } from 'react';
import MapPicker from 'react-google-map-picker';

export interface Coords {
  lng: number;
  lat: number;
}

const DefaultLocation: Coords = { lat: 10, lng: 106 };
const DefaultZoom = 10;

interface Props {
  handleChange: (coords: Coords) => void;
}
const Map = (props: Props) => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat: number, lng: number) {
    setLocation({ lat: lat, lng: lng });
    props.handleChange({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <>
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: '360px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      />
    </>
  );
};

export default Map;

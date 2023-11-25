import { useState } from 'react';
import { FieldHookConfig, useField } from 'formik';
import {
  Map,
  Placemark,
  ZoomControl,
  SearchControl,
  FullscreenControl,
  GeolocationControl,
} from '@pbe/react-yandex-maps';
import type { MapEvent } from 'yandex-maps';
import Modal from 'react-modal';

Modal.setAppElement('body');

type Coords = [lat: number, lng: number];
export interface LocationValues {
  coords: Coords;
  address: string;
}

export default function LocationInput(props: FieldHookConfig<LocationValues>) {
  const [field, meta, helpers] = useField<LocationValues>(props);

  const defaultState = {
    // TODO: get user location as fallback
    // Innopolis
    center: field.value?.coords ?? ([55.751759, 48.746181] as Coords),
    zoom: 14,
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>();
  const [address, setAddress] = useState(field.value?.address ?? '');

  function triggerModal() {
    // helpers.setTouched(!modalIsOpen);
    setIsOpen((open) => !open);
  }

  async function confirm() {
    // TODO: get address from geocoding API
    const address = coords?.toString() ?? '';
    if (coords) {
      await helpers.setValue({
        coords,
        address,
      });
    } else {
      // TODO: set error
    }
    setAddress(address);
    setIsOpen(false);
  }

  // TODO: add title text in modal
  return (
    <>
      <input
        placeholder="Tap to select location..."
        readOnly
        onClick={triggerModal}
        value={address}
      />
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: {
            height: 'fit-content',
            inset: '20px',
            padding: '11px',
            margin: 'auto',
          },
        }}
      >
        <Map
          defaultState={defaultState}
          onClick={(e: MapEvent) => setCoords(e.get('coords'))}
          defaultOptions={{ yandexMapDisablePoiInteractivity: true }}
        >
          {coords && <Placemark geometry={coords} />}
          <SearchControl options={{ float: 'right' }} />
          <FullscreenControl />
          <ZoomControl />
          <GeolocationControl />
        </Map>
        <button className="float-right mt-2 p-2" onClick={confirm}>
          Confirm
        </button>
      </Modal>
    </>
  );
}

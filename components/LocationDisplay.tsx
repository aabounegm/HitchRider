import { useState } from 'react';
import {
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
} from '@pbe/react-yandex-maps';
import Modal from 'react-modal';
import MapIcon from '~icons/fa/map.jsx';

Modal.setAppElement('body');

type Coords = [lat: number, lng: number];

export default function LocationInput({ coords }: { coords: Coords }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function triggerModal() {
    setIsOpen((open) => !open);
  }

  return (
    <>
      <button
        onClick={triggerModal}
        style={{
          padding: '3px 4px',
          borderRadius: '5px',
          backgroundColor: 'var(--tg-theme-hint-color)',
        }}
      >
        <MapIcon />
      </button>
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: {
            height: 'fit-content',
            inset: '15px',
            padding: '11px',
            margin: 'auto',
          },
        }}
      >
        <Map
          defaultState={{
            center: coords,
            zoom: 14,
          }}
          defaultOptions={{ yandexMapDisablePoiInteractivity: true }}
        >
          <Placemark geometry={coords} />
          <FullscreenControl />
          <ZoomControl />
        </Map>
        <button
          className="float-right mt-2 p-2"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </Modal>
    </>
  );
}

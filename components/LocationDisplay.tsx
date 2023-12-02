import { useEffect, useState } from 'react';
import { useYMaps } from '@pbe/react-yandex-maps';
import Modal from 'react-modal';
import MapIcon from '~icons/fa/map.jsx';

Modal.setAppElement('body');

type Coords = [lat: number, lng: number];

export default function LocationInput({ coords }: { coords: Coords }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
  const ymaps = useYMaps([
    'Map',
    'Placemark',
    'control.ZoomControl',
    'control.FullscreenControl',
  ]);

  useEffect(() => {
    if (!ymaps || !mapRef) {
      return;
    }
    const map = new ymaps.Map(mapRef, {
      center: coords,
      zoom: 14,
    });
    map.controls.add(new ymaps.control.ZoomControl());
    map.controls.add(new ymaps.control.FullscreenControl());
    map.geoObjects.add(new ymaps.Placemark(coords, {}));
  }, [ymaps, mapRef]);

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
        <div ref={setMapRef} style={{ width: '320px', height: '240px' }}></div>
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

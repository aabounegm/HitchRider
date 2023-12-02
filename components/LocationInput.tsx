import { useEffect, useState } from 'react';
import { FieldHookConfig, useField } from 'formik';
import { useYMaps } from '@pbe/react-yandex-maps';
import type { MapEvent } from 'yandex-maps';
import Modal from 'react-modal';

Modal.setAppElement('body');

export type Coords = [lat: number, lng: number];
export interface LocationValues {
  coords: Coords;
  address: string;
}

export default function LocationInput(props: FieldHookConfig<LocationValues>) {
  const [field, meta, helpers] = useField<LocationValues>(props);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>();
  const [address, setAddress] = useState(field.value?.address ?? '');
  const [mapRef, setMapRef] = useState<HTMLDivElement | null>(null);
  const ymaps = useYMaps([
    'Map',
    'Placemark',
    'control.ZoomControl',
    'control.FullscreenControl',
    'control.GeolocationControl',
    'control.SearchControl',
  ]);

  useEffect(() => {
    if (!ymaps || !mapRef) {
      return;
    }
    const map = new ymaps.Map(
      mapRef,
      {
        // default to Innopolis
        center: field.value?.coords ?? ([55.751759, 48.746181] as Coords),
        zoom: 14,
      },
      {
        yandexMapDisablePoiInteractivity: true,
      }
    );
    map.controls.add(new ymaps.control.ZoomControl());
    map.controls.add(new ymaps.control.FullscreenControl());
    map.controls.add(new ymaps.control.GeolocationControl());
    map.controls.add(
      new ymaps.control.SearchControl({
        options: { float: 'right', noPlacemark: true },
      })
    );
    let placemark: ymaps.Placemark | undefined;
    map.events.add('click', (e: MapEvent) => {
      const coords: Coords = e.get('coords');
      if (placemark) {
        placemark.geometry?.setCoordinates(coords);
      } else {
        placemark = new ymaps.Placemark(coords, {});
        map.geoObjects.add(placemark);
      }
      setCoords(coords);
    });
  }, [ymaps, mapRef]);

  function triggerModal() {
    // helpers.setTouched(!modalIsOpen);
    setIsOpen((open) => !open);
  }

  async function confirm() {
    let address = coords?.toString() ?? '';
    if (coords) {
      const params = new URLSearchParams({
        lat: coords[0].toString(),
        lon: coords[1].toString(),
      });
      try {
        const res = await fetch('https://geocode.maps.co/reverse?' + params);
        if (!res.ok) {
          throw new Error(await res.text());
        }
        const data = await res.json();
        address = data.display_name;
      } catch (e) {
        console.warn('Could not geocode the given coords:', e);
      }
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

  function cancel() {
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
            inset: '15px',
            padding: '11px',
            margin: 'auto',
          },
        }}
      >
        <div ref={setMapRef} style={{ width: '320px', height: '240px' }}></div>
        <button className="float-right mt-2 ml-2 p-2" onClick={confirm}>
          Confirm
        </button>
        <button
          className="float-right mt-2 p-2 bg-inherit text-inherit"
          onClick={cancel}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}

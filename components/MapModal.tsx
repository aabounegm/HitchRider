import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Map, { type Coords } from '@/components/Map';
import { useState } from 'react';

interface Props {
  open: boolean;
  handleClose: (coords: Coords) => void;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MapModal(props: Props) {
  const [coords, setCoords] = useState<Coords>({ lat: 10, lng: 106 });
  const handleChange = (coords: Coords) => {
    setCoords(coords);
  };

  const handleMapClose = () => {
    props.handleClose(coords);
  };
  return (
    <div className="h-96 w-96">
      <Modal
        open={props.open}
        onClose={handleMapClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Map handleChange={handleChange} />
        </Box>
      </Modal>
    </div>
  );
}

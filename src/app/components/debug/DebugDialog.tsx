import { JSX, useState } from 'react';

// MUI
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { BugReport as DebugIcon } from '@mui/icons-material';

// Redux
import { useStore } from 'react-redux';

const DebugDialog = (): JSX.Element => {
  const [debugOpen, setDebugOpen] = useState(false);

  const store = useStore();

  const handleDebugOpen = (): void => {
    setDebugOpen(true);
  };

  const handleDebugClose = (): void => {
    setDebugOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleDebugOpen}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1100,
        }}
        aria-label='debug'
        color='secondary'
      >
        <DebugIcon />
      </IconButton>

      <Dialog
        open={debugOpen}
        onClose={handleDebugClose}
        fullWidth
        maxWidth='md'
      >
        <DialogTitle>Redux Store (Debug)</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(store.getState(), null, 2)}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDebugClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DebugDialog;

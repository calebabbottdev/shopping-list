// MUI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Components
import { Button } from '../../../layout/Button';

// API Connections
import {
  useGetItemByIdQuery,
  useDeleteItemMutation,
} from '../../../../app/features/items/items-api';

type ItemDialogProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const ItemDialog = ({
  id,
  open,
  onClose,
}: ItemDialogProps): React.JSX.Element => {
  const { data, isLoading } = useGetItemByIdQuery(id, { skip: !open });
  const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation();

  const handleDelete = async () => {
    try {
      await deleteItem(id).unwrap();
      onClose();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
      <DialogTitle>
        Item Details
        <IconButton
          aria-label='delete'
          onClick={handleDelete}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.error.main,
          })}
          disabled={isDeleting}
        >
          <DeleteIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box display='flex' justifyContent='center' mt={2}>
            <CircularProgress />
          </Box>
        ) : data ? (
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant='subtitle2' color='textSecondary'>
                Name
              </Typography>
              <Typography variant='body1'>{data.name}</Typography>
            </Grid>
            <Grid size={12}>
              <Typography variant='subtitle2' color='textSecondary'>
                Quantity
              </Typography>
              <Typography variant='body1'>{data.quantity}</Typography>
            </Grid>
            {data.addedBy?.name && (
              <Grid size={12}>
                <Typography variant='subtitle2' color='textSecondary'>
                  Added By
                </Typography>
                <Typography variant='body1'>{data.addedBy.name}</Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography variant='body2'>Item not found.</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button text='Close' onClick={onClose} color='primary' />
      </DialogActions>
    </Dialog>
  );
};

export default ItemDialog;

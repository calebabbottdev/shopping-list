import { useState } from 'react';

// MUI
import {
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from '@mui/material';

// API Connections
import { useCreateItemMutation } from '../../../../app/features/items/items-api';

// React Hook Form
import { useForm } from 'react-hook-form';

// Layout
import { Button } from '../../../layout/Button';

type AddItemProps = {
  open: boolean;
  onClose: () => void;
};

type ItemData = {
  name: string;
  quantity: number;
};

const AddItem = ({ open, onClose }: AddItemProps): React.JSX.Element => {
  const [error, setError] = useState<string>();

  const [createItem, { isLoading }] = useCreateItemMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ItemData>();

  const onSubmit = async (data: ItemData) => {
    const { name, quantity } = data;

    try {
      await createItem({ name, quantity }).unwrap();
      reset();
      onClose();
    } catch (error: any) {
      setError('There was an error adding your item. Please text Caleb.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add an item</DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={3}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ pt: 1 }}
        >
          <Grid size={12}>
            <TextField
              id='item-name-input'
              label='Item name'
              variant='outlined'
              fullWidth
              {...register('name', { required: true })}
              error={errors.name?.type === 'required'}
              helperText={
                errors.name?.type === 'required' && 'Item name is required'
              }
            />
          </Grid>
          <Grid size={12}>
            <TextField
              id='item-quantity-input'
              type='number'
              label='Quantity'
              variant='outlined'
              defaultValue={1}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              fullWidth
              {...register('quantity', { required: true })}
              error={errors.quantity?.type === 'required'}
              helperText={
                errors.quantity?.type === 'required' &&
                'Item quantity is required'
              }
            />
          </Grid>
          <Grid size={12}>
            {error && <Alert severity='error'>{error}</Alert>}
          </Grid>
          <Grid size={12}>
            <Button
              id='add-item-button'
              text='Add item'
              type='submit'
              variant='contained'
              color='primary'
              disabled={isLoading}
              fullWidth
            />
          </Grid>
          <Grid size={12} sx={{ mt: -2 }}>
            <Button
              id='add-item-cancel-button'
              text='Cancel'
              variant='outlined'
              color='primary'
              onClick={onClose}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddItem;

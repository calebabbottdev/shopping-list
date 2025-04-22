import { useState } from 'react';
import { useCreateItemMutation } from '../features/items/items-api';

export const NewItemForm = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [createItem, { isLoading, isSuccess, error }] = useCreateItemMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const number = Number(quantity);
    await createItem({ item, quantity: number });
    setItem('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder='Item name'
        required
      />
      <input
        value={quantity}
        onChange={(e) => setItem(e.target.value)}
        placeholder='Quantity'
        required
      />
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Item'}
      </button>
      {isSuccess && <p>Item created!</p>}
      {error && <p>Error creating item</p>}
    </form>
  );
};

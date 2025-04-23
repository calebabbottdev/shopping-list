import { useState } from 'react';
import { useCreateItemMutation } from '../app/features/items/items-api';

export const NewItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [createItem, { isLoading, isSuccess, error }] = useCreateItemMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const number = Number(quantity);
    await createItem({ name, quantity: number });
    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Item name'
        required
      />
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
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

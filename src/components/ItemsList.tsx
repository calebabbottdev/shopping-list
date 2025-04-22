import { useGetItemsQuery } from '../features/items/items-api';

export const ItemsList = () => {
  const { data, isLoading, error } = useGetItemsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;

  return (
    <ul>
      {data?.items?.map((item) => (
        <li key={item.id}>
          {item.item} x{item.quantity}
        </li>
      ))}
    </ul>
  );
};

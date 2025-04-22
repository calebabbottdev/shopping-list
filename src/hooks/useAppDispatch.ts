// Redux
import { useDispatch } from 'react-redux';

// App Store
import type { AppDispatch } from '../app/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

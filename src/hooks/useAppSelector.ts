// Redux
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// App Store
import type { RootState } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fecthOrders,
  getFeedLoading,
  getOrders
} from '../../services/slices/feedSlice';
import { Preloader } from '@ui';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getFeedLoading);

  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    // dispatch(fetchIngredients());
    dispatch(fecthOrders());
  }, [dispatch]);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};

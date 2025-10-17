import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fecthOrders, getOrders } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(fecthOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};

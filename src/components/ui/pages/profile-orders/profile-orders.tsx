import { FC } from 'react';
import { getFeedLoading } from '../../../../services/slices/feedSlice';
import styles from './profile-orders.module.css';
import { Preloader } from '@ui';
import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { useSelector } from '../../../../services/store';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const loading = useSelector(getFeedLoading);

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        {loading ? <Preloader /> : <OrdersList orders={orders} />}
      </div>
    </main>
  );
};

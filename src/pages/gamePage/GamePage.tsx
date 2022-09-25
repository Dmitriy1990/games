import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './style.module.css';
import { routes } from '../../constantes/routes';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { AppDispatch } from '../../store/store';
import { fetchGame } from '../../store/gameSlice';
import { Helmet } from 'react-helmet';

export const GamePage = () => {
  const location = useLocation();
  const { data, loading } = useAppSelector((state) => state.game);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGame(location.pathname.replace('/', '')));
  }, [location.pathname]);

  return (
    <div>
      <Helmet>
        <title>{data ? data[1].title : 'Not found'}</title>
      </Helmet>
      <Link className={styles.back} to={routes.main}>
        Home
      </Link>
      <div className={styles.title}>
        <h2>{data ? data[1].title : 'Not found'}</h2>
      </div>
    </div>
  );
};

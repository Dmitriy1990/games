import React, { useContext, useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { AppDispatch } from '../../store/store';
import noData from '../../assets/no-data.jpg';
import { fetchGames, addGames, setBalType, setSelect } from '../../store/gamesSlice';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { routes } from '../../constantes/routes';
import { Helmet } from 'react-helmet';

export const MainPage = () => {
  const { data, loading, partData, provider, balances, select, balType } = useAppSelector(
    (state) => state.games
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGames({ provider: select, balType: balType }));
  }, [balType, select]);

  const add = () => {
    dispatch(addGames());
  };

  const onChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (select !== ev.target.value) dispatch(setSelect(ev.target.value));
  };

  const onChangeBalance = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (balType !== ev.target.value) dispatch(setBalType(ev.target.value));
  };

  return (
    <div className="container">
      <Helmet>
        <title>Games</title>
      </Helmet>
      <div className={styles['select-wrap']}>
        <select className={styles.select} onChange={onChangeSelect} value={select}>
          <option value="">All</option>
          {provider.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
        <select className={styles.select} onChange={onChangeBalance} value={balType}>
          <option value="">All</option>
          {balances.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>
      <p>Total: {data.length}</p>
      <ul className={styles['card-container']}>
        {partData.length ? (
          partData.map((game) => (
            <li key={game[0]} className={styles.card}>
              <Link to={routes.main + game[0]}>
                <div>
                  <img
                    className={styles.img}
                    src={`https://cdn2.softswiss.net/i/s2/${game[0]}.png`}
                    alt={game[1].title}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = noData;
                    }}
                  />
                  <p className={styles['card-title']}>{game[1].title}</p>
                </div>
              </Link>
            </li>
          ))
        ) : loading ? (
          'loading'
        ) : (
          <h2 className={styles['not-found']}>No games found &#9785;</h2>
        )}
      </ul>
      {partData.length ? (
        <div className={styles.center}>
          <button
            className={styles.btn}
            onClick={add}
            disabled={data.length === partData.length || loading}>
            Add Games
          </button>
        </div>
      ) : null}
    </div>
  );
};

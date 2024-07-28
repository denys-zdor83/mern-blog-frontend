import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout())
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link >
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link >
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link >
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
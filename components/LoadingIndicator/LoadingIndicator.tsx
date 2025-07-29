'use client';
import React, { FC } from 'react';
import styles from './LoadingIndicator.module.css';
export const LoadingIndicator: FC<{message?:string}> = ({message='Loading...'}) => (
  <div className={styles.wrapper}><div className={styles.spinner} /><p>{message}</p></div>
);
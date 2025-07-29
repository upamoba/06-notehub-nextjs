'use client';
import React, { FC } from 'react';
import styles from './ErrorMessage.module.css';
export const ErrorMessage: FC<{message?:string}> = ({message='Something went wrong.'}) => (
  <div className={styles.error}>{message}</div>
);
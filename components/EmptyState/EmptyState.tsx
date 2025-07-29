'use client';
import React, { FC } from 'react';
import styles from './EmptyState.module.css';
export const EmptyState: FC<{message?:string}> = ({message='No items.'}) => <p className={styles.text}>{message}</p>;
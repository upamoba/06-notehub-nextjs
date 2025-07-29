'use client';
import React, { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './NoteModal.module.css';
interface Props { children: ReactNode; onClose: () => void; }
const Modal: FC<Props> = ({ children, onClose }) => {
  useEffect(() => { const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h); }, [onClose]);
  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>{children}</div>
    </div>, document.body
  );
};
export default Modal;
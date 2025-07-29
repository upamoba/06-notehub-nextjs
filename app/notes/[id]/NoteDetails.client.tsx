'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import styles from './NoteDetails.module.css';

export default function NoteDetailsClient({ noteId }: { noteId: number }) {
  const { data: note, isLoading, error } = useQuery(['note', noteId], () => fetchNoteById(noteId));
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}><h2>{note.title}</h2></div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
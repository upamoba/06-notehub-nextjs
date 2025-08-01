import React, { FC } from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import styles from './NoteList.module.css';


interface NoteListProps { 
  notes: Note[]; 
}

const NoteList: FC<NoteListProps> = ({ notes }) => {
  const qc = useQueryClient();
  const mut = useMutation<Note, Error, string>({
    mutationFn: (id) => deleteNote(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'],exact: false }),
    onError: (error) => {
      console.error('Error deleting note:', error);
    },
  });
  return (
    <ul className={styles.list}>
      {notes.map(n => (
        <li key={n.id} className={styles.listItem}>
          <h2 className={styles.title}>{n.title}</h2>
          <p className={styles.content}>{n.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{n.tag}</span>
              <Link href={`/notes/${n.id}`} className={styles.link}>
              View details
            </Link>
            <button
              className={styles.button}
              onClick={() => mut.mutate(n.id)}
            >
              Delete
            </button>
          
          </div>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
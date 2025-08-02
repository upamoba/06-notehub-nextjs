'use client';
import React, { FC,useState,useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '../../lib/api';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearcBox/SearchBox'
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ErrorMessage} from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import styles from './NotesPage.module.css';

interface NotesClientProps{
  initialData: FetchNotesResponse;
}

const NotesClient: FC<NotesClientProps> = ({ initialData }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    data = initialData,
    isLoading,
    isError,
  } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,

    initialData: page === 1 && debouncedSearch === '' ? initialData : undefined,
  });

  const notes = data.data;
  const totalPages = data.total_pages;

  return (
    <div className={styles.app}>
      <div className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            activePage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <EmptyState message="No notes found." />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;


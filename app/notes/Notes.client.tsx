'use client';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '../../lib/api';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/Searchbox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ErrorMessage} from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import styles from './NotesPage.module.css';


export default function NotesClient( ) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', { page, perPage: 12, search: debouncedSearch }]
,
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    placeholderData: keepPreviousData,
    
  });

const totalPages = data?.total_pages ?? 1;
 
  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button onClick={() => setIsModalOpen(true)} className={styles.button}>
          Create Note+
        </button>
      </header>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && (data?.data?.length ?? 0) > 0 ? (
        <NoteList notes={data!.data} />
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
}
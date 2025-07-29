'use client';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import type { FetchNotesResponse } from '../../lib/api';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/Searchbox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/NoteModal/NoteModal';
import NoteForm from '../../components/NoteForm/NoteForm';
import {LoadingIndicator} from '../../components/LoadingIndicator/LoadingIndicator';
import {ErrorMessage} from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState } from '../../components/EmptyState/EmptyState';


export default function NotesClient( ) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

const totalPages = data?.meta?.totalPages ?? 1;
 
  return (
    <div>
      <header>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination pageCount={data?.meta.totalPages ?? 1} currentPage={page} onPageChange={setPage} />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
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
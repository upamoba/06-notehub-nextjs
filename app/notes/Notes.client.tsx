'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/Searchbox';
import Pagination from '../../components/Pagination/Pagination';
import NoteList from '../../components/NoteList/NoteList';
import Modal from '../../components/NoteModal/NoteModal';
import NoteForm from '../../components/NoteForm/NoteForm';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

interface Props { dehydratedState: unknown; }
export default function NotesClient({ dehydratedState }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery(
    ['notes', page, debouncedSearch],
    () => fetchNotes(page, 12, debouncedSearch)
  );

  return (
    <div>
      <header>
        <SearchBox value={search} onChange={setSearch} />
        {data?.meta.totalPages > 1 && (
          <Pagination pageCount={data.meta.totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button onClick={() => setIsModalOpen(true)}>Create note +</button>
      </header>

      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage />}

      {!isLoading && data?.data.length ? (
        <NoteList notes={data.data} />
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
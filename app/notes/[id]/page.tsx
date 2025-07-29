import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const qc = new QueryClient();
  await qc.prefetchQuery(['note', id], () => fetchNoteById(id));
  return <NoteDetailsClient dehydratedState={dehydrate(qc)} noteId={id} />;
}
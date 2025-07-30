import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { TanStackProvider } from '../../../components/TanStackProvider/TanStackProvider';

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const noteId = Number(params.id);
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });
  const dehydratedState = dehydrate(qc);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient noteId={noteId} />
    </TanStackProvider>
  );
}

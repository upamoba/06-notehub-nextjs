import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { TanStackProvider } from '../../../components/TanStackProvider/TanStackProvider';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const noteId = Number(id);

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

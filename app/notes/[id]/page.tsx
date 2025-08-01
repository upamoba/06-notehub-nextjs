import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { TanStackProvider } from '../../../components/TanStackProvider/TanStackProvider';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: PageProps) {
  // const noteId = (await params).id;
 const { id: noteId } = await params;
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });
  const dehydratedState = dehydrate(qc);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient noteId={noteId} />
    </TanStackProvider>
  );
}

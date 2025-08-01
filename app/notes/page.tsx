import { dehydrate, QueryClient } from '@tanstack/react-query';
 import { fetchNotes } from '../../lib/api';
import { TanStackProvider } from '../../components/TanStackProvider/TanStackProvider';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();
 await queryClient.prefetchQuery({
  queryKey: ['notes', { page: 1, perPage: 12, search: '' }],
  queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
});


  const dehydratedState = dehydrate(queryClient);
  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NotesClient />
    </TanStackProvider>
  );
}

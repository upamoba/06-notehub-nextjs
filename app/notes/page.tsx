
 import { fetchNotes, type FetchNotesResponse } from '../../lib/api';

import NotesClient from './Notes.client';


export default async function NotesPage() {
 const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    perPage: 12,
    search: '',
  });

  return <NotesClient initialData={initialData} />;
}

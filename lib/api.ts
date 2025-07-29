import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  data: Note[];
  meta: { page: number; perPage: number; totalPages: number; totalItems: number };
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: { page: number; perPage: number; search?: string } = { page, perPage };
  if (search) params.search = search;
  const { data } = await API.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}
export async function createNote(
  payload: CreateNotePayload
): Promise<Note> {
  const { data } = await API.post<Note>('/notes', payload);
  return data;
}

export async function deleteNote(id: number): Promise<Note> {
  const { data } = await API.delete<Note>(`/notes/${id}`);
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await API.get<Note>(`/notes/${id}`);
  return data;
}
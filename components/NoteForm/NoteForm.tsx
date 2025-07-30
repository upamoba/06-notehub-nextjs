'use client';
import React, { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { NoteTag } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import styles from './NoteForm.module.css';



interface Props { onClose: () => void; }
interface Values { 
  title: string;
  content: string;
  tag: NoteTag;
}
const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required()
});
const NoteForm: FC<Props> = ({ onClose }) => {
  const qc = useQueryClient();
  const mut = useMutation({ 
    mutationFn: (v: Values) => createNote(v), onSuccess: () => { 
      qc.invalidateQueries({ queryKey: ['notes'] }); onClose(); } });
  return (
    <Formik<Values> 
    initialValues={{ title: '', content: '', tag: 'Todo', }} 
    validationSchema={schema} 
    onSubmit={(v,{resetForm})=>{mut.mutate(v);
    resetForm();}}>
      {()=> (
        <Form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" className={styles.input}/>
          <ErrorMessage name="title" component="div" className={styles.error}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" id="content" name="content" className={styles.textarea}/>
          <ErrorMessage name="content" component="div" className={styles.error}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field 
          as="select" 
          id="tag" 
          name="tag" 
          className={styles.select}>
            <option>Todo</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Meeting</option>
            <option>Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={styles.error}/>
        </div>
        <div className={styles.actions}>
          <button 
          type="button" 
          onClick={onClose} 
          className={styles.cancelButton}>Cancel
          </button>
          <button 
          type="submit" 
          className={styles.submitButton}
          >Create note</button>
        </div>
      </Form>)}
    </Formik>
  );
};
export default NoteForm;


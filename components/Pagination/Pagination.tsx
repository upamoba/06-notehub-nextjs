import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
interface Props { pageCount: number; currentPage: number; onPageChange: (p: number) => void; }
const Pagination: FC<Props> = ({ pageCount, currentPage, onPageChange }) => (
  <ReactPaginate
    pageCount={pageCount}
    forcePage={currentPage - 1}
    onPageChange={({ selected }) => onPageChange(selected + 1)}
    containerClassName={styles.pagination}
    pageLinkClassName={styles.pageLink}
    activeLinkClassName={styles.active}
    nextLabel=">"
    previousLabel="<"
  />
);
export default Pagination;
import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';


interface PaginationProps {
  totalPages: number;
  activePage: number;
  onPageChange: (p: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  totalPages,
  activePage,
  onPageChange,
}) => (
  <ReactPaginate
    pageCount={totalPages}
    forcePage={activePage - 1}            
   onPageChange={({ selected }) => onPageChange(selected + 1)}
    containerClassName={styles.pagination}
    pageLinkClassName={styles.pageLink}
    activeLinkClassName={styles.active}
    nextLabel=">"
    previousLabel="<"
  />
);

export default Pagination;


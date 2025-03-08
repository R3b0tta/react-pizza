import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

export const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => {
        onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};

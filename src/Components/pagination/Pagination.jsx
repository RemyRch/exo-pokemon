import React from "react";
import {
  PaginationContainer,
  PreviousPage,
  NextPage,
} from "./Pagination.styles";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {

 const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  return (
    <PaginationContainer>
      <PreviousPage onclick={scroll(0, 100)}/>
      <NextPage />
    </PaginationContainer>
  );
};

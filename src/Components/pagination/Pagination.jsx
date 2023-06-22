import React from "react";
import {
  PaginationContainer,
  PreviousPage,
  NextPage,
} from "./Pagination.styles";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <PreviousPage />
      <NextPage />
    </PaginationContainer>
  );
};

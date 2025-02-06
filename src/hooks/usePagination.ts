import React from "react";
import { TableProps } from "../types";

export const usePagination = (data: TableProps[]) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProject = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    currentProject,
    handlePageChange,
  };
};

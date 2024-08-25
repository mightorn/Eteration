"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-8 pb-4">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => handlePageChange(number)}
          variant={number === currentPage ? "" : "outline"}
          className="mx-1"
        >
          {number}
        </Button>
      ))}
    </div>
  );
}

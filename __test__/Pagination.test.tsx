import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

const mockSetCurrentPage = jest.fn();

describe("Pagination Component", () => {
  it("renders pagination buttons correctly", () => {
    render(
      <Pagination
        itemsPerPage={12}
        totalItems={36}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("allows users to navigate between pages", () => {
    render(
      <Pagination
        itemsPerPage={12}
        totalItems={36}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("applies the correct styles to the current page", () => {
    render(
      <Pagination
        itemsPerPage={12}
        totalItems={36}
        currentPage={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText("2")).toHaveClass("bg-primary");
  });
});

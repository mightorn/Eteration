import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/Sidebar";

const mockBrands = ["Apple", "Samsung", "Huawei"];
const mockModels = ["iPhone 11", "Galaxy S20", "P40 Pro"];
const mockSetSelectedBrands = jest.fn();
const mockSetSelectedModels = jest.fn();
const mockSetSortOption = jest.fn();

describe("Sidebar Component", () => {
  beforeEach(() => {
    // Reset mock function calls before each test
    mockSetSelectedBrands.mockClear();
    mockSetSelectedModels.mockClear();
    mockSetSortOption.mockClear();
  });

  it("renders brand and model filters correctly", () => {
    render(
      <Sidebar
        selectedBrands={[]}
        setSelectedBrands={mockSetSelectedBrands}
        selectedModels={[]}
        setSelectedModels={mockSetSelectedModels}
        sortOption=""
        setSortOption={mockSetSortOption}
        brands={mockBrands}
        models={mockModels}
      />
    );

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand)).toBeInTheDocument();
    });

    mockModels.forEach((model) => {
      expect(screen.getByText(model)).toBeInTheDocument();
    });
  });

  it("allows users to select brands and models", () => {
    let selectedBrands = [];
    let selectedModels = [];
  
    const mockSetSelectedBrands = jest.fn((updateFunction) => {
      selectedBrands = typeof updateFunction === 'function' ? updateFunction(selectedBrands) : updateFunction;
    });
  
    const mockSetSelectedModels = jest.fn((updateFunction) => {
      selectedModels = typeof updateFunction === 'function' ? updateFunction(selectedModels) : updateFunction;
    });
  
    render(
      <Sidebar
        selectedBrands={selectedBrands}
        setSelectedBrands={mockSetSelectedBrands}
        selectedModels={selectedModels}
        setSelectedModels={mockSetSelectedModels}
        sortOption=""
        setSortOption={mockSetSortOption}
        brands={mockBrands}
        models={mockModels}
      />
    );
  
    // Select a brand
    const appleCheckbox = screen.getByText("Apple").previousSibling;
    fireEvent.click(appleCheckbox);
  
    expect(mockSetSelectedBrands).toHaveBeenCalledTimes(1);
    expect(selectedBrands).toEqual(expect.arrayContaining(["Apple"]));
  
    // Select a model
    const iphoneCheckbox = screen.getByText("iPhone 11").previousSibling;
    fireEvent.click(iphoneCheckbox);
  
    expect(mockSetSelectedModels).toHaveBeenCalledTimes(1);
    expect(selectedModels).toEqual(expect.arrayContaining(["iPhone 11"]));
  });
  
  
  
  

  it("allows users to select a sort option", () => {
    render(
      <Sidebar
        selectedBrands={[]}
        setSelectedBrands={mockSetSelectedBrands}
        selectedModels={[]}
        setSelectedModels={mockSetSelectedModels}
        sortOption=""
        setSortOption={mockSetSortOption}
        brands={mockBrands}
        models={mockModels}
      />
    );

    // Select a sort option
    fireEvent.click(screen.getByLabelText("Price Low to High"));
    expect(mockSetSortOption).toHaveBeenCalledTimes(1);
    expect(mockSetSortOption).toHaveBeenCalledWith("priceLowToHigh");
  });
});

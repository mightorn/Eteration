"use client";

import React from 'react';
import { Label } from "./ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FilterSidebarProps {
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  brands: string[];
  models: string[];
}

export default function FilterSidebar({
  selectedBrands,
  setSelectedBrands,
  selectedModels,
  setSelectedModels,
  sortOption,
  setSortOption,
  brands,
  models,
}: FilterSidebarProps) {
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(brand) ? prevBrands.filter((b) => b !== brand) : [...prevBrands, brand]
    );
  };
  
  const handleModelChange = (model: string) => {
    setSelectedModels((prevModels) =>
      prevModels.includes(model) ? prevModels.filter((m) => m !== model) : [...prevModels, model]
    );
  };
  

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <Card className="w-64 p-4 bg-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold mb-4">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-bold">Sort By</h3>
          <RadioGroup value={sortOption} onValueChange={handleSortChange}>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem id="sort-oldToNew" value="oldToNew" />
              <Label htmlFor="sort-oldToNew">Old to New</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem id="sort-newToOld" value="newToOld"  />
              <Label htmlFor="sort-newToOld">New to Old</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem id="sort-priceHighToLow" value="priceHighToLow" />
              <Label htmlFor="sort-priceHighToLow">Price High to Low</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <RadioGroupItem id="sort-priceLowToHigh" value="priceLowToHigh" />
              <Label htmlFor="sort-priceLowToHigh">Price Low to High</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Brands</h3>
          <div className="h-32 overflow-y-auto">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mt-2">
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <span className="ml-2">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold">Models</h3>
          <div className="h-32 overflow-y-auto">
            {models.map((model) => (
              <div key={model} className="flex items-center mt-2">
                <Checkbox
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelChange(model)}
                />
                <span className="ml-2">{model}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

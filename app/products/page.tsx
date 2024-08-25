"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import CartSummary from '@/components/CartSummary';
import Pagination from '@/components/Pagination';

interface Product {
    id: string;
    name: string;
    brand: string;
    model: string;
    price: string;
    image: string;
  }
  
  interface CartItem extends Product {
    quantity: number;
  }
  
  export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState('');
    const [brands, setBrands] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [cart, setCart] = useState<CartItem[]>(() => {
      // Load cart from localStorage if available
      const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      return savedCart ? JSON.parse(savedCart) : [];
    });
    const itemsPerPage = 12;
  
    useEffect(() => {
      async function fetchData() {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        const data: Product[] = await res.json();
        setProducts(data);
        setFilteredProducts(data);
  
        // Extract unique brands
        const uniqueBrands = Array.from(new Set(data.map((product) => product.brand)));
        setBrands(uniqueBrands);
      }
      fetchData();
    }, []);
  
    useEffect(() => {
      let filtered = products;
  
      // Apply brand filters and extract models for selected brands
      if (selectedBrands.length > 0) {
        filtered = filtered.filter((product) => selectedBrands.includes(product.brand));
  
        // Extract models based on selected brands
        const filteredModels = Array.from(new Set(filtered.map((product) => product.model)));
        setModels(filteredModels);
      } else {
        // If no brand is selected, show all models
        const allModels = Array.from(new Set(products.map((product) => product.model)));
        setModels(allModels);
      }
  
      // Apply model filters
      if (selectedModels.length > 0) {
        filtered = filtered.filter((product) => selectedModels.includes(product.model));
      }
  
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      // Apply sorting
      switch (sortOption) {
        case 'oldToNew':
          filtered = filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
          break;
        case 'newToOld':
          filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'priceHighToLow':
          filtered = filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case 'priceLowToHigh':
          filtered = filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        default:
          break;
      }
  
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to the first page on new filters
    }, [products, searchTerm, selectedBrands, selectedModels, sortOption]);
  
    // Save cart to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    // Calculate the items to show on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
    // Add to Cart functionality
    const handleAddToCart = (product: Product) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
    };
  
    // Update quantity in cart
    const handleUpdateQuantity = (productId: string, quantity: number) => {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(item.quantity + quantity, 1) } : item
        )
      );
    };
  
    // Remove from cart
    const handleRemoveFromCart = (productId: string) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
  
    return (
      <div>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex">
          <Sidebar
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
            sortOption={sortOption}
            setSortOption={setSortOption}
            brands={brands}
            models={models}
          />
          <main className="flex-1">
            <ProductGrid products={currentProducts} onAddToCart={handleAddToCart} />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredProducts.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </main>
          <CartSummary
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      </div>
    );
  }
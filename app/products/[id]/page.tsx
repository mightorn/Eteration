"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import CartSummary from "@/components/CartSummary";

interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: string;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (id) {
      async function fetchProduct() {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
          const data: Product = await res.json();
          setProduct(data);
        } catch (error) {
          console.error("Failed to fetch product:", error);
        }
      }
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

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

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity + quantity, 1) } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  if (!isMounted || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header searchTerm="" setSearchTerm={() => {}} />
      <div className="flex">
        <div className="flex-1 p-4">
          <Card>
            <div className="md:flex-row lg:flex">
              <img src={product.image} alt={product.name} className="w-1/2 h-1/2 object-cover rounded-md" />
              <div className="ml-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 font-bold mt-4">{product.price}₺</p>
                  <p className="mt-4 font-bold text-gray-600">{product.brand}</p>
                  <p className="mt-4 font-bold text-gray-600">{product.model}</p>
                  <p className="mt-4  text-gray-600">{product.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
        <CartSummary
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </div>
  );
}

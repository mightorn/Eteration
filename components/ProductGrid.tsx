"use client";

import Link from 'next/link';

interface ProductGridProps {
  products: any[];
  onAddToCart: (product: any) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-md shadow-md">
          <Link href={`/products/${product.id}`}>
            <img src={product.image} alt={product.name} className="object-contains rounded-md cursor-pointer" />
          </Link>
          <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
          <p className="text-blue-600 font-bold mt-2">{product.price}₺</p>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

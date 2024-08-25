"use client";

import { Button } from "@/components/ui/button"; // Shadcn Button component
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CartSummaryProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
}

export default function CartSummary({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartSummaryProps) {
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return !isNaN(price) ? sum + item.quantity * price : sum;
  }, 0);

  return (
    <Card className="w-64 bg-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-bold mb-4">Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span className="font-bold">{(item.quantity * parseFloat(item.price)).toFixed(2)}₺</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Button variant="outline" onClick={() => onUpdateQuantity(item.id, -1)}>-</Button>
              <span>{item.quantity}</span>
              <Button variant="outline" onClick={() => onUpdateQuantity(item.id, 1)}>+</Button>
              <Button variant="destructive" onClick={() => onRemoveFromCart(item.id)}>Remove</Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="font-bold">Total Price: {totalPrice.toFixed(2)}₺</div>
        <Button className="mt-4 w-full" >Checkout</Button>
      </CardFooter>
    </Card>
  );
}

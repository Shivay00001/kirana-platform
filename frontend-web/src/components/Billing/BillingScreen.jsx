import React, { useState, useEffect } from 'react';
import ProductSearch from './ProductSearch';
import CartItem from './CartItem';
import { supabase } from '../../services/supabase';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BillingScreen() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const sum = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    }, [cart]);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        toast.success('Added to cart');
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        const saleData = {
            items: cart,
            total: total,
            payment_method: 'cash' // Hardcoded for MVP
        };

        const toastId = toast.loading('Processing Sale...');

        // Import API dynamically or at top (Simpler here to just fetch)
        // Note: In real app, import { api } from ...
        try {
            const res = await fetch('http://localhost:5000/api/sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData)
            });
            const result = await res.json();

            if (result.success) {
                toast.success(`Sale Complete! ID: ${result.sale_id}`, { id: toastId });

                // Generates PDF Invoice
                try {
                    const invoiceGen = await import('../../utils/invoiceGenerator');
                    invoiceGen.generateInvoice({
                        items: cart,
                        total: total,
                        sale_id: result.sale_id
                    });
                } catch (err) {
                    console.error('Invoice generation failed', err);
                    toast.error('Failed to generate PDF');
                }

                setCart([]);
            } else {
                toast.error(`Error: ${result.error}`, { id: toastId });
            }
        } catch (e) {
            toast.error('Failed to connect to server', { id: toastId });
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
            {/* Left: Search & Grid */}
            <div className="w-full md:w-2/3 p-4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    POS / Billing
                </h2>
                <ProductSearch onAddToCart={addToCart} />
            </div>

            {/* Right: Cart */}
            <div className="w-full md:w-1/3 bg-white shadow-xl flex flex-col h-full border-l">
                <div className="p-4 bg-gray-100 border-b">
                    <h2 className="text-xl font-bold">Current Bill</h2>
                    <p className="text-sm text-gray-500">{cart.length} items</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-400 mt-10">
                            Cart is empty
                        </div>
                    ) : (
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={removeFromCart}
                                onUpdateQty={updateQuantity}
                            />
                        ))
                    )}
                </div>

                <div className="p-4 bg-gray-50 border-t">
                    <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={cart.length === 0}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Complete Sale
                    </button>
                </div>
            </div>
        </div>
    );
}

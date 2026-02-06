import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartItem({ item, onRemove, onUpdateQty }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border rounded shadow-sm">
            <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdateQty(item.id, -1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    <Minus size={14} />
                </button>
                <span className="w-6 text-center font-bold">{item.quantity}</span>
                <button
                    onClick={() => onUpdateQty(item.id, 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    <Plus size={14} />
                </button>
            </div>

            <div className="text-right min-w-[60px]">
                <div className="font-bold">₹{(item.price * item.quantity).toFixed(0)}</div>
            </div>

            <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

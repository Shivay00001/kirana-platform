import React, { useState } from 'react';
import { api } from '../../services/api';
import toast from 'react-hot-toast';
import { PackagePlus } from 'lucide-react';

export default function InventoryScreen() {
    const [formData, setFormData] = useState({
        name: '',
        barcode: '',
        price: '',
        stock: '',
        category: 'General'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Adding Product...');

        const payload = {
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };

        const res = await api.addProduct(payload);

        if (res.success) {
            toast.success('Product Added!', { id: toastId });
            setFormData({ name: '', barcode: '', price: '', stock: '', category: 'General' });
        } else {
            toast.error(`Error: ${res.error}`, { id: toastId });
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <PackagePlus className="w-6 h-6 text-blue-600" />
                Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Barcode</label>
                        <input
                            name="barcode"
                            value={formData.barcode}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                        >
                            <option>General</option>
                            <option>Food</option>
                            <option>Grocery</option>
                            <option>Dairy</option>
                            <option>Personal Care</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Stock</label>
                        <input
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-2"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-bold"
                >
                    Add to Inventory
                </button>
            </form>
        </div>
    );
}

```javascript
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../services/api';

export default function ProductSearch({ onAddToCart }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await api.getProducts(query);
      setProducts(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search items or scan barcode..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {loading ? (
          <div className="col-span-3 text-center py-8">Loading...</div>
        ) : (
          products.map(product => (
            <div 
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-white p-4 rounded-lg border hover:shadow-md cursor-pointer transition active:scale-95"
            >
              <h3 className="font-bold text-gray-800">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-green-600 font-bold">₹{Number(product.price).toFixed(2)}</span>
                <span className="text-xs text-gray-500">Stock: {product.stock}</span>
              </div>
            </div>
          ))
        )}
        {!loading && products.length === 0 && (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
```

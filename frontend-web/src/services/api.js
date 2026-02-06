const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    // Products
    async getProducts(query = '') {
        try {
            const res = await fetch(`${API_URL}/products/search?q=${query}`);
            const data = await res.json();
            return data.success ? data.data : [];
        } catch (err) {
            console.error('API Error:', err);
            return [];
        }
    },

    async addProduct(productData) {
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            return await res.json();
        } catch (err) {
            console.error('API Error:', err);
            return { success: false, error: err.message };
        }
    },

    // Sales
    async createSale(saleData) {
        try {
            const res = await fetch(`${API_URL}/sales`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData),
            });
            return await res.json();
        } catch (err) {
            console.error('API Error:', err);
            return { success: false, error: err.message };
        }
    }
};

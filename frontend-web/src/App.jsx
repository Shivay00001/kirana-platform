import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import BillingScreen from './components/Billing/BillingScreen';
import InventoryScreen from './components/Inventory/InventoryScreen';
import { LayoutDashboard, ShoppingCart } from 'lucide-react';

function App() {
    const [view, setView] = useState('billing');

    return (
        <>
            <Toaster position="top-right" />

            {/* Navbar */}
            <nav className="bg-gray-800 text-white p-3 flex justify-between items-center">
                <h1 className="text-lg font-bold">Kirana POS</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setView('billing')}
                        className={`flex items-center gap-1 ${view === 'billing' ? 'text-blue-400' : 'text-gray-300'}`}
                    >
                        <ShoppingCart size={18} /> Billing
                    </button>
                    <button
                        onClick={() => setView('inventory')}
                        className={`flex items-center gap-1 ${view === 'inventory' ? 'text-blue-400' : 'text-gray-300'}`}
                    >
                        <LayoutDashboard size={18} /> Inventory
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="h-[calc(100vh-56px)]">
                {view === 'billing' ? <BillingScreen /> : <InventoryScreen />}
            </main>
        </>
    )
}

export default App

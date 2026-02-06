import jsPDF from 'jspdf';
import { format } from 'date-fns';

export const generateInvoice = (saleData) => {
    const doc = new jsPDF();
    const { items, total, sale_id, shop_name = "Kirana Store" } = saleData;

    // Header
    doc.setFontSize(22);
    doc.text(shop_name, 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text("Tax Invoice", 105, 28, { align: 'center' });
    doc.text(`Date: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 20, 40);
    doc.text(`Invoice ID: ${sale_id?.substring(0, 8) || 'N/A'}`, 150, 40);

    // Line
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Table Headers
    let y = 55;
    doc.setFont(undefined, 'bold');
    doc.text("Item", 20, y);
    doc.text("Qty", 100, y);
    doc.text("Price", 130, y);
    doc.text("Total", 170, y);
    doc.setFont(undefined, 'normal');

    y += 5;
    doc.line(20, y, 190, y);
    y += 10;

    // Items
    items.forEach((item) => {
        const itemTotal = item.price * item.quantity;

        // Truncate name if too long
        const name = item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name;

        doc.text(name, 20, y);
        doc.text(String(item.quantity), 100, y);
        doc.text(`Rs. ${item.price}`, 130, y);
        doc.text(`Rs. ${itemTotal.toFixed(2)}`, 170, y);
        y += 10;
    });

    // Totals
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.text("Grand Total:", 130, y);
    doc.text(`Rs. ${total.toFixed(2)}`, 170, y);

    // Footer
    doc.setFontSize(8);
    doc.text("Thank you for shopping with us!", 105, 280, { align: 'center' });

    // Save/Open
    doc.save(`Invoice_${sale_id || Date.now()}.pdf`);
};

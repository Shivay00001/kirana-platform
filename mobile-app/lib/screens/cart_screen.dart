import 'package:flutter/material.dart';
import 'package:kirana_app/services/api_service.dart';
import 'package:google_fonts/google_fonts.dart';

class CartScreen extends StatefulWidget {
  final Map<String, int> cart;
  final List<dynamic> products;
  final Function(String, int) onUpdate;
  final VoidCallback onClear;

  const CartScreen({
    super.key,
    required this.cart,
    required this.products,
    required this.onUpdate,
    required this.onClear,
  });

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final ApiService _api = ApiService();
  bool _isSubmitting = false;

  double get total {
    double sum = 0;
    widget.cart.forEach((key, qty) {
      final product = widget.products.firstWhere((p) => p['id'] == key);
      sum += (product['price'] * qty);
    });
    return sum;
  }

  Future<void> _checkout() async {
    setState(() => _isSubmitting = true);

    // Prepare items for API
    List<Map<String, dynamic>> items = [];
    widget.cart.forEach((key, qty) {
      final product = widget.products.firstWhere((p) => p['id'] == key);
      items.add({
        'id': key,
        'quantity': qty,
        'price': product['price'],
      });
    });

    final success = await _api.createOrder({
      'items': items,
      'total': total,
      'payment_method': 'online_app',
      'shop_id': '00000000-0000-0000-0000-000000000001' 
    });

    setState(() => _isSubmitting = false);

    if (success) {
      widget.onClear();
      if (mounted) {
        showDialog(
          context: context,
          builder: (_) => AlertDialog(
            title: const Text('Order Placed!'),
            content: const Text('Your order has been sent to the shopkeeper.'),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(context); // Close dialog
                  Navigator.pop(context); // Close cart
                },
                child: const Text('OK'),
              )
            ],
          ),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Order Failed. Try again.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Cart', style: GoogleFonts.poppins()),
      ),
      body: widget.cart.isEmpty
          ? const Center(child: Text('Your cart is empty'))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: widget.cart.length,
                    itemBuilder: (context, index) {
                      final id = widget.cart.keys.elementAt(index);
                      final qty = widget.cart.values.elementAt(index);
                      final product = widget.products.firstWhere((p) => p['id'] == id);

                      return ListTile(
                        title: Text(product['name']),
                        subtitle: Text('₹${product['price']} x $qty'),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.remove_circle_outline),
                              onPressed: () => widget.onUpdate(id, -1),
                            ),
                            Text('$qty', style: const TextStyle(fontWeight: FontWeight.bold)),
                            IconButton(
                              icon: const Icon(Icons.add_circle_outline),
                              onPressed: () => widget.onUpdate(id, 1),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    boxShadow: [BoxShadow(color: Colors.grey.shade300, blurRadius: 10)],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Total:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                          Text('₹${total.toStringAsFixed(2)}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.green)),
                        ],
                      ),
                      const SizedBox(height: 15),
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _isSubmitting ? null : _checkout,
                          style: ElevatedButton.styleFrom(backgroundColor: Colors.green, foregroundColor: Colors.white),
                          child: _isSubmitting 
                            ? const CircularProgressIndicator(color: Colors.white)
                            : const Text('Place Order', style: TextStyle(fontSize: 16)),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
    );
  }
}

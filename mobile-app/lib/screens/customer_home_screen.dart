import 'package:flutter/material.dart';
import 'package:kirana_app/services/api_service.dart';
import 'package:kirana_app/screens/cart_screen.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class CustomerHomeScreen extends StatefulWidget {
  const CustomerHomeScreen({super.key});

  @override
  State<CustomerHomeScreen> createState() => _CustomerHomeScreenState();
}

class _CustomerHomeScreenState extends State<CustomerHomeScreen> {
  final ApiService _api = ApiService();
  List<dynamic> _products = [];
  bool _isLoading = true;
  Map<String, int> _cart = {}; // ProductID -> Qty

  @override
  void initState() {
    super.initState();
    _loadProducts();
  }

  Future<void> _loadProducts() async {
    final products = await _api.getProducts();
    setState(() {
      _products = products;
      _isLoading = false;
    });
  }

  void _addToCart(String id) {
    setState(() {
      _cart[id] = (_cart[id] ?? 0) + 1;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Added to cart'), duration: Duration(milliseconds: 500)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Kirana Store', style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.blueAccent,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => CartScreen(
                    cart: _cart, 
                    products: _products,
                    onUpdate: (id, delta) {
                      setState(() {
                         final current = _cart[id] ?? 0;
                         final newQty = current + delta;
                         if (newQty <= 0) _cart.remove(id);
                         else _cart[id] = newQty;
                      });
                    },
                    onClear: () => setState(() => _cart.clear()),
                  ),
                ),
              );
            },
          ),
          if (_cart.isNotEmpty)
             Padding(
               padding: const EdgeInsets.only(right: 12.0, top: 12.0),
               child: CircleAvatar(
                 radius: 10,
                 backgroundColor: Colors.red,
                 child: Text('${_cart.length}', style: const TextStyle(fontSize: 12, color: Colors.white)),
               ),
             )
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : GridView.builder(
              padding: const EdgeInsets.all(10),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                childAspectRatio: 0.75,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
              ),
              itemCount: _products.length,
              itemBuilder: (context, index) {
                final product = _products[index];
                return Card(
                  elevation: 4,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Image Placeholder
                      Expanded(
                        child: Container(
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                          ),
                          child: Center(
                            child: Icon(Icons.shopping_bag, size: 40, color: Colors.grey[400]),
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              product['name'],
                              style: GoogleFonts.poppins(fontWeight: FontWeight.w600, fontSize: 14),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '₹${product['price']}',
                              style: GoogleFonts.poppins(color: Colors.green[700], fontWeight: FontWeight.bold),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () => _addToCart(product['id']),
                          style: ElevatedButton.styleFrom(
                            shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.vertical(bottom: Radius.circular(12)),
                            ),
                            backgroundColor: Colors.blueAccent,
                            foregroundColor: Colors.white,
                          ),
                          child: const Text('Add'),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
    );
  }
}

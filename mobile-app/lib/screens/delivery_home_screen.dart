import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class DeliveryHomeScreen extends StatelessWidget {
  const DeliveryHomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Delivery Partner', style: GoogleFonts.poppins(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildStatCard(),
          const SizedBox(height: 20),
          const Text('Active Orders', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 10),
          _buildOrderCard('Order #1234', 'Pickup: Kirana Store (Main St)', 'Drop: 45A, Lake View', 145.0),
          _buildOrderCard('Order #1235', 'Pickup: Kirana Store (Main St)', 'Drop: 12, Park Road', 85.0),
        ],
      ),
    );
  }

  Widget _buildStatCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.orange.shade50,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.orange.shade100),
      ),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          Column(children: [Text('Today\'s Earnings', style: TextStyle(color: Colors.grey)), Text('₹450', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold))]),
          Column(children: [Text('Orders', style: TextStyle(color: Colors.grey)), Text('5', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold))]),
        ],
      ),
    );
  }

  Widget _buildOrderCard(String id, String pickup, String drop, double amount) {
    return Card(
      margin: const EdgeInsets.only(bottom: 15),
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text(id, style: const TextStyle(fontWeight: FontWeight.bold)),
              Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2), decoration: BoxDecoration(color: Colors.green.shade100, borderRadius: BorderRadius.circular(5)), child: const Text('Ready', style: TextStyle(fontSize: 12, color: Colors.green))),
            ]),
            const Divider(),
            Row(children: [const Icon(Icons.store, size: 16, color: Colors.grey), const SizedBox(width: 5), Text(pickup)]),
            const SizedBox(height: 5),
            Row(children: [const Icon(Icons.location_on, size: 16, color: Colors.grey), const SizedBox(width: 5), Text(drop)]),
            const Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Earn: ₹40', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.blue.shade700)),
                ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: Colors.orange, foregroundColor: Colors.white), child: const Text('Accept')),
              ],
            )
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'screens/customer_home_screen.dart';
import 'screens/delivery_home_screen.dart';

void main() {
  runApp(const KiranaApp());
}

class KiranaApp extends StatelessWidget {
  const KiranaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kirana App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const RoleSelectionScreen(),
    );
  }
}

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
             const Icon(Icons.storefront, size: 80, color: Colors.blue),
             const SizedBox(height: 20),
             const Text('Welcome to KiranaApp', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
             const SizedBox(height: 40),
             SizedBox(
               width: 200,
               height: 50,
               child: ElevatedButton.icon(
                 icon: const Icon(Icons.person),
                 label: const Text('Customer'),
                 onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const CustomerHomeScreen())),
               ),
             ),
             const SizedBox(height: 20),
             SizedBox(
               width: 200,
               height: 50,
               child: ElevatedButton.icon(
                 icon: const Icon(Icons.delivery_dining),
                 label: const Text('Delivery Partner'),
                 style: ElevatedButton.styleFrom(backgroundColor: Colors.orange, foregroundColor: Colors.white),
                 onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DeliveryHomeScreen())),
               ),
             ),
          ],
        ),
      ),
    );
  }
}

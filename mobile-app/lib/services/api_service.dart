import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use 10.0.2.2 for Android Emulator to access localhost of machine
  static const String baseUrl = 'http://10.0.2.2:5000/api';

  Future<List<dynamic>> getProducts() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/products'));
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['success'] == true) {
          return data['data'];
        }
      }
      return [];
    } catch (e) {
      print('API Error: $e');
      return [];
    }
  }

  Future<bool> createOrder(Map<String, dynamic> orderData) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/sales'), // Reusing sales endpoint for MVP
        headers: {'Content-Type': 'application/json'},
        body: json.encode(orderData),
      );

      if (response.statusCode == 200) {
        return true;
      }
      return false;
    } catch (e) {
      print('Order Error: $e');
      return false;
    }
  }
}

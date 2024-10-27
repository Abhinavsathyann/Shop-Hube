import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useCheckout } from '../../context/CheckoutContext';

export const ConfirmationPage: React.FC = () => {
  const { shippingDetails } = useCheckout();

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
      <p className="text-gray-600">
        Thank you for your purchase. Your order will be shipped to:
      </p>
      <div className="bg-gray-50 p-4 rounded-lg text-left">
        <p className="font-medium">{shippingDetails.address}</p>
        <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
        <p>{shippingDetails.country}</p>
      </div>
      <p className="text-sm text-gray-500">
        You will receive a confirmation email shortly with your order details.
      </p>
      <a
        href="/"
        className="inline-block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </a>
    </div>
  );
};
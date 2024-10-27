import React from 'react';
import { useCheckout } from '../../context/CheckoutContext';
import { useCart } from '../../context/CartContext';

export const PaymentForm: React.FC = () => {
  const { paymentDetails, setPaymentDetails, setStep } = useCheckout();
  const { state, dispatch } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear cart after successful payment
    dispatch({ type: 'CLEAR_CART' });
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          required
          pattern="[0-9]{16}"
          placeholder="1234 5678 9012 3456"
          value={paymentDetails.cardNumber}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="text"
            required
            placeholder="MM/YY"
            pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
            value={paymentDetails.expiryDate}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            required
            pattern="[0-9]{3,4}"
            value={paymentDetails.cvv}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name on Card</label>
        <input
          type="text"
          required
          value={paymentDetails.name}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${state.total.toFixed(2)}</span>
        </div>
        
        <button
          type="button"
          onClick={() => setStep(1)}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back to Shipping
        </button>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Complete Purchase
        </button>
      </div>
    </form>
  );
};
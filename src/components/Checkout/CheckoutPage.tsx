import React from 'react';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import { ConfirmationPage } from './ConfirmationPage';
import { useCheckout } from '../../context/CheckoutContext';

export const CheckoutPage: React.FC = () => {
  const { step } = useCheckout();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {step === 1 && <ShippingForm />}
        {step === 2 && <PaymentForm />}
        {step === 3 && <ConfirmationPage />}
      </div>
    </div>
  );
};
import React, { createContext, useContext, useState } from 'react';
import { PaymentDetails, ShippingDetails } from '../types';

interface CheckoutContextType {
  step: number;
  setStep: (step: number) => void;
  shippingDetails: ShippingDetails;
  setShippingDetails: (details: ShippingDetails) => void;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
}

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>(() => {
    const saved = localStorage.getItem('shippingDetails');
    return saved ? JSON.parse(saved) : {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    };
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(() => {
    const saved = localStorage.getItem('paymentDetails');
    return saved ? JSON.parse(saved) : {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: ''
    };
  });

  return (
    <CheckoutContext.Provider value={{
      step,
      setStep,
      shippingDetails,
      setShippingDetails,
      paymentDetails,
      setPaymentDetails
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
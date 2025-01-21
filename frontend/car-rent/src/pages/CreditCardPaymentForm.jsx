import React from 'react';
import CheckOut from './CheckOut';

function CreditCardPaymentForm({ paymentDetails, handlePaymentChange }) {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handlePaymentChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="expirationDate" className="block text-sm font-medium mb-2">Expiration Date</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handlePaymentChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="cvv" className="block text-sm font-medium mb-2">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handlePaymentChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default CreditCardPaymentForm;
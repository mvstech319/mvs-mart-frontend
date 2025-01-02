import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract order details from state
  const { orderId, amount } = location.state || { orderId: 'N/A', amount: 0 };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <section className="bg-gray-900 text-white py-8 px-4 mt-[64px] sm:px-8 lg:px-16 min-h-screen flex items-center justify-center">
      <div className="max-w-md bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-24 h-24 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m9-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Confirmation Message */}
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
        <p className="text-gray-300 mb-6">
          Your order has been successfully placed and is being processed. You’ll receive an email confirmation shortly.
        </p>

        {/* Order Details */}
        <div className="text-left text-gray-300 mb-6">
          <p>
            <strong>Order ID:</strong> <span className="text-white">{orderId}</span>
          </p>
          <p>
            <strong>Amount Paid:</strong> <span className="text-white">₹{Number(amount).toFixed(2)}</span>
          </p>
          <p>
            <strong>Payment Status:</strong> <span className="text-green-400">Paid</span>
          </p>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={handleBackToHome}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

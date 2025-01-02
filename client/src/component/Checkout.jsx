import React, { useContext } from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Checkout = () => {
  const { cart, decreaseQty, addToCart, removeCart, userAddress, url, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle Razorpay Payment
  const handlePayment = async () => {
    try {
      if (
        !userAddress?.fullName ||
        !userAddress?.address ||
        !userAddress?.city ||
        !userAddress?.state ||
        !userAddress?.pincode ||
        !userAddress?.country ||
        !userAddress?.phoneNumber
      ) {
        alert('Please provide a complete shipping address before proceeding to payment.');
        return;
      }
      // Step 1: Create Order on Backend
      const response = await axios.post(`${url}/payment/create-order`, {
        amount: cart?.items?.reduce((acc, item) => acc + (item?.price || 0), 0),
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: userAddress?.userId,
      });
  
      const { orderId, amount: orderAmount } = response.data;
  
      if (!orderId || !orderAmount) {
        throw new Error('Invalid Order Response from Backend');
      }
  
      // Step 2: Open Razorpay Checkout
      const options = {
        key: 'rzp_test_PQpPPFXZJbTl1J', // Replace with your Razorpay Key ID
        amount: orderAmount,
        currency: 'INR',
        name: 'MVS Mart',
        description: 'Order Payment',
        order_id: orderId,
        handler: async (response) => {
          // Step 3: Verify Payment on Backend
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: userAddress?.userId,
            userShipping: userAddress,
          };
  
          const result = await axios.post(`${url}/payment/verify-payment`, paymentData);
  
          if (result.data.success) {
            clearCart();
            navigate('/order-confirmation', {
              state: {
                orderId: result.data.orderId,
                amount: orderAmount,
              },
            });
          } else {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: userAddress?.fullName,
          contact: userAddress?.phoneNumber,
        },
        notes: {
          address: userAddress?.address,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
  
      rzp1.on('payment.failed', (response) => {
        alert('Payment Failed');
        console.error(response.error);
      });
    } catch (error) {
      console.error('Payment Error:', error.message || error);
      alert('Failed to initiate payment');
    }
  };
  

  return (
    <section className="bg-gray-900 text-white py-8 px-4 mt-[64px] sm:px-8 lg:px-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">Order Summary</h1>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm md:text-base">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2">Product Img</th>
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Qty</th>
                <th colSpan={3} className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.items?.map((product) => (
                <tr key={product._id} className="text-center border-t border-gray-700">
                  <td className="p-2">
                    <img
                      src={product.imgSrc}
                      alt={product.title}
                      className="w-12 h-12 mx-auto rounded-md"
                    />
                  </td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">₹{product?.price ? Number(product.price).toFixed(2) : '0.00'}</td>
                  <td className="p-2">{product.qty}</td>
                  <td className="p-2">
                    <button
                      className="p-1 bg-indigo-600 hover:bg-indigo-700 rounded-md"
                      onClick={() => decreaseQty(product.productId, 1)}
                    >
                      <FaMinus />
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="p-1 bg-indigo-600 hover:bg-indigo-700 rounded-md"
                      onClick={() =>
                        addToCart(
                          product?.productId,
                          product.title,
                          product.price / product.qty,
                          1,
                          product.imgSrc
                        )
                      }
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="p-1 bg-red-600 hover:bg-red-700 rounded-md"
                      onClick={() => {
                        if (confirm('Are You Sure, Want Remove From Cart')) {
                          removeCart(product?.productId);
                        }
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Shipping Address */}
        {/* Shipping Address */}
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-6 text-center uppercase tracking-wider border-b-2 border-gray-600 pb-2">Shipping Address</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-user text-xl"></i></span>
              <p><strong>Name:</strong> {userAddress?.fullName}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-phone text-xl"></i></span>
              <p><strong>Phone:</strong> {userAddress?.phoneNumber}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-globe text-xl"></i></span>
              <p><strong>Country:</strong> {userAddress?.country}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-map text-xl"></i></span>
              <p><strong>State:</strong> {userAddress?.state}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-city text-xl"></i></span>
              <p><strong>City:</strong> {userAddress?.city}</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-envelope text-xl"></i></span>
              <p><strong>Pin Code:</strong> {userAddress?.pincode}</p>
            </div>

            <div className="col-span-1 sm:col-span-2 flex items-center space-x-4">
              <span className="bg-gray-700 p-2 rounded-full"><i className="fas fa-map-marker-alt text-xl"></i></span>
              <p><strong>Near By:</strong> {userAddress?.address}</p>
            </div>
          </div>
        </div>

        {/* Total Section */}
        <div className="flex justify-between items-center mt-6 bg-gray-800 p-4 rounded-md">
          <p className="text-lg font-semibold">
            Total: ₹
            {cart?.items?.reduce((acc, item) => acc + (item?.price || 0), 0).toFixed(2)}
          </p>
          <p className="text-lg font-semibold">Items: {cart?.items?.length}</p>
        </div>

        {/* Payment Button */}
        <div className="text-center mt-6">
          <button
            className="w-full sm:w-1/2 py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg"
            onClick={handlePayment}
          >
            Proceed To Pay
          </button>
        </div>
      </div>
    </section>
  );
};

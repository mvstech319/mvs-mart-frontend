import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa'; // React Icons
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, decreaseQty, addToCart, removeCart } = useContext(AppContext);

  return (
    <section className="bg-gradient-to-r from-gray-800 to-black py-20 sm:py-20 md:py-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
          Your Shopping Cart 🛒
        </h1>

        {/* Cart items */}
        {cart?.items?.length > 0 ? (
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {cart.items.map((product) => (
              <div
                key={product._id}
                className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ease-in-out"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-6 mb-6 sm:mb-0">
                  <img
                    src={product.imgSrc}
                    alt={product.title}
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-lg sm:text-2xl font-semibold text-white">{product.title}</h3>
                  </div>
                </div>

                {/* Product Price */}
                <div className="text-lg sm:text-2xl text-white font-semibold mb-4 sm:mb-0">
                  ₹{(product.price).toFixed(2)}
                </div>

                {/* Quantity and Remove */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 sm:p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 ease-in-out"
                      aria-label="Increase Quantity"
                    >
                      <FaPlus className="h-4 sm:h-5 w-4 sm:w-5"
                        onClick={() => addToCart(
                          product?.productId,
                          product.title,
                          product.price / product.qty,
                          1,
                          product.imgSrc
                        )}
                      />
                    </button>
                    <span className="text-xl sm:text-2xl text-white">{product.qty}</span>
                    <button
                      className="p-2 sm:p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 ease-in-out"
                      aria-label="Decrease Quantity"
                      onClick={() => decreaseQty(product.productId, 1)}
                    >
                      <FaMinus className="h-4 sm:h-5 w-4 sm:w-5" />
                    </button>
                  </div>
                  <button
                    className="p-2 sm:p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200 ease-in-out"
                    aria-label="Remove Product"
                    onClick={() => {
                      if (confirm("Are You Sure, Want Remove From Cart")) {
                        removeCart(product?.productId)
                      }
                    }}
                  >
                    <FaTrashAlt className="h-4 sm:h-5 w-4 sm:w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-300">Your cart is empty.</p>
            <p className="text-xl text-gray-500 mt-2">Browse our products and add them to your cart.</p>
          </div>
        )}

        {/* Cart Summary Section */}
        {cart?.items?.length > 0 && (
          <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-8 mt-12 sm:mt-16 rounded-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-0">
                Total: ₹
                {cart?.items
                  ?.reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </div>
              <Link to='/address'>
              <button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white rounded-lg shadow-xl hover:bg-indigo-700 transition duration-200 ease-in-out mt-6 sm:mt-0 text-lg sm:text-xl"
                onClick={() => alert('Proceeding to Checkout')}
              >
                Proceed to Checkout
              </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

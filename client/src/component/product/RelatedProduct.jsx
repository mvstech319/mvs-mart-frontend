import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../Footer';

export const RelatedProduct = ({ category }) => {
  const { products, addToCart } = useContext(AppContext);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Number of products per page
  const navigate = useNavigate();

  useEffect(() => {
    if (!products || !category) return; // Prevent running the filter if either is undefined
  
    setRelatedProduct(
      products.filter((data) => 
        data.category && data.category.toLowerCase() === category.toLowerCase()
      )
    );
  }, [category, products]);
  

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = relatedProduct?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle "Buy Now"
  const handleBuyNow = (productId, title, price, qty, imgSrc) => {
    addToCart(productId, title, price, qty, imgSrc);
    navigate('/address'); // Redirect to the address page
  };

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(relatedProduct?.length / productsPerPage);

  return (
    <>
      <div className='text-center text-4xl my-24 capitalize'>Related Product</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mx-10 mt-[80px] text-center">
        {currentProducts?.map((product) => (
          <div
                    key={product._id}
                    className="shadow-2xl shadow-black border border-gray-400 p-3 rounded-xl duration-500 transform hover:scale-105 bg-slate-900 flex flex-col justify-between"
                  >
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        className="h-64 w-full border border-yellow-400 rounded"
                      />
                    </Link>
                    <div className="flex-grow">
                      <h1 className="text-3xl font-semibold text-gray-500 capitalize mt-2">
                        {product.title}
                      </h1>
                      <h1 className="text-xl font-semibold">&#8377;{product.price}</h1>
                      <p className="text-sm text-gray-400">{product.discription}</p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-5 mt-4 bottom-0 bg-slate-900 py-2">
                      <button
                        className="bg-blue-700 text-white py-2 px-1 rounded"
                        onClick={() =>
                          addToCart(product._id, product.title, product.price, 1, product.imgSrc)
                        }
                      >
                        Add to cart
                      </button>
                      <button
                        className="bg-orange-700 text-white py-2 px-1 rounded"
                        onClick={() =>
                          handleBuyNow(product._id, product.title, product.price, 1, product.imgSrc)
                        }
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-lg hover:bg-yellow-400"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === page + 1 ? 'bg-yellow-400' : 'bg-gray-700'} text-white hover:bg-yellow-400`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-lg hover:bg-yellow-400"
        >
          Next
        </button>
      </div>
      <Footer/>
    </>
  );
};

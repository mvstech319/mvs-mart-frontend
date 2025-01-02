import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, useParams } from 'react-router-dom'
import { Footer } from '../Footer'

export const SearchProduct = () => {
  const { products } = useContext(AppContext)
  const { term } = useParams()

  // Pagination States
  const [searchProduct, setSearchProduct] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8) // Number of products per page

  // Filter products based on search term
  useEffect(() => {
    setSearchProduct(
      products.filter((data) =>
        data.title?.toLowerCase().includes(term.toLowerCase())
      )
    )
  }, [term, products])

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = searchProduct.slice(indexOfFirstProduct, indexOfLastProduct)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Handle "Previous" and "Next" buttons
  const nextPage = () => {
    if (currentPage < Math.ceil(searchProduct.length / productsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
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
      <div className="flex justify-center items-center my-8">
        {/* Previous Button */}
        <button
          onClick={prevPage}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50 transition duration-300 transform hover:bg-gray-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <nav className="mx-4">
          <ul className="flex space-x-4">
            {Array.from({ length: Math.ceil(searchProduct.length / productsPerPage) }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-yellow-400' : 'bg-gray-700'} text-white transition duration-300 transform hover:bg-yellow-500`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Next Button */}
        <button
          onClick={nextPage}
          className="px-4 py-2 rounded bg-gray-700 text-white disabled:opacity-50 transition duration-300 transform hover:bg-gray-600"
          disabled={currentPage === Math.ceil(searchProduct.length / productsPerPage)}
        >
          Next
        </button>
      </div>
      <Footer/>
    </>
  )
}

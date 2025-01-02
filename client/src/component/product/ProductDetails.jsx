import React, { useEffect, useState,useContext } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { RelatedProduct } from './RelatedProduct';

export const ProductDetails = () => {
    const {url,addToCart}=useContext(AppContext)
    const {id} = useParams();
    const [product, setProduct] = useState()
    const navigate = useNavigate();
    
    const fetchProduct =async ()=>{
        const res=await axios.get(`${url}/product/${id}`,{
            headers:{
                "content-type":"Application/json"
            },
            withCredentials:true
        })
        setProduct(res.data.product)
        
    }

    useEffect(() => {
      fetchProduct();
    }, [id])

    const handleBuyNow = (productId, title, price, qty, imgSrc) => {
        addToCart(productId, title, price, qty, imgSrc); // Add product to cart first
        navigate('/address'); // Redirect to the address page
      };
  return (
    <>
    <div className='grid sm:grid-cols-2 place-items-center m-10 capitalize mt-[100px] '>
        <div className=''>
            <img src={product?.imgSrc} className='h-96 border border-yellow-500 rounded'/>
        </div>
        <div className='text-center'>
            <h1 className='text-6xl text-gray-500'>{product?.title}</h1>
            <h1 className='text-3xl'>{product?.description}</h1>
            <h1 className='text-3xl'>{product?.category}</h1>
            <h1 className='text-4xl text-orange-700'>&#8377; {product?.price}</h1>
            <div className='grid sm:grid-cols-2 gap-7 mt-7'>
                <button className='bg-blue-700 rounded font-semibold py-3 px-3 capitalize'onClick={()=>addToCart(product._id,product.title,product.price,1,product.imgSrc)}>Add to cart</button>
                <button className='bg-red-700 rounded font-semibold py-3 px-3 capitalize'
                onClick={() =>
                    handleBuyNow(product._id, product.title, product.price, 1, product.imgSrc)}
                >buy now</button>
            </div>
        </div>
    </div>
    <RelatedProduct category ={product?.category}/>
    </>
  )
}

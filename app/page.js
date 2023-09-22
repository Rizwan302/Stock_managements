"use client"
import Header from './commponents/Header'
import { useEffect, useState } from 'react';

export default function Home() {
  const [productFrom, setProductFrom] = useState({})
  const [product, setProduct] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [drop, setDrop] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resJson = await response.json();
      // Log the response to check its structure
      setProduct(resJson);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/mongo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productFrom)
      });

      if (response.ok) {
        setAlert("Product Successfully Add");
        setProductFrom({})
      }
      else {
        console.log("Error")
      }
    }
    catch (err) {
      console.log("Cetch ", err)
    }
  }


  const handelChange = (e) => {
    setProductFrom({ ...productFrom, [e.target.name]: e.target.value });

  }


  const searchData = async (e) => {
    try {
      setQuery(e.target.value)
      const response = await fetch('http://localhost:3000/api/search?query=' + query);
      const resJson = await response.json();
      setDrop(resJson);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }



  return (
    <>
      <Header />
      <div className=" mx-auto container ">
        <div className=' bg-green-900 text-center text-white border-y-gray-700 w-5/6 my-5 mx-auto border-spacing-4'>{alert}</div>
        <h1 className="text-3xl font-semibold mb-4 my-5">Search a Product</h1>
        <div className="flex mb-6">
          <div className="relative flex items-center w-full">
            <input
              type="text"
              name="query"
              placeholder="Search for product"
              className="flex-1 border border-gray-300 px-3 py-2 pl-10 rounded-md"
              onChange={searchData}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-5.2-5.2" />
            </svg>
          </div>
        </div>

        {drop.map((item) => (
          <div className='flex w-full my-3 justify-between bg-blue-500 p-4 text-white text-center'>
            <div className='flex items-center'>
              <span>{item.slug}</span>
            </div>
            <div className='flex items-center'>
              <span>{item.quantity}</span>
            </div>
            <div className='flex items-center'>
              <span>${item.price}</span>
            </div>
          </div>
        ))}

        <h1 className="text-3xl font-semibold mb-4 my-5">Add a product</h1>

        {/* Add New Stock Item Form */}
        <form className="mb-4" onSubmit={addProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product name"
              name='slug'
              onChange={handelChange}
              value={productFrom?.slug || ""}
            // Add state and event handlers to capture user input
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter quantity"
              name='quantity'
              onChange={handelChange}
              value={productFrom?.quantity || ""}

            // Add state and event handlers to capture user input
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter price"
              name='price' onChange={handelChange}
              value={productFrom?.price || ""}

            // Add state and event handlers to capture user input
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Stock Item
          </button>
        </form>


        <div className="mx-auto container my-4">
          <h1 className="text-3xl font-semibold mb-4">Stock Management</h1>

          {/* Display Stock Table */}
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item) => (
                <tr key={item.slug} className="even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{item.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==== Search a Product === */}
      </div>
    </>
  )
}

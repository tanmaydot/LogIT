'use client'
import React, { useState, ChangeEvent } from 'react';

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductList {
  [date: string]: Product[];
}

interface ProductsListProps {}

const ProductsList: React.FC<ProductsListProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [productsList, setProductsList] = useState<ProductList>({});

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedDate(value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity((prevQuantity) => parseInt(event.target.value, 10));
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice((prevPrice) => Math.floor(parseFloat(event.target.value) * 100) / 100);
  };

  const addProducts = () => {
    if (!selectedDate || !name || quantity <= 0 || price <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }

    setProductsList((prevProductsList) => {
      const updatedList = {
        ...prevProductsList,
        [selectedDate]: [
          ...(prevProductsList[selectedDate] || []),
          { name, quantity, price },
        ],
      };

      return updatedList;
    });

    setName('');
    setQuantity(0);
    setPrice(0);
  };

  const getTotalForDate = (date: string) => {
    if (!productsList[date]) {
      return 0;
    }

    const total = productsList[date].reduce(
      (accumulator, product) => accumulator + product.quantity * product.price,
      0
    );

    return Math.floor(total * 100) / 100;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="datePicker" className="mr-2 text-gray-700">
          Select Date:
        </label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="flex mb-4">
        <input
          id="productName"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 mr-2 border border-gray-400 rounded w-1/4 focus:outline-none"
        />
        <input
          id="productQuantity"
          type="number"
          placeholder="Product Quantity"
          value={quantity === 0 ? '' : quantity}
          onChange={handleQuantityChange}
          className="px-4 py-2 mr-2 border border-gray-400 rounded w-1/4 focus:outline-none"
        />
        <input
          id="productPrice"
          type="number"
          step="1"
          placeholder="Product Price"
          value={price === 0 ? '' : price}
          onChange={handlePriceChange}
          className="px-4 py-2 mr-2 border border-gray-400 rounded w-1/4 focus:outline-none"
        />
        <button
          onClick={addProducts}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Price (₹)</th>
              <th className="py-2 px-4 border">Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(productsList).map(([date, products]) => (
              <tr key={date}>
                <td className="py-2 px-4 border">{date}</td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {products.map((product, index) => (
                      <li key={index}>{product.name}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {products.map((product, index) => (
                      <li key={index}>{product.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border">
                  <ul className="list-disc pl-4">
                    {products.map((product, index) => (
                      <li key={index}>{`₹${product.price.toFixed(0)}`}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 font-bold border">
                  ₹{getTotalForDate(date).toFixed(0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductsList;
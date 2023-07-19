/* eslint-disable react/no-unescaped-entities */
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
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    setQuantity(parsedValue >= 0 ? parsedValue : 0);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);
    setPrice(parsedValue >= 0 ? Math.floor(parsedValue) : 0);
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
        <label htmlFor="datePicker" className="mr-2 text-green-700">
          Select Date:
        </label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-4 py-2 border border-green-800 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
        />
      </div>
      <div className="flex items-center mb-4">
        <input
          id="productName"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded-lg w-1/4 focus:outline-none"
        />
        <input
          id="productQuantity"
          type="number"
          placeholder="Product Quantity"
          value={quantity === 0 ? '' : quantity}
          onChange={handleQuantityChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded-lg w-1/4 focus:outline-none"
        />
        <input
          id="productPrice"
          type="number"
          step="1"
          placeholder="Product Price"
          value={price === 0 ? '' : price.toString()}
          onChange={handlePriceChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded-lg w-1/4 focus:outline-none"
        />
        <button
          onClick={addProducts}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-green-800">
          <thead>
            <tr className="bg-green-400">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Selected Date's Total (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">{selectedDate}</td>
              <td className="py-2 px-4 border">
                ₹{getTotalForDate(selectedDate).toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table-auto w-full border border-green-800">
          <thead>
            <tr className="bg-green-400">
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Product Quantity</th>
              <th className="py-2 px-4">Product Price</th>
            </tr>
          </thead>
          <tbody>
            {productsList[selectedDate] &&
              productsList[selectedDate].map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.quantity}</td>
                  <td className="py-2 px-4 border">₹{product.price.toFixed(0)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsList;

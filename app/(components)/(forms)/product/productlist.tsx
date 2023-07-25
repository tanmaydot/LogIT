/* eslint-disable react/no-unescaped-entities */
import React, { useState, ChangeEvent } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

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
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Select a date';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

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

  const handleDeleteProduct = (index: number) => {
    setProductsList((prevProductsList) => {
      if (!selectedDate || !prevProductsList[selectedDate]) {
        return prevProductsList;
      }

      const updatedList = {
        ...prevProductsList,
        [selectedDate]: prevProductsList[selectedDate].filter((_, i) => i !== index),
      };

      return updatedList;
    });
  };

  const handleEditProduct = (index: number) => {
    const productToEdit = productsList[selectedDate][index];
    setName(productToEdit.name);
    setQuantity(productToEdit.quantity);
    setPrice(productToEdit.price);
    setEditIndex(index);
  };

  const handleUpdateProduct = () => {
    if (editIndex !== null) {
      setProductsList((prevProductsList) => {
        if (!selectedDate || !prevProductsList[selectedDate]) {
          return prevProductsList;
        }

        const updatedList = [...prevProductsList[selectedDate]];
        updatedList[editIndex] = { name, quantity, price };

        return {
          ...prevProductsList,
          [selectedDate]: updatedList,
        };
      });

      setName('');
      setQuantity(0);
      setPrice(0);
      setEditIndex(null);
    }
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

  const handleExport = () => {
    if (Object.keys(productsList).length === 0) {
      alert("No products to export.");
      return;
    }
  
    const csvData = convertToCsv(productsList);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products_list.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCsv = (data: ProductList) => {
    let csv = 'Date,Product Name,Product Quantity,Product Price\n';

    Object.entries(data).forEach(([date, products]) => {
      products.forEach((product) => {
        csv += `${date},${product.name},${product.quantity},${product.price}\n`;
      });
    });

    return csv;
  };

  return (
    <div className="container mx-auto p-4 ">
    <div className="mb-4 flex items-center">
      <label htmlFor="datePicker" className="mr-2 text-green-700">
        Select Date:
      </label>
      <input
        id="datePicker"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="p-2 border border-green-800 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
      />
      <div className="ml-4 p-2 border bg-green-400 rounded-lg"> 
        <p>Date: {formatDate(selectedDate)}</p>
        <p>Total: ₹ {getTotalForDate(selectedDate).toFixed(0)}</p>
      </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none ml-2"
        >
          Export
        </button>
    </div>
    <div className="overflow-x-auto m-4">
        <table className="table-auto w-full border border-green-800">
          <thead>
            <tr className="bg-green-400">
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Product Quantity</th>
              <th className="py-2 px-4">Product Price</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsList[selectedDate] &&
              productsList[selectedDate].map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.quantity}</td>
                  <td className="py-2 px-4 border">₹{product.price.toFixed(0)}</td>
                  <td className="py-2 px-4 border">
                    {editIndex === index ? (
                      <button
                        onClick={handleUpdateProduct}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditProduct(index)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center m-4">
        <input
          id="productName"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={handleNameChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded w-1/6 focus:outline-none"
        />
        <input
          id="productQuantity"
          type="number"
          placeholder="Product Quantity"
          value={quantity === 0 ? '' : quantity}
          onChange={handleQuantityChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded w-1/6 focus:outline-none"
        />
        <input
          id="productPrice"
          type="number"
          step="1"
          placeholder="Product Price"
          value={price === 0 ? '' : price.toString()}
          onChange={handlePriceChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded w-1/6 focus:outline-none"
        />
        {editIndex !== null ? (
          <button
            onClick={handleUpdateProduct}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Save
          </button>
        ) : (
          <button
            onClick={addProducts}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Add Product
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
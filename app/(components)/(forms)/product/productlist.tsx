import { useState, ChangeEvent, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Product {
  productName: string;
  productQuantity: number;
  productPrice: number;
}

interface ProductList {
  [date: string]: Product[];
}

interface ProductsListProps {}

const ProductsList: React.FC<ProductsListProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);
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
    setProductName(value);
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    setProductQuantity(parsedValue >= 0 ? parsedValue : 0);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);
    setProductPrice(parsedValue >= 0 ? Math.floor(parsedValue) : 0);
  };

  const addProducts = async () => {
    if (!selectedDate || !productName || productQuantity <= 0 || productPrice <= 0) {
      alert('Please fill in all fields with valid values.');
      return;
    }
  
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          productQuantity,
          productPrice: productPrice || 0, // Provide a default value if it's undefined
        }),
      });
      console.log(addProducts)
      if (!response.ok) {
        throw new Error('Error adding product');
      }
  
      const data = await response.json();
  
      // Update the products list with the newly created product
      setProductsList((prevProductsList) => {
        const updatedList = {
          ...prevProductsList,
          [selectedDate]: [...(prevProductsList[selectedDate] || []), data],
        };
  
        return updatedList;
      });

      setProductName('');
      setProductQuantity(0);
      setProductPrice(0);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again later.');
    }
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
    setProductName(productToEdit.productName);
    setProductQuantity(productToEdit.productQuantity);
    setProductPrice(productToEdit.productPrice);
    setEditIndex(index);
  };

  const handleUpdateProduct = () => {
    if (editIndex !== null) {
      setProductsList((prevProductsList) => {
        if (!selectedDate || !prevProductsList[selectedDate]) {
          return prevProductsList;
        }

        const updatedList = [...prevProductsList[selectedDate]];
        updatedList[editIndex] = { productName, productQuantity, productPrice };

        return {
          ...prevProductsList,
          [selectedDate]: updatedList,
        };
      });

      setProductName('');
      setProductQuantity(0);
      setProductPrice(0);
      setEditIndex(null);
    }
  };

  const getTotalForDate = (date: string) => {
    if (!productsList[date]) {
      return 0;
    }

    const total = productsList[date].reduce(
      (accumulator, product) => accumulator + product.productQuantity * product.productPrice,
      0
    );

    return Math.floor(total * 100) / 100;
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
          <p>Total: ₹ {getTotalForDate(selectedDate)}</p>
        </div>
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
                  <td className="py-2 px-4 border">{product.productName}</td>
                  <td className="py-2 px-4 border">{product.productQuantity}</td>
                  <td className="py-2 px-4 border">₹{product.productPrice}</td>
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
          value={productName}
          onChange={handleNameChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded w-1/6 focus:outline-none"
        />
        <input
          id="productQuantity"
          type="number"
          placeholder="Product Quantity"
          value={productQuantity === 0 ? '' : productQuantity}
          onChange={handleQuantityChange}
          className="px-4 py-2 mr-2 border border-green-800 rounded w-1/6 focus:outline-none"
        />
        <input
          id="productPrice"
          type="number"
          step="1"
          placeholder="Product Price"
          value={productPrice === 0 ? '' : productPrice.toString()}
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
import React, { useState, ChangeEvent } from 'react';

interface AddProductFormProps {
  onAddProduct: (name: string, quantity: number, price: number) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

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

  const handleAddProduct = () => {
    onAddProduct(name, quantity, price);
    setName('');
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="flex flex-col md:flex-row items-center m-4">
      <input
        id="productName"
        type="text"
        placeholder="Name"
        value={name}
        onChange={handleNameChange}
        className="px-4 py-2 mb-2 md:mb-0 mr-2 border border-green-800 rounded w-full md:w-1/4 focus:outline-none"
      />
      <input
        id="productQuantity"
        type="number"
        placeholder="Quantity"
        value={quantity === 0 ? '' : quantity}
        onChange={handleQuantityChange}
        className="px-4 py-2 mb-2 md:mb-0 mr-2 border border-green-800 rounded w-full md:w-1/4 focus:outline-none"
      />
      <input
        id="productPrice"
        type="number"
        step="1"
        placeholder="Price"
        value={price === 0 ? '' : price.toString()}
        onChange={handlePriceChange}
        className="px-4 py-2 mb-2 md:mb-0 mr-2 border border-green-800 rounded w-full md:w-1/4 focus:outline-none"
      />
      <button
        onClick={handleAddProduct}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none w-full md:w-auto"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductRowProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="py-2 px-4 border">{product.name}</td>
      <td className="py-2 px-4 border">{product.quantity}</td>
      <td className="py-2 px-4 border">₹{product.price.toFixed(0)}</td>
      <td className="py-2 px-4 border">
        <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 mr-2">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;

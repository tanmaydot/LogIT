import React from 'react';
import ProductRow from './ProductRow';

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductTableProps {
  products: Product[];
  onEditProduct: (index: number) => void;
  onDeleteProduct: (index: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEditProduct, onDeleteProduct }) => {
  return (
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
        {products.map((product, index) => (
          <ProductRow
            key={index}
            product={product}
            onEdit={() => onEditProduct(index)}
            onDelete={() => onDeleteProduct(index)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

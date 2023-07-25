// ProductList.tsx
import React, { useState } from 'react';
import ProductTable from './ProductTable';
import AddProductForm from './AddProductForm';
import DateSelector from './DateSelector';
import convertToCsv from './CsvConverter';

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [productsList, setProductsList] = useState<{ [date: string]: Product[] }>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const getTotalForDate = (date: string) => {
    if (!productsList[date]) {
      return 0;
    }

    const total = productsList[date].reduce(
      (accumulator: number, product: Product) => accumulator + product.quantity * product.price,
      0
    );

    return Math.floor(total * 100) / 100;
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleAddProduct = (name: string, quantity: number, price: number) => {
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

    setEditIndex(null);
  };

  const handleDeleteProduct = (index: number) => {
    setProductsList((prevProductsList) => {
      if (!selectedDate || !prevProductsList[selectedDate]) {
        return prevProductsList;
      }

      const updatedList = {
        ...prevProductsList,
        [selectedDate]: prevProductsList[selectedDate].filter((_, i: number) => i !== index),
      };

      return updatedList;
    });
  };

  const handleEditProduct = (index: number) => {
    const productToEdit = productsList[selectedDate][index];
    setEditIndex(index);
  };

  const handleUpdateProduct = (name: string, quantity: number, price: number) => {
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

      setEditIndex(null);
    }
  };

  const handleExport = () => {
    if (Object.keys(productsList).length === 0) {
      alert('No products to export.');
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

  return (
    <div className="container mx-auto p-4">
        <div className="flex items-center">
            <DateSelector
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            total={getTotalForDate(selectedDate)}
            />
            <button
            onClick={handleExport}
            className="p-2 m-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none ml-2"
            >
            Export
            </button>
        </div>
        <ProductTable
            products={productsList[selectedDate] || []}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
        />
        <AddProductForm onAddProduct={handleAddProduct} />
    </div>

  );
};

export default ProductList;

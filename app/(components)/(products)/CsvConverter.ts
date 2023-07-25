interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductList {
  [date: string]: Product[];
}

const convertToCsv = (data: ProductList) => {
  let csv = 'Date,Product Name,Product Quantity,Product Price\n';

  // Sort the dates in ascending order before processing
  const sortedDates = Object.keys(data).sort();

  sortedDates.forEach((date) => {
    const products = data[date];
    products.forEach((product) => {
      csv += `${date},${product.name},${product.quantity},${product.price}\n`;
    });
  });

  return csv;
};

export default convertToCsv;

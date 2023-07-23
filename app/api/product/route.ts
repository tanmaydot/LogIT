import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/db';

interface CreateProductData {
  productName: string;
  productQuantity: string;
  productPrice: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Make sure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Extract the user ID from the authenticated user
  const userId = req.headers['x-user-id'] as string;

  // Ensure the user ID is available
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Extract the product data from the request body
  const { productName, productQuantity, productPrice } = req.body as CreateProductData;

  // Validate product data
  if (!productName || !productQuantity || !productPrice) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create the product associated with the user
    const product = await prisma.product.create({
        data: {
          productName,
          productQuantity,
          productPrice,
          userId,
        },
      });

    // Return the created product
    return res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
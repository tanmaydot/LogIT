import prisma from '@/app/db';

export async function POST(req: Request) {
  const body = await req.json();

  const { productName, productQuantity, productPrice } = body;

  try {
    const parsedProductQuantity = productQuantity.toString();
    const parsedProductPrice = productPrice.toString();
    const product = await prisma.product.create({
      data: {
        productName,
        productQuantity: parsedProductQuantity,
        productPrice: parsedProductPrice,
        user: {
          
        },
      },
    });
    return new Response(JSON.stringify({ "success": "success" }));
  } catch (error) {
    console.log(error);
    throw new Error('Error creating product');
  }
}

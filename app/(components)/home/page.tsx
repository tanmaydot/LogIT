'use client'
import { useSession, signOut } from 'next-auth/react';
import ProductList from '../(products)/ProductList';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className='m-4'>
      <h1 className='text-4xl font-bold mb-4'>LogIT</h1>
      {session?.user ? (
        <div className='space-y-4'>
          <div className='flex items-center'>
            <p className='text-lg mr-2'>Name: {session.user.name}</p>
            <button
              onClick={() => signOut()}
              className='btn btn-primary bg-green-500 border-none hover:bg-green-400'>
              Sign Out
            </button>
          </div>
          <div>
            <ProductList />
          </div>
        </div>
      ) : (
        <div className='space-y-4'>
          <button
              className='btn btn-primary bg-green-500 border-none hover:bg-green-400 mr-2 rounded-none'
              onClick={() => router.push('/register')}>
              <p className='text-lg'>Register</p>
          </button>
          <button
              className='btn btn-primary bg-green-500 border-none hover:bg-green-400 rounded-none'
              onClick={() => router.push('/login')}>
              <p className='text-lg'>Login</p>
            </button>
        </div>
      )}
    </div>
  );
};

export default Home;

'use client'
import { useSession, signOut } from 'next-auth/react';
import ProductsList from '../(forms)/product/productlist';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className='m-2'>
      <h1>LogIT</h1>
      {session?.user ? (
        <div>
          <p>Name: {session.user.name}</p>
          <button onClick={() => signOut()} className='btn'>Sign Out</button>
          <span>
            <ProductsList />
          </span>
        </div>
      ) : (
        <button className='btn' onClick={() => router.push('/login')}>
          <p>Please Login</p>
        </button>
      )}
    </div>
  );
};

export default Home;

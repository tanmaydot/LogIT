'use client'
import { useSession, signOut } from 'next-auth/react'
import ProductsList from '../product/productlist'


const Home = () => {;
 const { data:session } = useSession()
  return (
    <div>
        <h1>UNTITLED</h1>
        <p>SIGNED IN AS {session?.user?.email}</p>
        <button onClick={() => signOut()} className='btn'>Sign Out</button>
        <span>
          <ProductsList/>
        </span>
    </div>
  )
}

export default Home
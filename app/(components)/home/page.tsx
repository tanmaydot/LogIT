'use client'



import { useSession, signOut } from 'next-auth/react'


const Home = () => {;
 const { data:session } = useSession()
  return (
    <div>
        <h1>UNTITLED</h1>
        <p>SIGNED IN AS {session?.user?.email}</p>
        <button onClick={() => signOut()} className='btn'>Sign Out</button>
    </div>
  )
}

export default Home
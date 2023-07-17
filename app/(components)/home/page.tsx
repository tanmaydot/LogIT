'use client'
import { useRouter } from "next/navigation"
import { useSession, signOut } from 'next-auth/react'


const Home = () => {
  const router = useRouter();
  const { data:session } = useSession()
  return (
    <div>
        <h1>UNTITLED</h1>
        <p>SIGNED IN AS {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Home
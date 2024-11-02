'use client'
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';



export default function Main() {

      const router = useRouter();
      const logout = async () => {
            const response = await fetch('/api/logout', { method: 'PUT' });
            console.log('Logout response:', response);
            router.push('/');
        };
return(
<div className='text-black text-3xl flex flex-col items-center justify-center h-screen'>
<Link href="/newEstate" className="mb-8 py-4 px-8 border-2 border-red-400 w-[300px]">
      Nowa Nieruchomość
      </Link>
      <Link href="/list" className="py-4 px-8 border-2 border-red-400 mt-4 w-[300px]">
      Moje Nieruchomości
      </Link>
      <button className="py-4 px-8 border-2 border-gray-400 mt-16 w-[200px]" onClick={logout}>Wyloguj</button>
</div>)
  
}

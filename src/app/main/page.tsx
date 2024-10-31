import Link from 'next/link';
import React from 'react';




export default function Main() {
 
return(
<div className='text-black text-3xl flex flex-col items-center justify-center h-full'>
<Link href="/newEstate" className="py-4 px-8 border-2 border-red-400 w-[300px]">
      Nowa Nieruchomość
      </Link>
      <Link href="/list" className="py-4 px-8 border-2 border-red-400 mt-4 w-[300px]">
      Moje Nieruchomości
      </Link>
</div>)
  
}

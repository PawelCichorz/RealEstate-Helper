import Link from 'next/link';
import React from 'react';




export default function Main() {
 
return(
<div className='text-black text-3xl'>
<Link href="/newEstate" className="py-4 px-8 border-2 border-red-400">
      Nowa Nieruchomość
      </Link>
      <Link href="/list" className="py-4 px-8 border-2 border-red-400 mt-4">
      Moje Nieruchomości
      </Link>
</div>)
  
}

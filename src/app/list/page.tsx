'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

interface Estate {
    id: number;
    estate_type: string;
    answers: { [key: string]: string };
}

export default function EstateListPage() {
    const [estates, setEstates] = useState<Estate[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchEstates() {
            const response = await fetch('/api/myestates');
            const data = await response.json();
            if (data.success) {
                setEstates(data.estates);
                console.log("Estates:", data.estates);
            } else {
                console.error('Error fetching estates:', data.message);
            }
        }
        fetchEstates();
    }, []);

    const handleDelete = async (estateId: number) => {
        const response = await fetch('/api/myestates/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estateId }), 
        });

        const data = await response.json();

        if (data.success) {
            
            setEstates((prev) => prev.filter((estate) => estate.id !== estateId));
        } else {
            console.error('Error deleting estate:', data.message);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col mt-2">
            <h1 className='text-2xl pb-8'>Moje Nieruchomości</h1>
            <ul>
                {estates.map((estate) => (
                    <li key={estate.id}>
                        <button 
                            onClick={() => router.push(`/list/${estate.id}`)} 
                            className='text-basic text-red-600 border-2 px-8 py-4 m-2'
                        >
                            {estate.answers['Podaj nazwe'] || 'Brak nazwy'} 
                            
                        </button>
                        <button className='border-2 p-4 text-red-600'  onClick={() => handleDelete(estate.id)}>Usuń</button>
                    </li>
                ))}
            </ul>
            <Link href="/newEstate" className="mb-8 py-4 px-8 border-2 border-red-400 w-[300px] text-center mt-12">
      Nowa Nieruchomość
      </Link>
        </div>
    );
}

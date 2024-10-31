'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

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

    return (
        <div className="flex justify-center items-center flex-col mt-2">
            <h1 className='text-2xl pb-8'>Moje Nieruchomości</h1>
            <ul>
                {estates.map((estate) => (
                    <li key={estate.id}>
                        <button 
                            onClick={() => router.push(`/list/${estate.id}`)} 
                            className='text-xl text-red-600 border-2 px-8 py-4'
                        >
                            {estate.answers['Podaj nazwe'] || 'Brak nazwy'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

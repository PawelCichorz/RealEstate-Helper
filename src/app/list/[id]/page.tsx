'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import '@fontsource/poppins/400.css';
import '../../fonts/popins'

interface EstateDetails {
    id: number;
    estate_type: string;
    answers: { question: string; answer: string }[];
}

export default function EstateDetailsPage() {
    const { id } = useParams();
    const [estate, setEstate] = useState<EstateDetails | null>(null);

    useEffect(() => {
        const fetchEstateDetails = async () => {
            if (!id) return;

            const response = await fetch(`/api/myestates/${id}`);
            const data = await response.json();
            if (data.success) {
                setEstate(data.estate);
            } else {
                console.error('Error fetching estate details:', data.message);
            }
        };

        fetchEstateDetails();
    }, [id]);

    if (!estate) return <p>Ładowanie...</p>;

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.addFileToVFS('Poppins-Regular.ttf', 'popins'); 

        doc.addFont('Poppins-Regular.ttf', 'Poppins', 'normal');
        doc.setFont('Poppins');
        doc.setFontSize(16);
        doc.text(`Szczegóły nieruchomości: ${estate.answers.find(ans => ans.question === 'Podaj nazwe')?.answer || 'Brak nazwy'}`, 10, 20);

        doc.setFontSize(12);
        let y = 30;

        estate.answers.forEach(item => {
            doc.text(`${item.question}: ${item.answer}`, 10, y);
            y += 10;
        });

        doc.save(`nieruchomosc_${estate.id}.pdf`);
    };

    return (
        <div className='flex items-center justify-center flex-col text-center'>
            <h1 className='text-xl font-bold'>Szczegóły nieruchomości: {estate.answers.find(ans => ans.question === 'Podaj nazwe')?.answer || 'Brak nazwy'}</h1>
            <ul className='m-4'>
                {estate.answers.map((item, index) => (
                    <li className='p-2' key={index}>
                        <strong>{item.question}:</strong> {item.answer}
                    </li>
                ))}
            </ul>
            <button
                onClick={generatePDF}
                className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                Generuj w PDF
            </button>
        </div>
    );
}

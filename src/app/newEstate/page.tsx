'use client'
import { useState } from 'react';

const questions = [
    { id: 1, question: 'Wybierz rodzaj nieruchomości:', options: ['Mieszkanie', 'Dom', 'Działka', 'Lokal'] },
    { id: 2, question: 'Podaj powierzchnię nieruchomości w m²:', type: 'number' },
    { id: 3, question: 'Ile pokoi?', type: 'number' },
    { id: 4, question: 'Podaj lokalizację:', type: 'text' },
    { id: 5, question: 'Czy nieruchomość jest do wynajęcia?', options: ['Tak', 'Nie'] },
    
];

const NewEstate: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    
    const handleOptionChange = (option: string) => {
        setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: option }));
        handleNext();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: e.target.value }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            // Zapisz odpowiedzi do bazy danych lub wykonaj inną logikę po ukończeniu
            console.log('Odpowiedzi:', answers);
            // Zmień na stronę z potwierdzeniem lub inną
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Dodaj Nową Nieruchomość</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
                {questions[currentQuestion].options ? (
                    <div className="flex flex-col space-y-4">
                        {questions[currentQuestion].options.map((option) => (
                            <button 
                                key={option} 
                                onClick={() => handleOptionChange(option)} 
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                ) : (
                    <input
                        type={questions[currentQuestion].type}
                        onChange={handleInputChange}
                        placeholder={questions[currentQuestion].question}
                        className="border border-gray-300 rounded p-2 w-full mb-4"
                        required
                    />
                )}
                <div className="flex justify-between mt-4">
                    {currentQuestion > 0 && (
                        <button 
                            onClick={handlePrevious} 
                            className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition"
                        >
                            Wstecz
                        </button>
                    )}
                    <button 
                        onClick={handleNext} 
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        {currentQuestion === questions.length - 1 ? 'Zakończ' : 'Dalej'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewEstate;

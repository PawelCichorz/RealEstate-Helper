'use client';
import { useState} from 'react';
import { useRouter } from 'next/navigation';

type EstateTypeKey = 'Mieszkanie' | 'Dom' | 'Działka' | 'Lokal';

const estateTypes: Record<EstateTypeKey, string> = {
    Mieszkanie: 'M',
    Dom: 'D',
    Działka: 'DZ',
    Lokal: 'L',
};


interface Question {
    id: number;
    question_text: string;
    question_type: 'text' | 'number' | 'checkbox';
    options?: string[]; 
}

interface Answers {
    [questionId: number]: string[]; 
}

const NewEstate: React.FC = () => {
    const router = useRouter();
    const [estateType, setEstateType] = useState<string | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]); 
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<Answers>({}); 
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleEstateTypeChange = async (type: EstateTypeKey) => {
        const estateTypeCode = estateTypes[type];
        setEstateType(estateTypeCode);
        setIsLoading(true);

    
        const response = await fetch(`/api/questions?estateType=${estateTypeCode}`);
        const data = await response.json();
        
        setQuestions(data);
        setIsLoading(false);
    };

    const handleOptionChange = (option: string) => {
        setAnswers((prev) => {
            const existingAnswers = prev[questions[currentQuestion].id] || [];
            if (existingAnswers.includes(option)) {
                return { ...prev, [questions[currentQuestion].id]: existingAnswers.filter((ans) => ans !== option) };
            } else {
                return { ...prev, [questions[currentQuestion].id]: [...existingAnswers, option] };
            }
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers((prev) => ({ ...prev, [questions[currentQuestion].id]: [e.target.value] }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
        
            submitAnswers();
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const submitAnswers = async () => {
        try {
            const response = await fetch('/api/estates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers, estateType }), 
            });

            const result = await response.json();
            if (result.success) {
                console.log('Odpowiedzi zapisane:', result);
                router.push('/list')

            } else {
                console.error('Błąd podczas zapisywania odpowiedzi:', result);
            }
        } catch (error) {
            console.error('Błąd sieci:', error);
        }
    };

    if (isLoading) return <p>Ładowanie pytań...</p>;

    if (!estateType) {
        return (
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6 w-full">Wybierz rodzaj nieruchomości</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex flex-col space-y-4">
                        {Object.keys(estateTypes).map((option) => (
                           <button 
                               key={option} 
                               onClick={() => handleEstateTypeChange(option as EstateTypeKey)}
                               className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
                           >
                               {option}
                           </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Dodaj Nieruchomość</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion]?.question_text}</h2>
                {questions[currentQuestion]?.question_type === 'checkbox' ? (
                    <div className="flex flex-col space-y-4">
                        {questions[currentQuestion]?.options?.map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={answers[questions[currentQuestion].id]?.includes(option) || false}
                                    onChange={() => handleOptionChange(option)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ) : (
                    <input
                        type={questions[currentQuestion]?.question_type === 'number' ? 'number' : 'text'}
                        value={answers[questions[currentQuestion]?.id]?.[0] || ''}
                        onChange={handleInputChange}
                        placeholder={questions[currentQuestion]?.question_text}
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

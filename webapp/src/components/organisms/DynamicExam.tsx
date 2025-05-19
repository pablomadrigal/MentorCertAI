import { useState } from 'react';

export interface Question {
    type: 'multiple_choice' | 'yes_no';
    question: string;
    options?: string[];
    answer: string;
}

export interface ExamData {
    success: boolean;
    data: Question[];
}

export interface DynamicExamProps {
    examData: ExamData;
    onComplete?: (score: number) => void;
}

export const DynamicExam: React.FC<DynamicExamProps> = ({ examData, onComplete }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (questionIndex: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    };

    const calculateScore = () => {
        const totalQuestions = examData.data.length;
        const correctAnswers = examData.data.reduce((acc, question, index) => {
            return acc + (answers[index] === question.answer ? 1 : 0);
        }, 0);

        const finalScore = (correctAnswers / totalQuestions) * 100;
        setScore(finalScore);
        setShowScore(true);
        onComplete?.(finalScore);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {!showScore ? (
                <>
                    {examData.data.map((question, index) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-lg font-medium mb-4">{question.question}</h3>

                            {question.type === 'multiple_choice' && question.options && (
                                <div className="space-y-2">
                                    {question.options.map((option) => (
                                        <label key={option} className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={option}
                                                checked={answers[index] === option}
                                                onChange={(e) => handleAnswer(index, e.target.value)}
                                                className="form-radio"
                                            />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}

                            {question.type === 'yes_no' && (
                                <div className="space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="yes"
                                            checked={answers[index] === 'yes'}
                                            onChange={(e) => handleAnswer(index, e.target.value)}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Yes</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value="no"
                                            checked={answers[index] === 'no'}
                                            onChange={(e) => handleAnswer(index, e.target.value)}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">No</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={calculateScore}
                        disabled={Object.keys(answers).length !== examData.data.length}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Submit
                    </button>
                </>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your Score</h2>
                    <p className="text-4xl font-bold text-blue-600">{score.toFixed(1)}%</p>
                </div>
            )}
        </div>
    );
};

"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DynamicExam, ExamData } from '@/components/organisms/DynamicExam';

import exam_data from '../../../../public/exam-example.json'

export default function RoomPage() {
    const params = useParams();
    const roomName = params?.roomName as string;
    const [exam, setExam] = useState<ExamData>(exam_data as ExamData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /*const fetchExam = async () => {
            const response = await fetch(`/api/exam?room=${roomName}`);
            const data = await response.json();
            setExam(data);
            setLoading(false);
        };*/
        const loadExam = async () => {
            try {
                const response = await fetch('/../examples/examen-example.json');
                const data = await response.json();
                setExam(data);
            } catch (error) {
                console.error('Error loading exam:', error);
            } finally {
                setLoading(false);
            }
        };


        loadExam();
    }, []);

    if (loading) {
        return <div>Loading exam...</div>;
    }

    if (!exam) {
        return <div>Error loading exam</div>;
    }

    return (
        <div>
            <DynamicExam examData={exam} />
        </div>
    );
} 
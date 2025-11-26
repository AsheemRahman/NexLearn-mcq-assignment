"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import AuthGuard from "@/components/Auth";
import Navbar from "@/components/Navbar";
import authApi from "../service/authApi";
import { IQuestion, ListQuestionsResponse, SubmitAnswerItem, SubmitAnswerResponse } from "@/types/types";
import ResultCard from "@/components/ResultCard";
import QuestionCard from "@/components/QuestionCard";
import SubmitConfirmModal from "@/components/SubmitConfirmModal";

type View = "exam" | "result";


export default function McqPage() {
    const [view, setView] = useState<View>("exam");
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number | null>>({});
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<SubmitAnswerResponse | null>(null);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const markedCount = 1;

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = async () => {
        try {
            const res: ListQuestionsResponse = await authApi.listQuestions();
            if (!res.success) {
                toast.error("Failed to load questions");
                return;
            }
            const formatted: IQuestion[] = res.questions.map((q) => ({
                id: q.question_id,
                number: q.number,
                question: q.question,
                comprehension: q.comprehension,
                image: q.image,
                options: q.options,
            }));
            setQuestions(formatted);
            const temp: Record<number, number | null> = {};
            formatted.forEach((q) => {
                temp[q.id] = null;
            });
            setAnswers(temp);
            setTimeLeft(res.total_time * 60);
        } catch {
            toast.error("Unable to load exam.");
        }
    };

    const handleSubmit = useCallback(async () => {
        try {
            setSubmitting(true);
            const payload: SubmitAnswerItem[] = questions.map((q) => ({
                question_id: q.id,
                selected_option_id: answers[q.id],
            }));
            const formData = new FormData();
            formData.append("answers", JSON.stringify(payload));
            const res = await authApi.submitAnswers(formData);
            if (res.success) {
                setResult(res);
                setView("result");
                toast.success("Test submitted!");
            }
        } catch {
            toast.error("Error submitting test");
        } finally {
            setSubmitting(false);
        }
    }, [questions, answers]);

    useEffect(() => {
        if (timeLeft === null) return;
        if (timeLeft <= 0) {
            handleSubmit();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev !== null ? prev - 1 : prev));
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, handleSubmit]);

    const handleOptionSelect = (questionId: number, optionId: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    };

    const goNext = () => {
        if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
    };

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    };

    const answeredCount = Object.values(answers).filter((x) => x !== null).length;

    if (questions.length === 0)
        return (
            <AuthGuard>
                <Navbar />
                <div className="flex bg-white justify-center items-center h-screen">
                    <p className="text-black">Loading MCQ Test...</p>
                </div>
            </AuthGuard>
        );

    return (
        <AuthGuard>
            <Navbar />

            <div className="min-h-screen w-full flex justify-center bg-[#EDF4FF]">
                <div className="w-full px-4 mt-6 mb-10">

                    {view === "exam" && (
                        <QuestionCard
                            question={questions[currentIndex]}
                            index={currentIndex}
                            total={questions.length}
                            answers={answers}
                            onSelect={handleOptionSelect}
                            goPrev={goPrev}
                            goNext={goNext}
                            isLast={currentIndex === questions.length - 1}
                            submitting={submitting}
                            onSubmit={() => setShowSubmitModal(true)}
                            timeLeft={timeLeft!}
                        />
                    )}

                    {view === "result" && result && (
                        <ResultCard result={result} onRetry={() => window.location.reload()} />
                    )}
                </div>
                <SubmitConfirmModal
                    open={showSubmitModal}
                    onClose={() => setShowSubmitModal(false)}
                    onConfirm={() => {
                        setShowSubmitModal(false);
                        handleSubmit();
                    }}
                    remainingTime={`${Math.floor(timeLeft! / 60)
                        .toString()
                        .padStart(2, "0")}:${(timeLeft! % 60).toString().padStart(2, "0")}`}
                    totalQuestions={questions.length}
                    answered={answeredCount}
                    marked={markedCount}
                />

            </div>
        </AuthGuard>
    );
}

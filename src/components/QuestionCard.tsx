"use client";

import Image from "next/image";
import { IQuestion } from "@/types/types";
import { Play, Timer } from "lucide-react";
import { ArticleNyTimes } from "@phosphor-icons/react";
import { useState } from "react";
import ComprehensionModal from "./ComprehensionModal";

interface QuestionCardProps {
    question: IQuestion;
    index: number;
    total: number;
    answers: Record<number, number | null>;
    onSelect: (questionId: number, optionId: number) => void;
    goPrev: () => void;
    goNext: () => void;
    isLast: boolean;
    submitting: boolean;
    onSubmit: () => void;
    timeLeft: number;
}

export default function QuestionCard({
    question,
    index,
    total,
    answers,
    onSelect,
    goPrev,
    goNext,
    isLast,
    submitting,
    onSubmit,
    timeLeft
}: QuestionCardProps) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="flex w-full h-screen bg-[#F5F7FA] gap-4">
            <div className="flex-1 bg-white rounded-xl shadow p-3 overflow-y-auto">
                <div className="flex items-center justify-between py-2">
                    <h1 className="text-2xl text-[#1C3141]">Ancient Indian History MCQ</h1>
                    <p className="text-xs text-gray-500">
                        {index}/{total}
                    </p>
                </div>

                {question.comprehension && (
                    <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#177A9C] hover:bg-[#136B87] text-white text-[10px] px-4 py-2 rounded-md shadow transition">
                        <span className="bg-white p-0.5 rounded">
                            <ArticleNyTimes size={14} className="text-[#177A9C]" />
                        </span>
                        Read Comprehensive Paragraph
                        <span>
                            <Play size={10} className="fill-white text-white" />
                        </span>
                    </button>
                )}

                <p className="text-sm my-2 text-gray-800">
                    {index + 1}. {question.question}
                </p>

                {question.image && (
                    <div className="my-3">
                        <Image src={question.image} width={300} height={200} alt="question" className="rounded-xl" />
                    </div>
                )}
                <p className="text-xs text-[#5c5c5c] my-3">
                    Choose the answer:
                </p>

                <div className="space-y-2">
                    {question.options.map((opt, index) => {
                        const letters = ["A", "B", "C", "D"];
                        const selected = answers[question.id] === opt.id;
                        return (
                            <label key={opt.id} onClick={() => onSelect(question.id, opt.id)}
                                className={`flex items-center justify-between border border-gray-400 rounded-lg py-3 px-4 cursor-pointer text-[13px] font-medium text-[#1C3141]  hover:bg-gray-50${selected ? "border-blue-600 bg-blue-50" : ""}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span >{letters[index]}.</span>
                                    <span>{opt.option}</span>
                                </div>
                                <input type="radio" checked={selected} onChange={() => onSelect(question.id, opt.id)} className="w-4 h-4" />
                            </label>
                        );
                    })}
                </div>

                <div className="flex mt-6 gap-4">
                    <button className="flex-1 py-3 rounded-lg bg-[#800080] text-white disabled:opacity-50">
                        Mark for review
                    </button>

                    <button onClick={goPrev} disabled={index === 0} className="flex-1 py-2 rounded-lg bg-[#CECECE] text-black disabled:opacity-50">
                        Previous
                    </button>

                    {!isLast && (
                        <button onClick={goNext} className="flex-1 py-3 rounded-lg bg-[#1C3141] text-white">
                            Next
                        </button>
                    )}

                    {isLast && (
                        <button onClick={onSubmit} disabled={submitting} className="flex-1 py-3 rounded-lg bg-green-600 text-white disabled:opacity-50" >
                            {submitting ? "Submitting..." : "Submit"}
                        </button>
                    )}
                </div>
            </div>

            <div className="w-1/3 bg-white rounded-xl shadow p-2 overflow-y-auto">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-sm  text-[#1C3141]">
                        Question No. Sheet:
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#1C3141]">Remaining Time:</span>
                        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#1C3141] text-white text-xs font-semibold">
                            <Timer size={12} />
                            <span>
                                {String(Math.floor(timeLeft! / 60)).padStart(2, "0")} :
                                {String(timeLeft! % 60).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-10 gap-2 mt-4">
                    {Array.from({ length: total }, (_, i) => {
                        const qId = i + 1;
                        return (
                            <button key={i} className={`w-8 h-8 flex items-center justify-center text-sm text-[#1c3141] border border-gray-300 rounded ${index + 1 === qId ? "bg-blue-600 text-white" : ""}  ${answers[question.id] ? "bg-green-500" : ""} `}>
                                {qId}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 flex gap-2 justify-center items-center">
                    <div className="flex items-center text-black gap-2 text-[7px] ">
                        <span className="w-3 h-3 bg-green-600 rounded inline-block"></span> Attended
                    </div>
                    <div className="flex items-center text-black gap-2 text-[7px]">
                        <span className="w-3 h-3 bg-red-500 rounded inline-block"></span> Not Attended
                    </div>
                    <div className="flex items-center text-black gap-2 text-[7px]">
                        <span className="w-3 h-3 bg-purple-600 rounded inline-block"></span> Marked For Review
                    </div>
                    <div className="flex items-center text-black gap-2 text-[7px]">
                        <span className="w-3 h-3 bg-yellow-500 rounded inline-block"></span> Answered & Marked For Review
                    </div>
                </div>
            </div>

            {showModal && (
                <ComprehensionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    content={question.comprehension}
                />
            )}
        </div>
    );
}

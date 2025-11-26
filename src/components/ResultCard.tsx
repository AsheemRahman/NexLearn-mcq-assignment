"use client";

import { SubmitAnswerResponse } from "@/types/types";
import { CheckCircle, XCircle, HelpCircle, ListChecks } from "lucide-react";


interface ResultCardProps {
    result: SubmitAnswerResponse;
    onRetry: () => void;
}

export default function ResultCard({ result, onRetry }: ResultCardProps) {
    return (
        <div className="flex  justify-center min-h-screen bg-[#F0F7FA] px-4">
            <div className="w-full max-w-sm">

                <div className="bg-linear-to-r from-[#0B5A7A] to-[#0A6C8F] text-white rounded-xl py-5 text-center shadow-md">
                    <p className="text-lg font-medium mb-2">Marks Obtained:</p>
                    <p className="text-5xl ">
                        {result.score} / {result.details.length}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow mt-6 p-6 space-y-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-yellow-500 text-white p-1 rounded-l">
                                <ListChecks size={20} />
                            </div>
                            <p className="text-gray-700 font-medium">Total Questions:</p>
                        </div>
                        <p className="font-semibold text-gray-900">{result.details.length}</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-600 text-white p-1 rounded-l">
                                <CheckCircle size={20} />
                            </div>
                            <p className="text-gray-700 font-medium">Correct Answers:</p>
                        </div>
                        <p className="font-semibold text-green-700">
                            {String(result.correct).padStart(3, "0")}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-red-600 text-white p-1 rounded-l">
                                <XCircle size={20} />
                            </div>
                            <p className="text-gray-700 font-medium">Incorrect Answers:</p>
                        </div>
                        <p className="font-semibold text-red-600">
                            {String(result.wrong).padStart(3, "0")}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-600 text-white p-1 rounded-l">
                                <HelpCircle size={20} />
                            </div>
                            <p className="text-gray-700 font-medium">Not Attended Questions:</p>
                        </div>
                        <p className="font-semibold text-gray-700">
                            {String(result.not_attended).padStart(3, "0")}
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={onRetry} className="bg-[#1C3141] w-full py-3 rounded-lg text-white text-lg font-medium shadow hover:bg-[#0f1f2d] transition">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}

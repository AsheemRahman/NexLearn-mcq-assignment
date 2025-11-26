"use client";

import { Timer, ListChecks, ClipboardList, Bookmark } from "lucide-react";

interface SubmitConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    remainingTime: string;
    totalQuestions: number;
    answered: number;
    marked: number;
}

export default function SubmitConfirmModal({
    open,
    onClose,
    onConfirm,
    remainingTime,
    totalQuestions,
    answered,
    marked,
}: SubmitConfirmModalProps) {
    if (!open) return null;

    return (
        <div className="fixed  inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-xs rounded-2xl shadow-lg p-6 relative">

                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" >
                    ✕
                </button>
                <h2 className="text-xs font-semibold text-[#1C3141] mb-3">
                    Are you sure you want to submit the test?
                </h2>
                <hr className="mb-2 h-[1.5px] bg-[#CECECE]" />
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#1c3141] rounded flex items-center justify-center">
                            <Timer className="text-white" size={12} />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Remaining Time:
                            <span className="font-bold">{remainingTime}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#DDA428] rounded flex items-center justify-center">
                            <ListChecks className="text-white" size={12} />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Total Questions:
                            <span className="font-bold">{totalQuestions}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#4CAF50] rounded flex items-center justify-center">
                            <ClipboardList className="text-white" size={12} />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Questions Answered:
                            <span className="font-bold">{answered.toString().padStart(3, "0")}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-[#800080] rounded flex items-center justify-center">
                            <Bookmark className="text-white" size={12} />
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                            Marked for review: <span className="font-bold">{marked.toString().padStart(3, "0")}</span>
                        </p>
                    </div>
                </div>

                <button onClick={onConfirm} className="mt-6 w-full bg-[#1C3141] text-white py-3 rounded-lg  text-sm hover:bg-[#0F2533]" >
                    Submit Test
                </button>
            </div>
        </div>
    );
}

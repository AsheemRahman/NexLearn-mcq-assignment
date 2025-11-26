"use client";

interface ComprehensionModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string | null;
}

export default function ComprehensionModal({ isOpen, onClose, content}: ComprehensionModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    ✖
                </button>

                <h2 className="text-lg text-[#1C3141] border-b pb-2 mb-3">
                    Comprehensive Paragraph
                </h2>

                <p className="text-sm text-gray-700 whitespace-pre-line">
                    {content}
                </p>

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 text-sm bg-[#1C3141] text-white hover:bg-[#1C3141]/90 rounded-lg">
                        Minimize
                    </button>
                </div>
            </div>
        </div>
    );
}

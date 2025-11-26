"use client";

import AuthGuard from "@/components/Auth";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function Instructions() {
    const router = useRouter()

    const handleStartTest = () => {
        router.push("/mcq")
    }

    return (
        <AuthGuard>
            <Navbar />
            <div className="min-h-screen w-full flex justify-center bg-[#EDF4FF]">
                <div className="w-full max-w-3xl text-center px-4 mt-6">

                    <h1 className="text-4xl  text-[#1C3141] mb-5">
                        Ancient Indian History MCQ
                    </h1>

                    <div className="bg-[#1C3141] text-white rounded-xl py-6 px-8 flex items-center justify-between shadow-md">
                        <div className="flex flex-col items-center w-1/3">
                            <p className="text-sm opacity-80">Total MCQ’s:</p>
                            <p className="text-4xl mt-4">100</p>
                        </div>
                        <div className="w-px h-20 bg-white"></div>
                        <div className="flex flex-col items-center w-1/3">
                            <p className="text-sm opacity-80">Total marks:</p>
                            <p className="text-4xl  mt-4">100</p>
                        </div>
                        <div className="w-px h-20 bg-white"></div>
                        <div className="flex flex-col items-center w-1/3">
                            <p className="text-sm opacity-80">Total time:</p>
                            <p className="text-4xl mt-4">90:00</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl text-left">
                        <h2 className="text-md text-gray-600 mb-3">Instructions:</h2>
                        <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-500">
                            <li>You have 100 minutes to complete the test.</li>
                            <li>Test consists of 100 multiple-choice q’s.</li>
                            <li>You are allowed 2 retest attempts if you do not pass on the first try.</li>
                            <li>Each incorrect answer will incur a negative mark of -1/4.</li>
                            <li>Ensure you are in a quiet environment and have a stable internet connection.</li>
                            <li>Keep an eye on the timer, and try to answer all questions within the given time.</li>
                            <li>Do not use any external resources such as dictionaries, websites, or assistance.</li>
                            <li>Complete the test honestly to accurately assess your proficiency level.</li>
                            <li>Check answers before submitting.</li>
                            <li>
                                Your test results will be displayed immediately after submission, indicating
                                whether you have passed or need to retake the test.
                            </li>
                        </ol>
                    </div>

                    <button className="w-100 bg-[#1C3141] hover:bg-[#0a1b2f] transition text-white py-3 rounded-lg" onClick={handleStartTest}>
                        Start Test
                    </button>
                </div>
            </div>
        </AuthGuard>
    );
}

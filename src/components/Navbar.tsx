"use client";

import { GraduationCap } from "lucide-react";
import authApi from '@/app/service/authApi';
import { useRouter } from "next/navigation";


export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await authApi.logoutApi();
        if (response?.status) {
            router.replace('/login');
        }
    };

    return (
        <nav className="w-full px-8  flex items-center justify-between bg-white border-b-2 shadow-sm">
            <div></div>
            <div className="flex items-center gap-2">
                <GraduationCap size={70} className="text-[#0a5c72]" />
                <div className="flex flex-col leading-tight">
                    <span className="text-3xl font-semibold text-[#0a5c72]">
                        NexLearn
                    </span>
                    <span className="text-xs text-gray-600 -mt-1">
                        futuristic learning
                    </span>
                </div>
            </div>

            <button onClick={handleLogout} className="bg-[#177A9C] text-white text-xs px-4 py-2 rounded-md hover:bg-[#0d708a] transition">
                Logout
            </button>
        </nav>
    );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        if (!access_token) {
            toast.error("Access denied. Please login again.");
            router.replace("/login");
        }
    }, [router]);

    return <>{children}</>;
}

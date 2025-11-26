"use client";

import Image from "next/image";
import { useState } from "react";
import { GraduationCap } from "lucide-react";

import DetailsStep from "@/components/DetailsStep";
import OtpStep from "@/components/OtpStep";
import PhoneStep from "@/components/PhoneStep";

import authApi from "@/app/service/authApi";
import { toast } from "react-toastify";
import { DetailForm } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Login() {
    const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<DetailForm>({
        name: "",
        email: "",
        qualification: "",
        district: "",
        profile_image: null,
    });

    const router = useRouter();

    const handlePhoneSubmit = async () => {
        if (!/^[0-9]{10}$/.test(phone)) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const fullPhone = `+91${phone}`;
            const res = await authApi.sendOtpApi(fullPhone);
            if (res.success) {
                setStep("otp");
            } else {
                setError(res.message || "Failed to send OTP");
            }
        } catch (error) {
            console.log("error while sending otp", error);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (!/^[0-9]{6}$/.test(otp)) {
            setError("OTP must be 6 digits.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const fullPhone = `+91${phone}`;
            const res = await authApi.verifyOtpApi(fullPhone, otp);
            if (!res.success) {
                setError(res.message);
                return;
            }
            if (res.login === true) {
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                toast.success("Login Successful!");
                // router.push("/instructions");
                // return;
            }
            setStep("details");
        } catch (error) {
            console.log("Error while verify otp", error);
            setError("Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitDetails = async () => {
        if (!details.name || !details.qualification || !details.district || !details.profile_image) {
            setError("Please fill all required fields");
            return;
        }
        try {
            const fullPhone = `+91${phone}`;
            const res = await authApi.createProfileApi({
                mobile: fullPhone,
                ...details,
            });
            console.log("response from creating", res);
            if (res.success) {
                localStorage.setItem("access_token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token);
                toast.success("Profile Created Successfully!");
                router.push("/instructions");
            } else {
                setError(res.message);
            }
        } catch (error) {
            console.log("error while submitting details", error);
            setError("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4 sm:px-6" style={{ backgroundImage: "url('/login-background.jpg')" }}>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 w-full max-w-4xl">
                <div className=" flex flex-col md:flex-row w-full  bg-[#1C3141]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
                    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 text-white">
                        <div className="flex items-center gap-3 mb-6 text-center md:text-left">
                            <GraduationCap size={64} className="hidden sm:block md:h-[90px] md:w-[90px]" />
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                                    NexLearn
                                </h1>
                                <p className="text-xs sm:text-sm opacity-80">
                                    futuristic learning
                                </p>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 relative">
                                <Image src="/illustration.png" alt="Illustration" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    <div className=" w-full md:w-1/2 bg-white m-3 md:m-4 rounded-xl flex flex-col p-5 sm:p-6 lg:p-8">
                        {loading && (
                            <p className="text-blue-500 text-xs sm:text-sm mb-2">
                                Please wait...
                            </p>
                        )}
                        <div className="max-h-[50vh] overflow-y-auto pr-1">

                            {step === "phone" && (
                                <PhoneStep
                                    phone={phone}
                                    setPhone={setPhone}
                                    error={error}
                                    handlePhoneSubmit={handlePhoneSubmit}
                                />
                            )}

                            {step === "otp" && (
                                <OtpStep
                                    otp={otp}
                                    setOtp={setOtp}
                                    phone={phone}
                                    error={error}
                                    handleOtpSubmit={handleOtpSubmit}
                                />
                            )}

                            {step === "details" && (
                                <DetailsStep
                                    details={details}
                                    setDetails={setDetails}
                                    error={error}
                                    setError={setError}
                                    handleSubmitDetails={handleSubmitDetails}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

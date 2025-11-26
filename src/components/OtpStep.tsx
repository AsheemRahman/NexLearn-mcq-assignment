"use client";
import React from "react";

interface OtpStepProps {
    otp: string;
    setOtp: (value: string) => void;
    phone: string;
    error: string;
    handleOtpSubmit: () => void;
}

export default function OtpStep({ otp, setOtp, phone, error, handleOtpSubmit }: OtpStepProps) {
    return (
        <>
            <div>
                <h2 className="text-2xl text-[#1C3141] font-semibold">Enter the code we texted you</h2>
                <p className="text-sm text-gray-600 mt-1">
                    We’ve sent an SMS to <span className="font-medium">+91 {phone}</span>
                </p>

                <label className="text-sm text-[#5C5C5C] mb-1 mt-4 block">SMS code</label>

                <input type="text" maxLength={6} value={otp}  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit OTP" className="w-full text-black border border-gray-300 rounded-xl px-4 py-3 text-[15px] outline-none"
                />

                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <p className="text-xs text-gray-600 my-2">
                    Your 6 digit code is on its way. This can sometimes take a few moments to arrive.
                </p>

                <button className="text-black text-sm hover:text-blue-500 underline transition">
                    Resend code
                </button>
            </div>

            <button onClick={handleOtpSubmit}  className="w-full bg-[#1C3141] text-white py-3 rounded-md mt-6 hover:bg-[#0b1623] transition">
                Get Started
            </button>
        </>
    );
}

"use client";

interface PhoneStepProps {
    phone: string;
    setPhone: (value: string) => void;
    error: string;
    handlePhoneSubmit: () => void;
}


export default function PhoneStep({ phone, setPhone, error, handlePhoneSubmit }: PhoneStepProps) {
    return (
        <>
            <div>
                <h2 className="text-2xl text-[#1C3141] font-semibold">Enter your phone number</h2>
                <p className="text-sm text-gray-600 mt-1">
                    We use your mobile number to identify your account
                </p>

                <label className="text-sm text-[#5C5C5C] mb-1 mt-4 block">Phone number</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3">
                    <div className="w-6 h-3 flex flex-col overflow-hidden rounded-sm border border-gray-300">
                        <div className="h-1 bg-[#FF9933]" />
                        <div className="h-1 bg-white" />
                        <div className="h-1 bg-[#138808]" />
                    </div>
                    <span className="text-gray-700 text-[15px] font-medium">+91</span>
                    <input type="text" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} placeholder="1234 567891" className="w-full text-black outline-none text-[15px]"/>
                </div>

                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <p className="text-xs text-gray-500 mt-3">
                    By tapping Get started, you agree to the{" "}
                    <span className="text-blue-600 cursor-pointer">Terms & Conditions</span>
                </p>
            </div>

            <button onClick={handlePhoneSubmit} className="w-full bg-[#1C3141] text-white py-3 rounded-md mt-6 hover:bg-[#0b1623] transition">
                Get Started
            </button>
        </>
    );
}

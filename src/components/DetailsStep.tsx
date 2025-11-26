"use client";

import { DetailForm } from "@/types/types";
import { MedicalBoxIcon } from "@/utils/custom-icon";
import Image from "next/image";
import { X } from "lucide-react";
import { useRef, useState } from "react";


interface DetailsStepProps {
    details: DetailForm;
    setDetails: React.Dispatch<React.SetStateAction<DetailForm>>;
    handleSubmitDetails: () => void;
    error: string;
    setError: (value: string) => void;
}


export default function DetailsStep({ details, setDetails, handleSubmitDetails, error, setError }: DetailsStepProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        const newUrl = URL.createObjectURL(file);
        setPreviewUrl(newUrl);
        setDetails({ ...details, profile_image: file });
    };

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setDetails({ ...details, profile_image: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validate = () => {
        if (!details.profile_image) return "Please upload a profile image";
        if (!details.name.trim()) return "Name is required";
        if (details.name.trim().length < 4) return "Name should be more than 4 letters";
        if (!details.email.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(details.email.trim())) return "Please enter a valid email address";
        if (!details.qualification.trim()) return "Qualification is required";
        if (details.qualification.trim().length < 4) return "Qualification should be more than 4 letters";
        if (!details.district.trim()) return "Please select your district";
        return "";
    };

    const handleDetails = () => {
        const err = validate();
        if (err) {
            setError(err)
            return;
        }
        handleSubmitDetails();
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto pr-2 max-h-[45vh]">
                <h2 className="text-2xl text-[#1C3141] font-semibold">Add Your Details</h2>
                <div className="flex justify-center">
                    <label className="mt-3 w-[55%] h-30 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer relative">
                        {details.profile_image ? (
                            <div className="relative w-full flex items-center justify-center py-3">
                                <Image src={previewUrl!} width={140} height={140} alt="Preview" className="rounded-xl object-cover border" />
                                <button onClick={(e) => { e.preventDefault(); handleRemoveImage(); }} className="absolute top-2 right-2 bg-white rounded-full shadow p-1 hover:bg-red-100">
                                    <X size={18} className="text-red-600" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-5">
                                <div className="w-10 h-10 flex items-center justify-center rounded-md">
                                    <MedicalBoxIcon />
                                </div>
                                <p className="text-gray-400 text-sm mt-2">Add Your Profile picture</p>
                            </div>
                        )}
                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

                <label className="text-sm text-[#5C5C5C] mt-6">Name*</label>
                <input type="text" placeholder="Enter your Full Name" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 mt-1 outline-none"
                />

                <label className="text-sm text-[#5C5C5C] mt-4">Email</label>
                <input type="email" placeholder="Enter your Email Address" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 mt-1 outline-none"
                />

                <label className="text-sm text-[#5C5C5C] mt-4">Your qualification*</label>
                <input type="text" placeholder="Enter your Qualification" value={details.qualification} onChange={(e) => setDetails({ ...details, qualification: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 mt-1 outline-none"
                />

                <label className="text-sm text-[#5C5C5C] mt-4">Your District*</label>
                <select value={details.district} onChange={(e) => setDetails({ ...details, district: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 mt-1 outline-none bg-white cursor-pointer"
                >
                    <option value="">Select your district</option>
                    <option>Wayanad</option>
                    <option>Kozhikode</option>
                    <option>Kannur</option>
                    <option>Malappuram</option>
                    <option>Thrissur</option>
                    <option>Ernakulam</option>
                    <option>Trivandrum</option>
                </select>
            </div>

            <button className="w-full bg-[#1C3141] text-white py-2.5 rounded-md mt-3 hover:bg-[#0b1623] transition" onClick={handleDetails}>
                Get Started
            </button>
        </>
    );
}

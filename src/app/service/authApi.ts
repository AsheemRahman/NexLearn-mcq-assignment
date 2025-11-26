import axios, { AxiosInstance } from "axios";
import { toast } from 'react-toastify';

import { ANSWERS, AUTH, QUESTION } from "@/utils/constants";
import { IDetails } from "@/types/types";

const API_URI = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URI,
});

axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data?.message);
        toast.error(error.response?.data?.message || "API Error");
    } else {
        console.error("Unexpected Error:", error);
        toast.error("Something went wrong. Please try again.");
    }
};

const sendOtpApi = async (mobile: string) => {
    try {
        const formData = new FormData();
        formData.append("mobile", mobile);
        const response = await axiosInstance.post(`${AUTH}/send-otp`, formData);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

const verifyOtpApi = async (mobile: string, otp: string) => {
    try {
        const formData = new FormData();
        formData.append("mobile", mobile);
        formData.append("otp", otp);
        const response = await axiosInstance.post(`${AUTH}/verify-otp`, formData);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const createProfileApi = async (data: IDetails) => {
    try {
        const formData = new FormData();
        formData.append("mobile", data.mobile);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("qualification", data.qualification);
        if (data.profile_image) {
            formData.append("profile_image", data.profile_image);
        }
        const response = await axiosInstance.post(`${AUTH}/create-profile`, formData);
        return response.data;
    } catch (error: unknown) {
        handleAxiosError(error)
    }
};

export const logoutApi = async () => {
    try {
        const response = await axiosInstance.post(`${AUTH}/logout`,)
        return response
    } catch (error: unknown) {
        handleAxiosError(error)
    }
}

export const listQuestions = async () => {
    try {
        const response = await axiosInstance.get(`${QUESTION}/list`);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};

export const submitAnswers = async (answers: FormData) => {
    try {
        const response = await axiosInstance.post(`${ANSWERS}/submit`, answers);
        return response.data;
    } catch (error) {
        handleAxiosError(error);
    }
};


const authApi = { sendOtpApi, verifyOtpApi, createProfileApi, logoutApi, listQuestions, submitAnswers };

export default authApi;
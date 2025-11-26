export interface DetailForm {
    name: string;
    email: string;
    qualification: string;
    district: string;
    profile_image: File | null;
}


export interface IDetails {
    mobile: string;
    name: string;
    email: string;
    qualification: string;
    district: string;
    profile_image: File | null;
}

export interface Option {
    id: number;
    option: string;
}

export interface IQuestion {
    id: number;
    number: number;
    question: string;
    comprehension: string | null;
    image: string | null;
    options: Option[];
}

export interface BackendQuestion {
    question_id: number;
    number: number;
    question: string;
    comprehension: string | null;
    image: string | null;
    options: Option[];
}

export interface ListQuestionsResponse {
    success: boolean;
    questions_count: number;
    total_marks: number;
    total_time: number;
    time_for_each_question: number;
    mark_per_each_answer: number;
    instruction: string;
    questions: BackendQuestion[];
}

export interface SubmitAnswerItem {
    question_id: number;
    selected_option_id: number | null;
}

export interface AnswerDetail {
    question_id: number;
    selected_option_id: number | null;
    correct_option_id: number;
    is_correct: boolean | null;
    status: "correct" | "wrong" | "not_attended";
}

export interface SubmitAnswerResponse {
    success: boolean;
    exam_history_id: string;
    score: number;
    correct: number;
    wrong: number;
    not_attended: number;
    submitted_at: string;
    details: AnswerDetail[];
}

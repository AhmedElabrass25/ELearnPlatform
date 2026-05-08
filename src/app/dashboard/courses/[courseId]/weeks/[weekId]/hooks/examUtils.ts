export interface ExamFormData {
    title: string;
    duration: number;
    availableFrom: string;
    availableUntil: string;
    isPublished: boolean;
}

export const emptyExamForm: ExamFormData = { 
    title: "", 
    duration: 0, 
    availableFrom: "",
    availableUntil: "",
    isPublished: true
};

export const formatToLocalDatetimeString = (dateString?: string) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return "";
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${dateObj.getFullYear()}-${pad(dateObj.getMonth() + 1)}-${pad(dateObj.getDate())}T${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`;
};

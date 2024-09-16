/// MainIndexPage Props
import { ReactNode } from 'react';
export interface MainIndexPageProps {
    children: ReactNode;
}

/// LandingPage component props Interface
export interface LandingPageProps {
    onGetStarted?: () => void;
}

/// LandingPage component props Interface
export interface NavbarProps {
    handleToggle?: () => void;
    onUpload?: () => void;
    isGrid?: boolean;
    // setIsGrid: (isGrid: boolean) => void;
}

/// Upload Form props Interface
export interface UploadFormProps {
    onDataUpload: (formData: FormData) => void;
    setShowModal: (value: boolean) => void;
}

/// Form data Inter face
export interface FormData {
    title: string;
    music: File | null;
    image: File | null;
}
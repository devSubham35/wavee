// MainIndexPage Props
import { ReactNode } from 'react';

export interface MainIndexPageProps {
    children: ReactNode;
}

// LandingPage component props Interface
export interface LandingPageProps {
    onGetStarted?: () => void;
}

// Navbar component props Interface
export interface NavbarProps {
    handleToggle?: () => void;
    onUpload?: () => void;
    isGrid?: boolean;
}

// Upload Form props Interface
export interface UploadFormProps {
    onDataUpload: (formData: FormData) => void;
    setShowModal: (show: boolean) => void;
}

// Form data Interface
export interface FormData {
    title?: string;  // Title is optional
    music?: File | null;  // Music file is optional and can be null
    image?: File | null;  // Image file is optional and can be null
}

// Music Track
export interface MusicTrack {
    name?: string;
    duration?: string;
    image?: string;
    music?: string;
}

// Progress bar
export interface Track {
    name?: string;
    image?: string;
}

// Modal
export interface ModalProps {
    children?: ReactNode;
    showModal?: boolean;
    setShowModal?: (show: boolean) => void;  // Optional if not used
}

// Music Card
export interface MusicCardProps {
    musicData?: MusicTrack;  // Use MusicTrack here for consistency
    isPlaying?: boolean;
    isGrid?: boolean;
    onPlay?: () => void;
}

// Audio Ref
export interface AudioRef {
    current: HTMLAudioElement;
}

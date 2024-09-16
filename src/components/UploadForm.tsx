import { UploadFormProps } from '@/utils/types';
import React, { useState, ChangeEvent, DragEvent } from 'react';

interface FormData {
  title: string;
  music: File | null;
  image: File | null;
}

const UploadForm: React.FC<UploadFormProps> = ({ onDataUpload, setShowModal }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    music: null,
    image: null,
  });

  const [dragActive, setDragActive] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add error message state

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, fileType: 'music' | 'image') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], fileType);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, fileType: 'music' | 'image') => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], fileType);
    }
  };




  const handleFile = (file: File, fileType: 'music' | 'image') => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validMusicTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
  
    // Validate file type based on the field
    if (fileType === 'image' && !validImageTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, GIF)');
      return;
    }
    if (fileType === 'music' && !validMusicTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid music file (MP3, WAV, MPEG)');
      return;
    }
  
    // Reset error message
    setErrorMessage(null);
  
    setFormData(prev => ({ ...prev, [fileType]: file }));
  
    // If it's an image, set up the preview
    if (fileType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };




  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      setErrorMessage('Title is required');  // Set error message if title is empty
      return;
    }

    setErrorMessage(null); // Clear the error message if the title is valid
    onDataUpload(formData);
  };

  return (
    <div className="w-[40rem]">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 focus:outline-none`}
            id="title"
            type="text"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
          {errorMessage && !errorMessage.includes("image") && !errorMessage.includes("music") && <p className="text-red-500 font-bold text-[14px] mt-2">{errorMessage}</p>}
        </div>
        
        {/* Music Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Music
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'music')}
          >
            <input
              type="file"
              id="music-upload"
              onChange={(e) => handleChange(e, 'music')}
              className="hidden"
              accept="audio/*"
            />
            <label htmlFor="music-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop music file here or click to select
                </p>
              </div>
            </label>
            {errorMessage && errorMessage?.includes("music") && <p className="text-red-500 font-bold text-[14px] mt-2">{errorMessage}</p>}
          </div>
          {formData.music && (
            <div className="mt-2 text-sm text-gray-600">
              Uploaded: {formData.music.name}
            </div>
          )}
        </div>
        
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Thumbnail
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => handleDrop(e, 'image')}
          >
            <input
              type="file"
              id="image-upload"
              onChange={(e) => handleChange(e, 'image')}
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <p className="mt-2 text-sm text-gray-500">
                  Drag and drop image file here or click to select
                </p>
              </div>
            </label>
            {errorMessage && errorMessage?.includes("image") && <p className="text-red-500 font-bold text-[14px] mt-2">{errorMessage}</p>}
          </div>
          {imagePreview && (
            <div className="mt-2 w-[100px] h-[100px] rounded-xl overflow-hidden">
              <img src={imagePreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="px-8 py-2.5 rounded-full border-2 border-purple-950 bg-purple-950 text-white text-[14px] font-bold"
            type="submit"
          >
            Upload
          </button>
          <button
            className="px-8 py-2.5 rounded-full border-2 text-purple-950 border-purple-950 text-[14px] font-bold"
            type="button"
            onClick={()=>setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;

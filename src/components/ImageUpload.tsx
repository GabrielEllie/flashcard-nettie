import { useState, useRef } from "react";

interface ImageUploadProps {
  onChange?: (file: File) => void;
}

export default function ImageUpload({ onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    console.log(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file); // send file to parent
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.dataTransfer.files?.length) return;
    handleFile(e.dataTransfer.files[0]);
  };
  return (
    <div className="flex flex-col items-center gap-2 pr-2">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        className="flex items-center justify-center w-40 h-40 transition border-2 border-gray-700 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="object-contain max-w-full max-h-full"
          />
        ) : (
          <p className="font-bold text-center text-gray-700">Drag image or click to upload</p>
        )}
      </div>
    </div>
  );
}

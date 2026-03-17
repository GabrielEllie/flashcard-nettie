import { useState, useRef, useEffect } from "react";

interface ImageUploadProps {
  onChange?: (file: File) => void;
  existingImage?: string | null;
}

export default function ImageUpload({ onChange, existingImage = null } : ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingImage);
  const inputRef = useRef<HTMLInputElement | null>(null);


  // Sets preview to existing image if prop is passed to this component
  useEffect(() => {
    setPreview(existingImage);
    if (inputRef.current) inputRef.current.value = "";
  }, [existingImage]) ;

  // cleans up previous url preview
  /* 
    For self, REEMOVVVEEEEEEEEEEEEEE later:
    example:
    User selects file A
    preview = blob:A
    <img src="blob:A">

    User selects file B
    cleanup → revoke(blob:A)
    preview = blob:B
    <img src="blob:B">
  */
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateImage = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gift"];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    const filename = file.name.toLowerCase();
    const validExtension = allowedExtensions.some(ext => filename.endsWith(ext));
    if (!allowedTypes.includes(file.type) || !validExtension) {
        throw new Error("Only JPG, JPEG, PNG, or GIF files are allowed.");
    }
  } 

  // just converts it to a readable url for img element
  const handleFile = (file: File) => {
    setPreview((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return prev;
    });

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    try {
      validateImage(file[0])
    } catch (err) {
      if (err instanceof Error) alert(err.message); //replace alert
      return;
    }
    handleFile(file[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (!file) return;
    try {
      validateImage(file[0])
    } catch (err) {
      if (err instanceof Error) alert(err.message);
      return;
    }
    handleFile(file[0]);
  };

  // const clearImage = () => {
  //   setPreview(null);
  //   if (inputRef.current) inputRef.current.value = "";
  //   onChange?.(null);
  // };
  
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

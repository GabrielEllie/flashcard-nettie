import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';
import ImageUpload from './ImageUpload';

export default function AddCard({
    cardLayout, 
    hideForm
    }:{
    cardLayout:string; 
    hideForm:()=>void }) {

    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = () => hideForm();
    const showIsOpen = () => setIsOpen(true);

    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => setAnswer(event.target.value);

    
    return (
        <div className={`${cardLayout} h-full`}>
            <ConfirmModal 
                isOpen={isOpen} 
                onClose={() => {
                    setIsOpen(false)
                }} 
                onConfirm={handleDelete}
                title="Confirm Discard"
                message="Are you sure you want to discard?"/>
            <form className="w-full">
                <div>
                    <input 
                        className="w-full p-2 text-lg bg-blue-800 rounded-xl"
                        placeholder="Title"
                        value={title}
                        onChange={handleTitleChange}/>
                    <input
                        className="w-full p-2 mt-4 text-lg bg-blue-800 rounded-xl"
                        placeholder="Answer"
                        value={answer}
                        onChange={handleAnswerChange}/>
                </div>
                <div className='flex flex-row w-full h-full'>
                    <ImageUpload onChange={setSelectedImage}/>
                    <div className="flex pt-4 w-full h-full">
                        <button 
                            type="button"
                            onClick={showIsOpen}
                            className="p-2 font-bold text-blue-600 bg-white w-fit rounded-xl">
                            Discard
                        </button>
                            <button 
                            onClick={hideForm}
                            className="p-2 ml-4 font-bold bg-blue-800 w-fit rounded-xl">    
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

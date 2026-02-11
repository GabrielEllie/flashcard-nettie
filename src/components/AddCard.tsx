import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';

export default function AddCard({
    cardLayout, 
    hideForm
    }:{
    cardLayout:string; 
    hideForm:()=>void }) {

    const [isOpen, setIsOpen] = useState(true);
    const handleDelete = () => hideForm();
    const showIsOpen = () => setIsOpen(true);

    const [title, setTitle] = useState("");
    const [answer, setAnswer] = useState("");
    
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
                <input type="file"
                    accept="image/*"/>
            <div className="flex justify-end pt-4">
                <button 
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
            </form>
        </div>
    );
}

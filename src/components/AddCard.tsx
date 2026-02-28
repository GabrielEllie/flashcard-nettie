import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';
import ImageUpload from './ImageUpload';
import FlashcardLayout from '../layouts/FlashcardLayout';
import { Card } from '../type/Flashcard';

export default function AddCard({
    hideForm
    }:{
    hideForm:()=>void }) {

    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = () => hideForm();
    const showIsOpen = () => setIsOpen(true);

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [leftSelectedImage, setLeftSelectedImage] = useState<File | null>(null);
    const [rightSelectedImage, setRightSelectedImage] = useState<File | null>(null);
    
    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value);
    const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(event.target.value);

    const handleSubmit = () => {
        const newcard : Card = {
            "id": crypto.randomUUID(),
            "question": "",
            "questionImage": "",
            "answer": "",
            "answerImage": "", 
        }
    }
    //object-cover h-32 mr-2 rounded-lg aspect-square
    return (
    <form className='flex justify-center w-full'>
        <ConfirmModal 
            isOpen={isOpen} 
            onClose={() => {
                setIsOpen(false)
            }} 
            onConfirm={handleDelete}
            title="Confirm Discard"
            message="Are you sure you want to discard?"
        />
        <FlashcardLayout
            variant="add" 
            // selectedIds={["1", "2", "3"]}
            leftImage={<ImageUpload onChange={setLeftSelectedImage}/>}
            leftDetails={
                <textarea 
                    value={question}
                    placeholder="Question"
                    onChange={handleQuestionChange}
                    className="w-full h-40 p-2 font-thin text-white bg-blue-700 resize-none text-md rounded-xl" 
                />
            }
            rightImage={<ImageUpload onChange={setRightSelectedImage}/>}
            rightDetails={
                <textarea
                    value={answer}
                    placeholder="Answer"
                    onChange={handleAnswerChange}
                    className="w-full h-40 p-2 font-thin text-white bg-blue-700 resize-none text-md rounded-xl"
                />
            }
            footerShow={true}
            footerElement={
                <div className="flex justify-end w-full h-full pt-4 pr-6">
                    <button 
                        type="button"
                        onClick={showIsOpen}
                        className="p-2 font-bold text-blue-600 bg-white w-fit rounded-xl">
                        Discard
                    </button>
                        <button 
                        type="submit"
                        onClick={hideForm}
                        className="p-2 ml-4 font-bold bg-blue-800 w-fit rounded-xl">    
                        Save
                    </button>
                </div>
        }
        />
    </form>
    );
}

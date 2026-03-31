import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal';
import ImageUpload from './ImageUpload';
import FlashcardLayout from '../layouts/FlashcardLayout';
import { Card } from '../type/Flashcard';
import { useSets } from "../context/SetsContext";
import Notification from './Notification';
import { useNotification } from '../context/NotifContext';

type addCardProps = {
    hideForm: () => void;
    setId: string;
}

export default function AddCard({
    hideForm,
    setId
    }:
    addCardProps
    ) {
    
    const { addFlashcard } = useSets();
    const [isOpen, setIsOpen] = useState(false);
    const handleDiscard = () => hideForm();
    const showIsOpen = () => setIsOpen(true);
    const { showNotification } = useNotification();

    // flashcard properties
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [leftSelectedImage, setLeftSelectedImage] = useState<File | null>(null);
    const [rightSelectedImage, setRightSelectedImage] = useState<File | null>(null);
    
    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value);
    const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(event.target.value);

    const convertToBase64 = (file: File): Promise<string> => {
        const convertedFile : Promise<string> = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        })
        return convertedFile;
    }
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const questionImageToBase64 = leftSelectedImage ? await convertToBase64(leftSelectedImage) : "";
        const answerImageToBase64 = rightSelectedImage ? await convertToBase64(rightSelectedImage) : "";
        
        // if(leftSelectedImage) console.log("This is base64:", await convertToBase64(leftSelectedImage));
        // if(rightSelectedImage) console.log("This is base64:", await convertToBase64(rightSelectedImage));

        const newCard : Card = {
            "id": crypto.randomUUID(),
            "question": question,
            "questionImage": questionImageToBase64,
            "answer": answer,
            "answerImage": answerImageToBase64, 
        }

        if ((newCard.question === "" && newCard.questionImage === "") && 
            (newCard.answer === "" && newCard.answerImage === "")) {
            showNotification("Missing field(s)", "orange_warning.png", 4000);
            return;
        }

        try {
            addFlashcard(setId, newCard);
        } catch (err) {
            if (err instanceof Error) alert(err.message);
        }
        setQuestion("");
        setAnswer("");
        setLeftSelectedImage(null);
        setRightSelectedImage(null);
        
        hideForm();
        showNotification("Card added successfully!", "green_check.png", 4000);
    }
    //object-cover h-32 mr-2 rounded-lg aspect-square
    return (
    <form className='flex justify-center w-full' onSubmit={handleSubmit}>
        <ConfirmModal 
            isOpen={isOpen} 
            onClose={() => {
                setIsOpen(false)
            }} 
            onConfirm={handleDiscard}
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
                        className="p-2 font-bold text-blue-600 bg-white hover:bg-gray-400 w-fit rounded-xl">
                        Discard
                    </button>
                        <button 
                        type="submit"
                        // onClick={hideForm}
                        className="p-2 ml-4 font-bold bg-blue-800 hover:bg-blue-900 w-fit rounded-xl">    
                        Save
                    </button>
                </div>
            }
        />
    </form>
    );
}

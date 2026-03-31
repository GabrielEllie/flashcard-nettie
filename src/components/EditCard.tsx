import React, { useState } from "react";
import FlashcardLayout from "../layouts/FlashcardLayout";
import { Card } from "../type/Flashcard";
import ImageUpload from "./ImageUpload";
import { useSets } from "../context/SetsContext";
import { useNotification } from '../context/NotifContext';
import { useParams } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

type EditCardProps = {
  card: Card,
  removeId: () => void,
}


export default function EditCard({
  card, 
  removeId
  }: EditCardProps) {
  const [leftSelectedImage, setLeftSelectedImage] = useState<File | null>(null);
  const [rightSelectedImage, setRightSelectedImage] = useState<File | null>(null);
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const cardId = card.id;

  const { editFlashcard, deleteFlashcard } = useSets(); 
  const { showNotification } = useNotification();
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const showIsOpen = () => setIsOpen(true);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value);
  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(event.target.value);

  const convertToBase64 = (file: File): Promise<string> => {
    const convertedFile: Promise<string> = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
    return convertedFile;
  };

  const handleDelete = () => {
    try {
      deleteFlashcard(id!, cardId);
    }
    catch (err) {
      if (err instanceof Error) alert(err.message);
    }
    showNotification("Card deleted successfully!", "green_check.png", 4000);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // If a new image was dragged in, convert it; otherwise keep the card's existing image
    const questionImageToBase64 = leftSelectedImage
      ? await convertToBase64(leftSelectedImage)
      : card.questionImage;
    const answerImageToBase64 = rightSelectedImage
      ? await convertToBase64(rightSelectedImage)
      : card.answerImage;

    const updatedCard: Card = {
      "id": card.id,
      "question": question,
      "questionImage": questionImageToBase64,
      "answer": answer,
      "answerImage": answerImageToBase64,
    };

    if ((updatedCard.question === "" && updatedCard.questionImage === "") &&
        (updatedCard.answer === "" && updatedCard.answerImage === "")) {
      return;
    }

    try {
      editFlashcard(id!, updatedCard); // careful with this might cause error
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }

    showNotification("Card updated successfully!", "green_check.png", 4000);
    removeId();

  };


  return (
    <form className='flex justify-center w-full' onSubmit={handleSubmit}>
      <ConfirmModal 
        isOpen={isOpen} 
        onClose={() => {
            setIsOpen(false)
        }} 
        onConfirm={handleDelete}
        title="Delete Flashcard?"
        message="Are you sure you want to delete this flashcard forever?"
      />
      <FlashcardLayout 
        variant="edit"
        leftImage={<ImageUpload onChange={setLeftSelectedImage} existingImage={card.questionImage} />}
        leftDetails={
          <textarea 
            value={question}
            placeholder="Question"
            onChange={handleQuestionChange}
            className="w-full h-40 p-2 font-thin text-white bg-blue-700 resize-none text-md rounded-xl" 
          />
        }
        rightImage={<ImageUpload onChange={setRightSelectedImage} existingImage={card.answerImage} />}
        rightDetails={
          <textarea 
            value={answer}
            placeholder="Answer" 
            onChange={handleAnswerChange}
            className="w-full h-40 p-2 font-thin text-white bg-blue-700 resize-none text-md rounded-xl" 
          />
        }
        rightButtonShow={true}
        rightButtonElement={
          <div className="flex flex-col justify-around">
            <button
              type="submit"
              
              className="px-4 py-2 text-sm text-white bg-blue-800 hover:bg-blue-900 transition text-md font-bold rounded-xl"
            >Save</button>
            <button
              type="button"
              className="px-4 py-2 text-sm text-blue-700 bg-white hover:bg-gray-400 transition text-md font-bold rounded-xl"
              onClick={removeId}
            >Cancel</button> 
            
            {/* Do a confirm Modal */}
            <div className="flex justify-center items-center">
              <button 
                type="button"
                onClick={showIsOpen}
                className="p-1 font-bold text-white bg-red-600 hover:bg-red-700 w-fit rounded-xl"
              >
                <img src="white_delete.png" className=" w-[35px] h-[35px] rounded-md p-1"/>
              </button>
            </div>
          </div>
      }
        />
    </form> 
  )
}
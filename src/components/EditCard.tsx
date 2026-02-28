import React, { useState } from "react";
import FlashcardLayout from "../layouts/FlashcardLayout";
import { Card } from "../type/Flashcard";
import ImageUpload from "./ImageUpload";

type EditCardProps = {
  card: Card,
  removeId: () => void,
}


export default function EditCard({
  card, 
  removeId
  }: EditCardProps) { //
  const [leftSelectedImage, setLeftSelectedImage] = useState<File | null>(null);
  const [rightSelectedImage, setRightSelectedImage] = useState<File | null>(null);
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(event.target.value);
  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(event.target.value);
  

  return (
    <form className='flex justify-center w-full'>
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
        // rightImage={<ImageUpload onChange={setRightSelectedImage} existingImage={card.questionImage}} 
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
        rightButtonElement={<button>here</button>}
        />
    </form> 
  )
}

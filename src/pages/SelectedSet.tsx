import { useLocation, useParams } from "react-router-dom";
import sets from "../data/dummy.json" //temp
import { useState } from "react";
import AddCard from "../components/AddCard";

export default function SelectedSet() {
  const { id } = useParams();
  const [form, setForm] = useState(false);
  const showForm = () => setForm(true);
  const hideForm = () => setForm(false);

  
  const cardLayout = 'w-[1000px] bg-blue-600 rounded-xl p-4';
  let currentSet = sets.find(s => s.id === id);
  
  if (!currentSet) {
    return <h1>No Flashcard Set Selected</h1>
  }
  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {form ? (
        <AddCard cardLayout={cardLayout}  hideForm={hideForm}/>
      ) : (
      <button 
      onClick={showForm}
      className={`relative flex items-center justify-end h-16 hover:bg-blue-800 ${cardLayout}`}>
        <div className="flex w-full absolute z-[1] justify-center">
          <h1 className="text-xl">Add Flashcard</h1>
          <img src="add.png" className="w-[28px]"/>
        </div>
        <img src="keyboard_arrow_down.png" className="flex w-[35px] absolute"/>
      </button>
      )}
              
      {currentSet.flashcards.map((card) => (
        <div className={`h-36 ${cardLayout} flex flex-row justify-between`}>
          <div className="flex flex-col w-[80%] justify-center">
            <h1 className="text-xl font-bold">Question</h1>
            <p className="font-thin truncate text-md">{card.question}</p>
            <h1 className="text-xl font-bold">Answer</h1>
            <p className="font-thin truncate text-md">{card.answer}</p>
          </div>
          <div className="flex">
            <img src={card.image} className="object-cover rounded-lg aspect-square"/>
          </div>
          <div>
            <button>here</button>
          </div>
        </div>
      ))}
    </div>
  );
}

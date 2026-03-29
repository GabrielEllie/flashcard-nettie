import { useLocation, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import { useSets } from "../context/SetsContext";

import AddCard from "../components/AddCard";
import FlashcardLayout from "../layouts/FlashcardLayout";
import EditCard from "../components/EditCard";
import { FlashcardSet } from "../type/Flashcard";

export default function SelectedSet() {
  const { flashcardSets } = useSets();
  const { id } = useParams();
  const [form, setForm] = useState(false);
  const showForm = () => setForm(true);
  const hideForm = () => setForm(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]); 
  const [currentSet, setCurrentSet] = useState<FlashcardSet | null>();

  useEffect(() => {
    if (id) {
      setCurrentSet(flashcardSets.find(set => set.id === id)) ?? null;
    }
  }, [id, flashcardSets]);

  const addId = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
    console.log(selectedIds);
  };
  const removeId = (id:string) => {
    setSelectedIds(prev => prev.filter(ids => ids !== id));
    console.log(selectedIds);
  }
  
  if (!currentSet) {
    return <h1>No Flashcard Set Selected</h1>
  }
  return (
    <div className="grid w-full grid-cols-1 gap-6 p-5 place-items-center">
      {form ? (
        <AddCard setId={id ?? ""} hideForm={hideForm}/>
      ) : (
      <button 
      onClick={showForm}
      className='relative flex items-center justify-end h-16 hover:bg-blue-800 min-w-[1000px] w-[95%] bg-blue-600 rounded-xl p-4'>
        <div className="flex w-full absolute z-[1] justify-center">
          <h1 className="text-xl">Add Flashcard</h1>
          <img src="add.png" className="w-[28px]"/>
        </div>
        <img src="keyboard_arrow_down.png" className="flex w-[35px] absolute"/>
      </button>
      )}
              
      {/* Render flashcards */}
      {currentSet.flashcards?.map((card) => {
        return (
          <Fragment key={card.id}>
            {selectedIds.includes(card.id) ?
            <EditCard card={card} removeId={() => removeId(card.id)} />
            : 
            <FlashcardLayout
            variant="view" 
            leftImage={card.answerImage ? <img src={card.questionImage} className={`object-cover h-32 mr-2 rounded-lg aspect-square ${!card.answerImage ? "invisible" : ""}`}/> : null}
            leftDetails={<p className="font-thin break-words line-clamp-5 text-md">{card.question}</p>}
            rightImage={card.answerImage ? <img src={card.answerImage} className={`object-cover h-32 mr-2 rounded-lg aspect-square ${!card.answerImage ? "invisible" : ""}`}/> : null}
            rightDetails={<p className="font-thin break-words line-clamp-5 text-md">{card.answer}</p>}
            rightButtonShow={true}
            rightButtonElement={
              <button onClick={() => addId(card.id)}>
                <img src="pencil.png" className="w-10 h-10"/> 
              </button>
            }
            />}
          </Fragment>
        )})
      }
    </div>
  );
}

import { useLocation, useParams } from "react-router-dom";
import sets from "../data/dummy.json" //temp


export default function SelectedSet() {
  const { id } = useParams();
  let currentSet = sets.find(s => s.id === id);
  
  if (!currentSet) {
    return <h1>No Flashcard Set Selected</h1>
  }
  return (
    <div>
      hello?
    </div>
    // <div className="flex flex-col items-center justify-center w-full p-2 bg-cyan-100">
    //     <p className="text-xl font-semibold">Question</p>
    //     <p className="text-xl truncate">cat</p>
    //     <p className="text-xl font-semibold">Answer</p>
    //     <p className="text-xl truncate">meow</p>
    // </div>
  );
}

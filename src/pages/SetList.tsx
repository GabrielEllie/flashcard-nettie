import { Link } from "react-router-dom"
import FlashcardSet from "../data/dummy.json"

export default function SetList() {
  return (
    <div className="grid grid-cols-3 gap-6 p-2">
        {FlashcardSet.map((set) => (
            <div className="h-[250px] w-[320px] p-4"
                key={set.id}>
                <Link 
                to={`/SelectedSet/${set.id}`}
                className="relative inline-block w-full h-full z-5">
                    <div className="pointer-events-none absolute w-full h-full border-2 order-white bg-blue-800/90 translate-x-[18px] translate-y-[18px] rounded-2xl"></div>
                    <div className="pointer-events-none absolute w-full h-full border-2 border-white bg-blue-700/90 translate-x-[9px] translate-y-[9px] rounded-2xl"></div>
                    <div className="relative flex flex-col items-center justify-center w-full h-full bg-blue-600 border-2 rounded-2xl drop-shadow-xl">
                        <h1 className="w-[70%] text-xl text-center break-words line-clamp-5">{set.name}</h1>
                        <p>{set.flashcards.length} Cards</p>
                    </div>
                </Link>
            </div>
        ))}
    </div>
  )
}

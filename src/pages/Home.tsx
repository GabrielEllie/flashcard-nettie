import flashcards from "../data/dummy.json";
export default function Home() {
    const first = flashcards[1];
  return (
    <div className="flex flex-wrap w-full m-2 p-2">
        {first.flashcards.map((card) => (
        <div key={card.id} className="p-[10px]">
            <div className="flex flex-col max-w-[250px] min-h-[250px] border-2 rounded-lg items-center justify-center">
                <img src={`/${card.image}`} className="flex w-[70%] object-cover aspect-square" />
                <p className="text-2xl">{card.question}</p>
                <p>{card.answer}</p>
            </div>
        </div>
        ))}
    </div>
  )
}

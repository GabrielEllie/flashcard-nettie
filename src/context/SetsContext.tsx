import { createContext, useContext, useState } from "react";
import { Card, FlashcardSet } from "../type/Flashcard";
import SetData from '../data/dummy.json';

type SetsContextType = {
    flashcardSets: FlashcardSet[];
    addSet: (newSet: FlashcardSet) => void;
    removeSet: (id: string) => void;
}

const SetsContext = createContext<SetsContextType | null>(null);

export function SetsProvider({children}:{children: React.ReactNode}) {
    const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>(SetData);

    const addSet = (newSet: FlashcardSet) => {
        setFlashcardSets(prev => {
            const exists = prev.some(set => set.id === newSet.id);
            if (exists) throw new Error("Duplicate set id");
            return [...prev, newSet];
        })
    };

    const editSet = (setId: string) => {

    };

    const removeSet = (setId:string) => {
        setFlashcardSets(prev => prev.filter(set => set.id !== setId));
    };

    const addFlashcard (setId:string, newFlashcard: Card) {
        
    }

    return(
        <SetsContext.Provider value={{flashcardSets, addSet, removeSet}}>
            {children}
        </SetsContext.Provider>
    );
}

import { createContext, useContext, useState } from "react";
import { Card, FlashcardSet } from "../type/Flashcard";
import SetData from '../data/dummy.json';

type SetsContextType = {
    flashcardSets: FlashcardSet[];
    getSet: (id: string) => FlashcardSet | null;
    addSet: (newSet: FlashcardSet) => void;
    removeSet: (id: string) => void;
    addFlashcard: (id: string, newFlashcard: Card) => void;
}

const SetsContext = createContext<SetsContextType | null>(null);

export const SetsProvider = ({children}:{children: React.ReactNode}) => {

    const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>(SetData);

    // find set by id
    const getSet = (id: string) => {
        const currentSet = flashcardSets.find(sets => sets.id === id);

        if (!currentSet) return null;
        
        return currentSet
    }

    // add set with new object
    const addSet = (newSet: FlashcardSet) => {
        setFlashcardSets(prev => {
            const exists = prev.some(set => set.id === newSet.id);
            if (exists) throw new Error("Duplicate set id");
            return [...prev, newSet];
        });
    };

    // edit set by id
    const editSet = (setId: string) => {
        return setId;
    };

    // remove set by id
    const removeSet = (setId:string) => {
        setFlashcardSets(prev => prev.filter(set => set.id !== setId));
    };

    // add flashcard object inside a set which uses its id
    const addFlashcard = (setId:string, newFlashcard: Card) => {
        setFlashcardSets(prev =>
            prev.map(set => (
                set.id === setId ? 
                { ...set, flashcards: [...set.flashcards ?? [], newFlashcard] } 
                : 
                set
            ))
        );
    }

    return(
        <SetsContext.Provider value={{flashcardSets, getSet, addSet, removeSet, addFlashcard}}>
            {children}
        </SetsContext.Provider>
    );
}

export const useSets = () => {
    const context = useContext(SetsContext);
    if (!context) {
        throw new Error("useSets must be used inside SetsProvider");
    }
    return context;
}

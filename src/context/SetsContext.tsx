import { createContext, useContext, useState } from "react";
import { Card, FlashcardSet } from "../type/Flashcard";
import SetData from '../data/dummy.json';

type SetsContextType = {
    flashcardSets: FlashcardSet[];
    getSet: (id: string) => FlashcardSet | null;
    addSet: (newSet: FlashcardSet) => void;
    removeSet: (id: string) => void;
    addFlashcard: (id: string, newFlashcard: Card) => void;
    editFlashcard: (id: string, newFlashcard: Card) => void;
    deleteFlashcard: (setId: string, cardId: string) => void;
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
            )
        ));
    };

    // edit set by id
    const editFlashcard = (setId: string | undefined, updatedCard: Card) => {
        console.log(updatedCard);
        if (setId === undefined) throw new Error("Set ID is required to edit flashcard")
        setFlashcardSets(prev => 
            prev.map(set =>
                set.id === setId ? { ...set, flashcards: 
                    set.flashcards?.map(card => card.id === updatedCard.id ? { ...card, ...updatedCard } : card) 
                } : set
            )
        );
    };

    const deleteFlashcard = (setId: string, cardId: string) => {
        setFlashcardSets(prev =>
            prev.map(set =>
                set.id === setId ? { ...set, flashcards: set.flashcards?.filter(card => card.id !== cardId) } : set
            )
        );
    };


    return(
        <SetsContext.Provider value={{flashcardSets, getSet, addSet, removeSet, addFlashcard, editFlashcard, deleteFlashcard}}>
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

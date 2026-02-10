export type Card = {
    question?: string;
    answer?: string;
    image?: string;
}

export type FlashcardSet = {
    name?:string;
    flashcards?: Card[];
}
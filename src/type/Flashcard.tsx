export type Card = {
    id?: string;
    question?: string;
    questionImage?: string;
    answer?: string;
    answerImage?: string;
}

export type FlashcardSet = {
    name?:string;
    flashcards?: Card[];
}
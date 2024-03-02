/**
 * @interface INotes Представляє нотатку користувача.
 * @param {string} subject - До якого предмету відносяться ці нотатки.
 * @param {INoteData[]} notes - Масив нотаток.
 */
export interface INote {
    subject: string;
    notes: INoteData[];
}

/**
 * @interface INoteData Представляє масив нотаток до предмету.
 * @param {Date} date Дата написання нотатки.
 * @param {string} text Текст нотатки.
 */
export interface INoteData {
    date: Date;
    text: string;
}

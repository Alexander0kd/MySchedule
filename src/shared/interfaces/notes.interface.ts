/**
 * Представляє групу нотаток користувача.
 * @param {string} subject - До якого предмету відносяться ці нотатки.
 * @param {INoteData[]} notes - Масив нотаток.
 */
export interface INote {
    subject: string;
    notes: INoteData[];
}

/**
 * Представляє елемент нотаток до предмету.
 * @param {Date} date Дата написання нотатки.
 * @param {string} text Текст нотатки.
 */
export interface INoteData {
    date: Date;
    text: string;
}

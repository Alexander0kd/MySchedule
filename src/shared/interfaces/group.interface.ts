/**
 * @interface IGroup Представляє елемент групи
 * @param {number} f - вибраний факультет
 * @param {number} i - індивідуальний номер групи для запитів
 * @param {number} c - курс групи
 * @param {string} l - назва групи
 */
export interface IGroup {
    f: number;
    i: number;
    c: number;
    l: string;
}

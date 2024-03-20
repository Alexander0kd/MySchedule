/**
 * Представляє елемент групи.
 * @param {number} f - Вибраний факультет.
 * @param {number} i - Індивідуальний номер групи для запитів.
 * @param {number} c - Курс групи.
 * @param {string} l - Назва групи.
 */
export interface IGroup {
    f: number;
    i: number;
    c: number;
    l: string;
}

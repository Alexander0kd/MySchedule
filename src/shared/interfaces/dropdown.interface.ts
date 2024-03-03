/**
 * @interface IDropdown Представляє елемент ряду у випадаючому списку.
 * @param {number | string | boolean} value - ID поля.
 * @param {string} lable- Текст поля.
 */
export interface IDropdown {
    value: number | string | boolean;
    label: string;
}

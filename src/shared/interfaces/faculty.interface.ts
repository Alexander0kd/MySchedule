/**
 * @interface IFaculty Представляє факультет, що використовується в клієнтській частині додатка.
 * @param {string} label - Ідентифікатор факультету.
 * @param {string} value - Назва факультету.
 */
export interface IFaculty {
    label: string;
    value: string;
}

/**
 * @interface IApiFaculty Представляє факультет в тому форматі, який зберігається в АРІ.
 * @param {string} key - Ідентифікатор факультету.
 * @param {string} value - Назва факультету.
 */
export interface IApiFaculty {
    [key: number]: string;
}

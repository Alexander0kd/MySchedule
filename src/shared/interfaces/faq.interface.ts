/**
 * Представляє елемент FAQ (часто задавані питання).
 * @param {string} title - Заголовок групи питань.
 * @param {IFAQChild[]} children - Масив дочірніх елементів, які містять запитання/відповіді.
 */
export interface IFAQ {
    title: string;
    children: IFAQChild[];
}

/**
 * Представляє дочірній елемент FAQ (часто задавані питання).
 * @param {string} title - Питання.
 * @param {string} description - Відповідь.
 */
export interface IFAQChild {
    title: string;
    description: string;
}

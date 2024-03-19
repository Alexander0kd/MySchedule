/**
 * Представляє елемент налаштувань профілю.
 * @param {IHiddenItem} hidden - Масив прихованих пар.
 * @param {INotification} notification - Налаштування сповіщень.
 */
export interface ISettings {
    hidden: IHiddenItem[];
    notification: INotification;
}

/**
 * Представляє видимість предмету у списку.
 * @param {string} l - Назва предмету.
 * @param {boolean} isVisible - Видимість предмету.
 */
export interface IHiddenItem {
    l: string;
    isVisible: boolean;
}

/**
 * Представляє предмет.
 * @param {Object} data - Дані для елементу налаштувань.
 */
export interface INotification {
    // TODO: Fill this
}

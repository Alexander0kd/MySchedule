/**
 * Представляє елемент налаштувань профілю.
 * @param {IHiddenSchedule} hidden - Масив прихованих пар.
 * @param {INotification} notification - Налаштування сповіщень.
 */
export interface ISettings {
    hidden: IHiddenSchedule[];
    notification: INotification;
}

/**
 * Представляє видимість предмету у списку.
 * @param {string} l - Назва предмету.
 * @param {boolean} isVisible - Видимість предмету.
 */
export interface IHiddenSchedule {
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

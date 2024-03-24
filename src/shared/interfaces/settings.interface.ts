import { ISchedule } from "./schedule.interface";

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
 * @param {boolean} notifyChanges - Дані для елементу налаштувань.
 * @param {number} notifyBy - Дані для елементу налаштувань.
 * @param {NotificationItem[]} notificationList - Дані для елементу налаштувань.
 */
export interface INotification {
    notifyChanges: boolean;
    notifyBy: number;
    notificationList: NotificationItem[];
}

/**
 * Представляє предмет.
 * @param {Date} date - Дані для елементу налаштувань.
 * @param {ISchedule} subject - Дані для елементу налаштувань.
 */
export interface NotificationItem {
    date: Date;
    subject: ISchedule;
}

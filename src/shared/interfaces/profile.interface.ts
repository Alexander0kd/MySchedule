import { ISchedule } from './schedule.interface';
import { INotes } from './notes.interface';
import { ISettings } from './settings.interface';
import { AvailableUni } from '../universities/available-uni.enum';

/**
 * @interface IProfile Представляє профіль користувача.
 * @param {string} id - Ідентифікатор профілю.
 * @param {AvailableUni} university - Університет.
 * @param {string} faculty - Факультет.
 * @param {number} year - Рік.
 * @param {string} group - Група.
 * @param {ISchedule[]} schedule - Розклад занять користувача.
 * @param {INotes[]} notes - Замітки користувача.
 * @param {ISettings} settings - Налаштування користувача.
 * @param {Date} lastUpdate - Час останнього оновлення розкладу.
 */
export interface IProfile {
    id: string;

    university: AvailableUni;
    faculty: string;
    year: number;
    group: string;

    schedule: ISchedule[];
    notes: INotes[];
    settings: ISettings;

    lastUpdate: Date;
}

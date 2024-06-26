import { ISchedule } from './schedule.interface';
import { INote } from './notes.interface';
import { ISettings } from './settings.interface';
import { AvailableUni } from '../environment/universities/available-uni.enum';

/**
 * Представляє профіль користувача.
 * @param {string} id - Ідентифікатор профілю.
 * @param {AvailableUni} university - Університет.
 * @param {string} faculty - Факультет.
 * @param {number} year - Рік.
 * @param {string} group - ID Групи.
 * @param {string} groupName - Назва Групи.
 * @param {ISchedule[]} schedule - Розклад занять користувача.
 * @param {INote[]} notes - Замітки користувача.
 * @param {ISettings} settings - Налаштування користувача.
 * @param {Date} lastUpdate - Час останнього оновлення розкладу.
 */
export interface IProfile {
    id: string;

    university: AvailableUni;
    faculty: string;
    year: number;
    group: string;
    groupName: string;

    schedule: ISchedule[];
    notes: INote[];
    settings: ISettings;

    lastUpdate: Date;
}

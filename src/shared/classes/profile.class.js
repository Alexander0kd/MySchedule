import ISchedule from './schedule.class';
import INotes from './notes.class';
import ISettings from './settings.class';

/**
 * @class Представляє профіль користувача.
 * @param {Object} data - Дані для профілю користувача.
 * @param {string} data.id - Ідентифікатор профілю.
 * @param {string} data.university - Університет.
 * @param {string} data.faculty - Факультет.
 * @param {number} data.year - Рік.
 * @param {string} data.group - Група.
 * @param {ISchedule[]} data.schedule[] - Розклад занять користувача.
 * @param {INotes[]} data.notes[] - Замітки користувача.
 * @param {ISettings} data.settings - Налаштування користувача.
 */
export class IProfile {
    constructor(data) {
        this.id = data.id;

        this.university = data.university;
        this.faculty = data.faculty;
        this.year = data.year;
        this.group = data.group;

        this.schedule = data.schedule || {};
        this.notes = data.notes || {};
        this.settings = data.settings || {};
    }
}

import { IProfile } from '../shared/interfaces/profile.interface';
import { ISchedule } from '../shared/interfaces/schedule.interface';

/**
 * Formats the last update date string.
 * @param date - The date object to be formatted.
 * @returns A formatted string representing the last update date.
 */
export function formatLastUpdate(date: Date): string {
    const day = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
    }).format(new Date());

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} | ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

/**
 * Formats the date string.
 * @param date - The date object to be formatted.
 * @returns A formatted string representing the date.
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

/**
 * Filters the schedule based on the given date and profile.
 * @param date - The date object used for filtering.
 * @param profile - The profile object containing the schedule.
 * @returns An array of filtered schedule items.
 */
export function filterSchedule(date: Date, profile: IProfile): ISchedule[] {
    const filteringDate = date.toISOString().split('T')[0];

    return (
        profile?.schedule.filter((lesson) => {
            // ?: Placeholder for future filtering of hidden lessons
            return lesson.d === filteringDate;
        }) || []
    );
}

/**
 * Truncates a string to the specified length.
 * @param str - The string to be truncated.
 * @param length - The maximum length of the truncated string.
 * @returns The truncated string.
 */
export function truncateString(str: string, length: number): string {
    return str.length > length ? str.slice(0, length) + '...' : str;
}

/**
 * Gets the lesson type based on the input string.
 * @param str - The input string representing the lesson type.
 * @returns The formatted lesson type string.
 */
export function getLessonType(str: string): string {
    const lessonTypes: { [key: string]: string } = {
        '(л)': 'Лекція',
        '(лаб)': 'Лабораторна робота',
        '(екз)': 'Екзамен',
        '(прс)': 'Практичне заняття',
        '(сем)': 'Семінар',
        '(кср)': 'Контрольна самостійна робота',
        '(к)': 'Колоквіум',
    };

    return lessonTypes[str.toLowerCase()] || str;
}

/**
 * Handles errors by logging them to the console and display popups.
 * @param error - The error object to be handled.
 */
export function handleError(error: Error): void {
    // TODO: Implement more error handling mechanism (e.g., display error messages to the user)
    console.error('Error:', error);
}

/**
 * Generates a string representing the academic year for making requests.
 * @returns A string representing the academic year (e.g., "2023-2024-2").
 */
export function getYearRequest(): string {
    const currentDate = new Date();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (currentMonth < 9) {
        return `${currentYear - 1}-${currentYear}-2`;
    }

    return `${currentYear}-${currentYear + 1}-1`;
}

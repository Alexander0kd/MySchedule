import { IProfile } from '../interfaces/profile.interface';
import { ISchedule } from '../interfaces/schedule.interface';
import { AvailableUni } from '../environment/universities/available-uni.enum';
import { PnuFaculty } from '../environment/faculty/pnu.faculty';
import { closeAlert, showAlert } from 'react-native-customisable-alert';

/**
 * Formats the last update date string.
 * @param date - The date object to be formatted.
 * @returns A formatted string representing the last update date.
 */
export function formatDateWithTime(date: Date): string {
    try {
        const day = new Intl.DateTimeFormat('uk-UA', {
            day: 'numeric',
            month: 'long',
        }).format(date);

        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${day} | ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } catch {
        return date.toString();
    }
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
    if (!profile || !profile.schedule) return [];

    const filteringDate = date.toISOString().split('T')[0];

    return profile.schedule.filter((lesson) => {
        if (profile.settings.hidden && profile.settings.hidden.length > 0) {
            const subject = profile.settings.hidden.find((item) => item.l === lesson.l);
            if (subject && !subject.isVisible) {
                return false;
            }
        }

        return lesson.d === filteringDate;
    });
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

/**
 * Retrieves the full name of a faculty based on the provided university and faculty ID.
 * @param uni - The available university.
 * @param facultyId - The ID of the faculty.
 * @returns The full name of the faculty if found, otherwise an empty string.
 */
export function getFacultyFullName(uni: AvailableUni, facultyId: string): string {
    switch (AvailableUni[uni]) {
        case AvailableUni.PNU:
            return PnuFaculty[facultyId];
        default:
            return '';
    }
}

/**
 * Opens a modal window with the specified title, text, cancel button text, and continue button text.
 * @param title - The title of the modal window.
 * @param text - The text content of the modal window.
 * @param cancelText - The text displayed on the cancel button.
 * @param continueText - The text displayed on the continue button.
 * @returns **True** if the **Continue** button is clicked, **false** if the **Cancel** button is clicked.
 */
export async function openModal(title: string, text: string, cancelText: string, continueText: string): Promise<boolean> {
    return new Promise((resolve) => {
        showAlert({
            customIcon: 'none',
            dismissable: true,
            title: title,
            message: text,
            leftBtnLabel: cancelText,
            btnLabel: continueText,
            alertType: 'warning',
            onPress: () => {
                closeAlert();
                resolve(true);
            },
            onDismiss: () => {
                closeAlert();
                resolve(false);
            },
        });
    });
}

/**
 * Retrieves an array of unique schedule items from a given array.
 * @param schedule - Array containing schedule information.
 * @returns An array of unique schedule items.
 */
export function getUniqueSchedule(schedule: ISchedule[]): string[] {
    const uniqueItems: string[] = [];

    schedule.forEach((lesson: ISchedule) => {
        if (!uniqueItems.includes(lesson.l)) {
            uniqueItems.push(lesson.l);
        }
    });

    return uniqueItems;
}

/**
 * Handles errors by logging them to the console and display popups.
 * @param error - The error object to be handled.
 */
export function handleError(error: Error, message?: string): void {
    showAlert({
        customIcon: 'none',
        dismissable: false,
        title: 'Упс... Виникла помилка',
        message: `${message || error.message}`,
        btnLabel: 'Ок',
        alertType: 'error',
        onPress: () => {
            closeAlert();
        },
    });

    // eslint-disable-next-line no-console
    console.error('Error:', error || message);
}

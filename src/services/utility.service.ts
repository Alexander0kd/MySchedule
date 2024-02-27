import { IProfile } from "../shared/interfaces/profile.interface";
import { ISchedule } from "../shared/interfaces/schedule.interface";

export function formateLastUpdate(date: Date): string {
    const day = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
    }).format(new Date());

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} | ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export function formateDate(date: Date): string {
    return new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export function filterShedule(date: Date, profile: IProfile): ISchedule[] {
    const filteringDate = date.toISOString().split('T')[0];

    return profile?.schedule.filter(
        (lesson) => {
            // ?: Місце для того, шоб потім можна було фільтрувати приховані пари 

            return lesson.d === filteringDate;
        }
    ) || [];
}

export function truncateString(str: string, length: number): string {
    return str.length > length ? str.slice(0, length) + '...' : str;
}

export function getLessonType(str: string): string {
    switch (str.toLowerCase()) {
        case "(л)":
            return "Лекція";
        case "(лаб)":
            return "Лабораторна робота";
        case "(екз)":
            return "Екзамен";
        case "(прс)":
            return "Практичне заняття";
        case "(сем)":
            return "Семінар";
        case "(кср)":
            return "Контрольна самостійна робота";
        case "(к)":
            return "Колоквіум"
        default:
            return str;
    }
}

export function handleError(error: Error): void {
    // TODO: Добавити спливаюче вікно про помилку
    
    console.error("Handling error:", error);
}
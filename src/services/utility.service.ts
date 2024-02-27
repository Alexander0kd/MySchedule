import { IProfile } from "../shared/interfaces/profile.interface";
import { ISchedule } from "../shared/interfaces/schedule.interface";

export function formateDate(date: Date): string {
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day} ${month} | ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
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
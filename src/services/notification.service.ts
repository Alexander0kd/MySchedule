import { IProfile } from "../shared/interfaces/profile.interface";
import { NotificationItem } from "../shared/interfaces/settings.interface";

export function handleNotificationUpdate(profile: IProfile) {
    handleNotifyChanges(profile.settings.notification.notifyChanges);
    handleNotifyBy(profile.settings.notification.notifyBy);
    handleNotifyList(profile.settings.notification.notificationList);
}

function handleNotifyChanges(notifyChanges: boolean) {
    //! Step 1: Очистити всі BackgroundFetch
    //! Step 2: Якщо notifyChanges == true, тоді добавити оновлення в фоні щодня у рандомному проміжку між 20:00 і 21:00 із таким алгоритмом:
    //! 1. const profile await getActiveProfile();
    //! 2. const data = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);
    //! 3. if (data && data.length > 0 && profile.schedule !== data) { * сповістити користувача про оновлення у розкладі* }
}

function handleNotifyBy(notifyBy: number) {
    //! Step 1: Очистити всі сповіщення в задньому фоні
    //! Step 2: Якщо notifyBy != 0, тоді добавити оновлення в фоні до кожного заняття за notifyBy хвилин. Спосіб отримання списку занять:
    //! 1. const profile await getActiveProfile();
    //! 2. const data = profile.schedule;
    //! Годину заняття можна знайти як profile.schedule[i].ls
    //! Дату заняття можна знайти як profile.schedule[i].d - Дата заняття у форматі РРРР-ММ-ДД.
}

function handleNotifyList(notificationList: NotificationItem[]) {
    //! Step 1: Очистити всі сповіщення в задньому фоні
    //! Step 2: Якщо notificationList.length > 0, тоді добавити будильник в телефоні на годину, котра вказана у notificationList[i].date
}
import { IProfile } from "../shared/interfaces/profile.interface";
import { NotificationItem } from "../shared/interfaces/settings.interface";

import * as Notifications from 'expo-notifications';
import { ISchedule } from "../shared/interfaces/schedule.interface";
import { handleError } from "./utility.service";

export async function handleNotificationUpdate(profile: IProfile) {
    await handleNotifyChanges(profile.settings.notification.notifyChanges);
    await handleNotifyBy(profile.schedule, profile.settings.notification.notifyBy);
    await handleNotifyList(profile.settings.notification.notificationList);
}

async function handleNotifyChanges(notifyChanges: boolean) {
    //! Step 1: Очистити всі BackgroundFetch
    //! Step 2: Якщо notifyChanges == true, тоді добавити оновлення в фоні щодня у рандомному проміжку між 20:00 і 21:00 із таким алгоритмом:
    //! 1. const profile await getActiveProfile();
    //! 2. const data = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);
    //! 3. if (data && data.length > 0 && profile.schedule !== data) { * сповістити користувача про оновлення у розкладі* }
}

async function handleNotifyBy(schedule: ISchedule[], notifyBy: number) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (notifyBy !== 0) {
        const currentDate = new Date();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        schedule.forEach(async (item) => {
            const itemDate = new Date(item.d + 'T' + item.ls);

            if (itemDate >= currentDate) {
                try {                    
                    await Notifications.scheduleNotificationAsync({
                        content: {
                          title: 'Скоро ропочнеться заняття!',
                          body: `"${item.l}" розпочнеться о ${item.ls}.\n Не пропусти!`,
                        },
                        trigger: {
                            date: itemDate.getTime() - (notifyBy * 60 * 1000),
                        },
                    });
                } catch (error) {
                    handleError(error);
                }
            }
        });
    }
}

async function handleNotifyList(notificationList: NotificationItem[]) {
    //! Step 1: Очистити всі сповіщення в задньому фоні
    //! Step 2: Якщо notificationList.length > 0, тоді добавити будильник в телефоні на годину, котра вказана у notificationList[i].date
}
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager'

import { IProfile } from "../shared/interfaces/profile.interface";
import { NotificationItem } from "../shared/interfaces/settings.interface";

import { ISchedule } from "../shared/interfaces/schedule.interface";
import { handleError } from "./utility.service";

import { getGroupSchedule } from "./schedule-api.service";
import { UniEndpoints } from "../shared/universities/uni-endpoints.enum";
import { getActiveProfile } from './local-storage.service';

const BACKGROUND_TASK_NAME = 'scheduleUpdateTask';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    const now = new Date();
    if (now.getHours() < 12) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    try {
        const profile = await getActiveProfile();
        const data = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);
        
        if (data && data.length > 0 && profile.schedule !== data) {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            await Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Розклад оновився!',
                  body: 'Перевірьте ваш оновлений розклад!',
                },
                trigger: null
            });

            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        
        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});


export async function handleNotificationUpdate(profile: IProfile) {
    await handleNotifyChanges(profile.settings.notification.notifyChanges);
    await handleNotifyBy(profile.schedule, profile.settings.notification.notifyBy);
    await handleNotifyList(profile.settings.notification.notificationList);
}

async function handleNotifyChanges(notifyChanges: boolean) {
    if (!notifyChanges) {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
        if (isRegistered) {
            await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
        }
        return;
    }

    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: 12 * 60 * 60,
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

async function handleNotifyBy(schedule: ISchedule[], notifyBy: number) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    if (notifyBy === 0) return;

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const currentDate = new Date();
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

async function handleNotifyList(notificationList: NotificationItem[]) {
    notificationList = [];
    console.log(notificationList);
    //! Step 1: Очистити всі сповіщення в задньому фоні
    //! Step 2: Якщо notificationList.length > 0, тоді добавити будильник в телефоні на годину, котра вказана у notificationList[i].date
}
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { NotificationItem } from '../interfaces/settings.interface';

import { ISchedule } from '../interfaces/schedule.interface';
import { handleError } from '../utils/utility.service';

import { getGroupSchedule } from './schedule-api.service';
import { UniEndpoints } from '../environment/universities/uni-endpoints.enum';
import { getActiveProfile } from './profile.service';

const BACKGROUND_TASK_NAME = 'scheduleUpdateTask';

/**
 * Defines a background task for updating schedules. This task runs periodically to check for schedule updates
 * and notifies the user if there are any changes.
 */
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    const now = new Date();
    if (now.getHours() < 16) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    try {
        const profile = await getActiveProfile();
        const data = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);

        if (data && data.length > 0 && profile.schedule && profile.schedule.length > 0 && profile.schedule != data) {
            // Set notification handler to show notifications when the schedule updates
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true,
                }),
            });

            // Schedule a notification to inform the user about the schedule update
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Розклад оновився!',
                    body: 'Перевірте зміни у розкладі 😊',
                },
                trigger: null,
            });

            return BackgroundFetch.BackgroundFetchResult.NewData;
        }

        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

/**
 * Handles registration and unregistration of background task based on notification settings.
 * @param notifyChanges Flag indicating whether notifications for schedule changes are enabled.
 */
export async function handleNotifyChanges(notifyChanges: boolean) {
    try {
        if (!notifyChanges) {
            const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
            if (isRegistered) {
                await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
            }
            return;
        }

        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
            minimumInterval: 6 * 60 * 60, // 6 hours interval
            stopOnTerminate: false,
            startOnBoot: true,
        });
    } catch (error) {
        handleError(error, `Виникла помилка під час створення BackgroundFetch. Зверніться, будь ласка, у підтримку!`);
    }
}

/**
 * Handles scheduling notifications for upcoming classes based on schedule and notification settings.
 * @param schedule The schedule of classes for the profile.
 * @param notifyBy The time in minutes before each class to notify the user.
 */
export async function handleNotifyBy(schedule: ISchedule[], notifyBy: number) {
    try {
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

            if (itemDate >= currentDate && itemDate.getTime() <= currentDate.getTime() + 24 * 60 * 60 * 1000 * 7) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Скоро заняття!',
                        body: `"${item.l}" розпочнеться о ${item.ls}.\n Не пропусти!`,
                    },
                    trigger: {
                        date: new Date(itemDate.getTime() - notifyBy * 60 * 1000),
                    },
                });
            }
        });
    } catch (error) {
        handleError(error, `Виникла помилка під час створення сповіщення. Будь ласка, зверніться у підтримку!`);
    }
}

/**
 * Handles scheduling notifications for items in the notification list based on their dates.
 * @param notificationList The list of items to notify about.
 */
export async function handleNotifyList(notificationList: NotificationItem[]) {
    try {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });

        notificationList.forEach(async (item) => {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Нагадування!',
                    body: `Ти просив нагадати про ${item.subject.l} :)`,
                },
                trigger: {
                    date: new Date(item.date).getTime(),
                },
            });
        });
    } catch (error) {
        handleError(error, `Виникла помилка під час створення нагадування. Зверніться, будь ласка, у підтримку!`);
    }
}

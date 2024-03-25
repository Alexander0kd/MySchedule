import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

import { IProfile } from '../shared/interfaces/profile.interface';
import { NotificationItem } from '../shared/interfaces/settings.interface';

import { ISchedule } from '../shared/interfaces/schedule.interface';
import { handleError } from './utility.service';

import { getGroupSchedule } from './schedule-api.service';
import { UniEndpoints } from '../shared/universities/uni-endpoints.enum';
import { getActiveProfile } from './profile.service';

const BACKGROUND_TASK_NAME = 'scheduleUpdateTask';

/**
 * Defines a background task for updating schedules. This task runs periodically to check for schedule updates
 * and notifies the user if there are any changes.
 */
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
    const now = new Date();
    if (now.getHours() < 12) {
        return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    try {
        const profile = await getActiveProfile();
        const data = await getGroupSchedule(UniEndpoints[profile.university], profile.faculty, profile.group);

        if (data && data.length > 0 && profile.schedule != data) {
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
                    body: 'Перевірте ваш оновлений розклад!',
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
 * Handles updating notifications for a profile based on notification settings.
 * @param profile The profile for which notifications need to be handled.
 */
export async function handleNotificationUpdate(profile: IProfile) {
    await handleNotifyChanges(profile.settings.notification.notifyChanges);
    await handleNotifyBy(profile.schedule, profile.settings.notification.notifyBy);
    await handleNotifyList(profile.settings.notification.notificationList);
}

/**
 * Handles registration and unregistration of background task based on notification settings.
 * @param notifyChanges Flag indicating whether notifications for schedule changes are enabled.
 */
async function handleNotifyChanges(notifyChanges: boolean) {
    try {
        if (!notifyChanges) {
            const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
            if (isRegistered) {
                await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
            }
            return;
        }

        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
            minimumInterval: 4 * 60 * 60, // 4 hours interval
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
async function handleNotifyBy(schedule: ISchedule[], notifyBy: number) {
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
        handleError(error, `Виникла помилка під час створення сповіщення. Зверніться, будь ласка, у підтримку!`);
    }
}

/**
 * Handles scheduling notifications for items in the notification list based on their dates.
 * @param notificationList The list of items to notify about.
 */
async function handleNotifyList(notificationList: NotificationItem[]) {
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

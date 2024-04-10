import AsyncStorage from '@react-native-async-storage/async-storage';

import { IProfile } from '../interfaces/profile.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../environment/available-routes';
import { handleError } from '../utils/utility.service';

enum STORAGE_KEYS {
    PROFILES = 'profiles',
    ACTIVE = 'active',
}

/**
 * Retrieves all profiles stored in AsyncStorage.
 * @returns A Promise that resolves to an array of profile objects.
 */
export async function getAllProfiles(): Promise<IProfile[]> {
    try {
        const profiles = await AsyncStorage.getItem(STORAGE_KEYS.PROFILES);
        return JSON.parse(profiles) || [];
    } catch (error) {
        handleError(error, 'Виникла помилка під час отримання списку профілів.');
        return [];
    }
}

/**
 * Checks if the AsyncStorage storage is empty.
 * @returns A Promise that resolves to true if the storage is empty, false otherwise.
 */
export async function isLocalStorageEmpty(): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();
        return !profiles || profiles.length < 1;
    } catch (error) {
        handleError(error, 'Виникла помилка під час отримання списку профілів.');
        return true;
    }
}

/**
 * Adds a new profile to AsyncStorage.
 * @param profileData The profile object to be added.
 * @returns A Promise that resolves to true if the profile is successfully added, false otherwise.
 */
export async function addProfile(profileData: IProfile): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();

        const isProfileExist = profiles.find(
            (profile) =>
                profile.university === profileData.university &&
                profile.faculty === profileData.faculty &&
                profile.year === profileData.year &&
                profile.group === profileData.group
        );

        if (isProfileExist) {
            handleError(null, 'Виникла помилка під час створення профілю: У вас уже є такий профіль!');
            return;
        }

        profiles.push(profileData);
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

        const activeProfle = await getActiveProfile();
        if (!activeProfle) {
            await setActiveProfile(profileData.id);
        }

        return true;
    } catch (error) {
        handleError(error, 'Виникла помилка під час створення профілю.');
        return false;
    }
}

/**
 * Retrieves a profile by its ID from AsyncStorage.
 * @param id The ID of the profile to retrieve.
 * @returns A Promise that resolves to the profile object if found, or null if not found.
 */
export async function getProfileById(id: string): Promise<IProfile> {
    try {
        const profiles = await getAllProfiles();
        return profiles.find((user) => user.id === id) || null;
    } catch (error) {
        handleError(error, 'Виникла помилка під час отримання профілю.');
        return null;
    }
}

/**
 * Deletes a profile by its ID from AsyncStorage.
 * @param id The ID of the profile to delete.
 * @param navigation The navigation object for redirection after deletion.
 * @returns A Promise that resolves to true if the profile is successfully deleted, false otherwise.
 */
export async function deleteProfileById(id: string, navigation: StackNavigationProp<AvailableRoutes>): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();
        const profileIndex = profiles.findIndex((user) => user.id === id);

        if (profileIndex === -1) {
            handleError(null, `Виникла помилка під час видалення профілю: Профіль ${id} не знайдений!`);
            return;
        }

        profiles.splice(profileIndex, 1);
        await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

        if (profiles.length < 1) {
            navigation.replace('OnboardingPage');
        }

        return true;
    } catch (error) {
        handleError(error, `Виникла помилка під час видалення профілю!`);
        return false;
    }
}

/**
 * Updates a profile by its ID in AsyncStorage.
 * @param id The ID of the profile to update.
 * @param editedProfileData The updated profile data.
 * @returns A Promise that resolves to true if the profile is successfully updated, false otherwise.
 */
export async function updateProfileConfiguration(id: string, editedProfileData: IProfile): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();

        const isProfileExist = profiles.find(
            (profile) =>
                profile.university === editedProfileData.university &&
                profile.faculty === editedProfileData.faculty &&
                profile.year === editedProfileData.year &&
                profile.group === editedProfileData.group
        );

        if (isProfileExist) {
            handleError(null, `Виникла помилка під час редагування профілю: У вас уже є такий профіль!`);
            return;
        }

        const profileIndex = profiles.findIndex((user) => user.id === id);
        if (profileIndex == -1) {
            handleError(null, `Виникла помилка під час редагування профілю: УПрофіль ${id} не знайдений!`);
            return;
        }

        const newProfile: IProfile = {
            id: editedProfileData.id,
            university: editedProfileData.university,
            faculty: editedProfileData.faculty,
            year: editedProfileData.year,
            group: editedProfileData.group,
            groupName: editedProfileData.groupName,
            schedule: [],
            notes: [],
            settings: {
                hidden: [],
                notification: {
                    notifyChanges: profiles[profileIndex].settings.notification.notifyChanges,
                    notifyBy: profiles[profileIndex].settings.notification.notifyBy,
                    notificationList: [],
                },
            },
            lastUpdate: new Date(),
        };

        profiles[profileIndex] = newProfile;

        await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

        return true;
    } catch (error) {
        handleError(error, `Виникла помилка під час редагування профілю!`);
        return false;
    }
}

/**
 * Updates a profile by its ID in AsyncStorage. This function should be used for updating schedule, notes, and settings.
 * @param id The ID of the profile to update.
 * @param editedProfileData The updated profile data containing schedule, notes, or settings.
 * @returns A Promise that resolves to true if the profile is successfully updated, false otherwise.
 */
export async function updateProfileData(id: string, editedProfileData: IProfile): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();

        const profileIndex = profiles.findIndex((user) => user.id === id);
        if (profileIndex == -1) {
            handleError(null, `Виникла помилка під час редагування профілю: УПрофіль ${id} не знайдений!`);
            return;
        }

        profiles[profileIndex].id = editedProfileData.id;
        profiles[profileIndex].schedule = editedProfileData.schedule;
        profiles[profileIndex].notes = editedProfileData.notes;
        profiles[profileIndex].settings = editedProfileData.settings;
        profiles[profileIndex].lastUpdate = editedProfileData.lastUpdate;

        await AsyncStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));

        return true;
    } catch (error) {
        handleError(error, `Виникла помилка під час редагування профілю!`);
        return false;
    }
}

/**
 * Retrieves the active profile from AsyncStorage OR set any profile active.
 * @returns A Promise that resolves to the active profile object if found, or null if not found.
 */
export async function getActiveProfile(): Promise<IProfile> {
    try {
        const activeProfileId = JSON.parse(await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE));
        const profile = await getProfileById(activeProfileId);

        if (profile) {
            return profile;
        }

        const allProfiles = await getAllProfiles();
        if (allProfiles.length > 0) {
            await setActiveProfile(allProfiles[0].id);
            return allProfiles[0];
        }

        return null;
    } catch (error) {
        handleError(error, `Виникла помилка під час отримання активного профілю!`);
        return null;
    }
}

/**
 * Sets a profile as active in AsyncStorage.
 * @param id The ID of the profile to set as active.
 * @param navigation The navigation object for redirection after setting the profile as active.
 * @returns A Promise that resolves to true if the profile is successfully set as active, false otherwise.
 */
export async function setActiveProfile(id: string, navigation?: StackNavigationProp<AvailableRoutes>): Promise<boolean> {
    try {
        const activeProfileId = JSON.parse(await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE));
        if (id === activeProfileId) {
            return;
        }

        const profiles = await getAllProfiles();
        const isProfileExist = profiles.find((profile) => profile.id === id);

        if (!isProfileExist) {
            handleError(null, `Виникла помилка під час зміни активного профілю: Профіль ${id} не знайдений`);
            return;
        }

        await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE, JSON.stringify(id));
        if (navigation) {
            navigation.replace('AppNavbar');
        }

        return true;
    } catch (error) {
        handleError(error, `Виникла помилка під час зміни активного профілю!`);
        return false;
    }
}

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IProfile } from '../shared/interfaces/profile.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../shared/env/available-routes';
import { handleError } from './utility.service';

export async function getAllProfiles(): Promise<IProfile[]> {
    try {
        const profiles = await AsyncStorage.getItem('profiles');
        return JSON.parse(profiles) || [];
    } catch (error) {
        handleError(error);
        throw error;
    }
}

export async function isLocalStorageEmpty(): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();
        return !profiles || profiles.length < 1;
    } catch (error) {
        handleError(error);
        return true;
    }
}

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
            throw new Error('Duplicate profile detected');
        }

        profiles.push(profileData);
        await AsyncStorage.setItem('profiles', JSON.stringify(profiles));

        const activeProfle = await getActiveProfile();
        if (!activeProfle) {
            await setActiveProfile(profileData.id);
        }

        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

export async function getProfileById(id: string): Promise<IProfile> {
    try {
        const profiles = await getAllProfiles();
        return profiles.find((user) => user.id === id) || null;
    } catch (error) {
        handleError(error);
        return null;
    }
}

export async function deleteProfileById(id: string, navigation: StackNavigationProp<AvailableRoutes>): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();
        const profileIndex = profiles.findIndex((user) => user.id === id);

        if (profileIndex === -1) {
            throw new Error(`Profile ${id} not found`);
        }

        profiles.splice(profileIndex, 1);
        await AsyncStorage.setItem('profiles', JSON.stringify(profiles));

        if (profiles.length < 1) {
            navigation.replace('OnboardingPage');
        } else {
            navigation.replace('SettingsProfile');
        }

        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

export async function updateProfileById(id: string, editedProfileData: IProfile): Promise<boolean> {
    try {
        const profiles = await getAllProfiles();
        const profileIndex = profiles.findIndex((user) => user.id === id);

        if (profileIndex == -1) {
            throw new Error('User with this ID not found');
        }

        profiles[profileIndex] = editedProfileData;

        await AsyncStorage.setItem('profiles', JSON.stringify(profiles));

        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

export async function getActiveProfile(): Promise<IProfile> {
    try {
        const activeProfileId = JSON.parse(await AsyncStorage.getItem('active'));
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
        handleError(error);
        return null;
    }
}

export async function setActiveProfile(id: string, navigation?: StackNavigationProp<AvailableRoutes>): Promise<boolean> {
    try {
        const activeProfileId = JSON.parse(await AsyncStorage.getItem('active'));
        if (id === activeProfileId) {
            throw new Error('Profile already active');
        }

        const profiles = await getAllProfiles();
        const isProfileExist = profiles.find((profile) => profile.id === id);

        if (!isProfileExist) {
            throw new Error(`Cant find profile with id: ${id}.`);
        }

        await AsyncStorage.setItem('active', JSON.stringify(id));
        if (navigation) {
            navigation.replace('AppNavbar');
        }

        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

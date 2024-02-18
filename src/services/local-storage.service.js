import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLocalStorageEmpty = async () => {
    try {
        const profiles = await getAllProfiles();
        return !profiles || profiles.length < 1;
    } catch (error) {
        console.error('Error check local storage:', error);
        return true;
    }
};

export const addProfile = async (profileData) => {
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
        console.error('Error setting local profile:', error);
        throw error;
    }
};

export const getAllProfiles = async () => {
    try {
        const profiles = await AsyncStorage.getItem('profiles');
        return JSON.parse(profiles) || [];
    } catch (error) {
        console.error('Error getting all profiles:', error);
        throw error;
    }
};

export const getProfileById = async (id) => {
    try {
        const profiles = await getAllProfiles();
        return profiles.find((user) => user.id === id) || null;
    } catch (error) {
        console.error('GET_PROFILE_BY_ID_ERROR : ', error);
        throw error;
    }
};

export const deleteProfileById = async (id, navigation) => {
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
        }

    } catch (error) {
        console.error('Error deleting local profile:', error);
        throw error;
    }
};

export const editProfileById = async (id, editedProfileData) => {
    try {
        const profiles = await getAllProfiles();
        const profileIndex = profiles.findIndex((user) => user.id === id);

        if (profileIndex == -1) {
            throw new Error('User with this ID not found');
        }

        profiles[profileIndex] = {
            ...profiles[profileIndex],
            ...editedProfileData,
        };

        await AsyncStorage.setItem('profiles', JSON.stringify(profiles));
    } catch (error) {
        console.error('EDIT_USER_PROFILE_ERROR : ', error);
        throw error;
    }
};

export const getActiveProfile = async () => {
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
        console.error('Cant get active profile: ', error);
        throw error;
    }
};

export const setActiveProfile = async (id, navigation) => {
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

    } catch (error) {
        console.error('Cant change active profile: ', error);
        throw error;
    }
};

// --------DEV TOOLS------------

export const clearLocalStorage = async () => {
    if (!__DEV__) return;

    try {
        await AsyncStorage.removeItem('profiles');
        await AsyncStorage.removeItem('active');
        console.log('Local storage cleared successfully.');
    } catch (error) {
        console.error('Error clearing local storage:', error);
        throw error;
    }
};

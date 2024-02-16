import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLocalStorageEmpty = async () => {
    try {
        let users = JSON.parse(await AsyncStorage.getItem('users'));
        console.log('Profiles : ', users);
        return !users || users.length < 1;
    } catch (error) {
        console.error('Error check local storage:', error);
        return true;
    }
};

export const setLocalProfile = async (profileData) => {
    try {
        let users = JSON.parse(await AsyncStorage.getItem('users')) || [];

        const existingUser = users.find(
            (user) =>
                user.university === profileData.university &&
                user.faculty === profileData.faculty &&
                user.year === profileData.year &&
                user.group === profileData.group
        );

        if (existingUser) {
            console.error('Duplicate user data detected. Not adding the duplicate.');
            return false;
        }

        users.push(profileData);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        console.log('Profile data saved locally:', profileData);
        console.log('All user profiles:', users);
        return true;
    } catch (error) {
        console.error('Error setting local profile:', error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        userId = await getFirstUserId(); // USING FOR TEST !!!

        let users = JSON.parse(await AsyncStorage.getItem('users')) || [];

        const userIndex = users.findIndex((user) => user.profileID === userId);
        if (userIndex < 0) {
            console.log('User with this id not found');
            return null;
        } else {
            const user = users[userIndex];
            console.log('Received user:', user);
            return user;
        }
    } catch (error) {
        console.log('GET_USER_BY_ID_ERROR : ', error);
        throw error;
    }
};

export const deleteLocalProfileById = async (userId, navigation) => {
    try {
        userId = await getFirstUserId(); // USING FOR TEST !!!

        let users = JSON.parse(await AsyncStorage.getItem('users')) || [];

        const userIndex = users.findIndex((user) => user.profileID === userId);

        if (userIndex === -1) {
            console.error('User with provided id not found.');
            return false;
        }

        users.splice(userIndex, 1);
        if (users.length < 1) {
            console.log(users.length);
            navigation.replace('OnboardingPage');
        }
        await AsyncStorage.setItem('users', JSON.stringify(users));
        console.log('User with id', userId, 'deleted successfully.');
        console.log('Remaining user profiles:', users);
        return true;
    } catch (error) {
        console.error('Error deleting local profile:', error);
        throw error;
    }
};

export const editUserProfile = async (userId, editedProfileData) => {
    try {
        userId = await getFirstUserId(); // USING FOR TEST !!!

        let users = JSON.parse(await AsyncStorage.getItem('users')) || [];
        const userProfileIndex = users.findIndex((user) => user.profileID === userId);

        if (userProfileIndex !== -1) {
            users[userProfileIndex] = {
                ...users[userProfileIndex],
                ...editedProfileData,
            };
            console.log('EDITED_PROFILE :', users[userProfileIndex]);
            await AsyncStorage.setItem('users', JSON.stringify(users));
        } else {
            throw new Error('Користувача з таким ID не знайдено');
        }
    } catch (error) {
        console.log('EDIT_USER_PROFILE_ERROR : ', error);
        throw error;
    }
};

// --------DEV TOOLS------------

export const clearLocalStorage = async () => {
    if (!__DEV__) return;

    try {
        await AsyncStorage.removeItem('users');
        console.log('Local storage cleared successfully.');
    } catch (error) {
        console.error('Error clearing local storage:', error);
        throw error;
    }
};

export const getFirstUserId = async () => {
    try {
        let users = JSON.parse(await AsyncStorage.getItem('users'));

        if (users.length > 0) {
            return users[0].profileID;
        } else {
            console.log('Масив користувачів порожній.');
            return null;
        }
    } catch (error) {
        console.log('GET_FIRST_USER_ERROR : ', error);
        throw error;
    }
};

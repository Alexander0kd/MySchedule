import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLocalStorageEmpty = async () => {
    try {
        const users = await AsyncStorage.getItem('users');
        console.log('Profiles : ', users);
        return !users || users.length === 0;
    } catch (error) {
        console.error('Error check local storage:', error);
        return true;
    }
};

export const setLocalProfile = async (profileData) => {
    try {
        let users = JSON.parse(await AsyncStorage.getItem('users'));
        if (!users) {
            users = [];
        }

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
        } else {
            users.push(profileData);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            console.log('Profile data saved locally:', profileData);
            console.log('All user profiles:', users);
            return true;
        }
    } catch (error) {
        console.error('Error setting local profile:', error);
        throw error;
    }
};

// --------DEV TOOLS------------

export const clearLocalStorage = async () => {
    try {
        await AsyncStorage.removeItem('users');
        console.log('Local storage cleared successfully.');
    } catch (error) {
        console.error('Error clearing local storage:', error);
    }
};

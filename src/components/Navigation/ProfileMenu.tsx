import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { MaterialIcons } from '@expo/vector-icons';
import { setActiveProfile, getAllProfiles, getActiveProfile } from '../../services/profile.service';
import { IProfile } from '../../interfaces/profile.interface';
import { AvailableRoutes } from '../../environment/available-routes';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableUni } from '../../environment/universities/available-uni.enum';
import { LoadingScreen } from '../../shared/LoadingScreen';

export const ProfileMenu = () => {
    const window = useWindowDimensions();
    const isFocused = useIsFocused();
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
    const [activeProfileId, setActiveProfileId] = useState<string>(null);

    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    const loadProfiles = async () => {
        const profiles = await getAllProfiles();
        const activeProfile = await getActiveProfile();
        if (activeProfile) {
            setActiveProfileId(activeProfile.id);
        }
        setAllProfiles(profiles);
    };

    useEffect(() => {
        setLoading(true);
        loadProfiles().then(() => {
            setLoading(false);
        });
    }, [isFocused]);

    const setActiveProfileHandler = async (id: string) => {
        await setActiveProfile(id, navigation);
    };

    const truncateString = (str: string, length: number) => {
        return str.length > length ? str.slice(0, length) + '...' : str;
    };

    return (
        <View style={styles.container}>
            <Menu
                style={styles.menu}
                visible={visible}
                anchor={<MaterialIcons style={styles.profileIcon} name="account-circle" size={24} color="white" onPress={showMenu} />}
                onRequestClose={hideMenu}>
                <ScrollView>
                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        allProfiles.map((profile: IProfile, index: number) => (
                            <View
                                key={profile.id}
                                style={[
                                    styles.profileItem,
                                    { backgroundColor: activeProfileId === profile.id ? '#332D41' : 'transparent' },
                                    index === 0 ? styles.firstProfileItem : null,
                                ]}>
                                <MenuItem onPress={() => setActiveProfileHandler(profile.id)} pressColor="#332D41">
                                    <View style={styles.profileInfo}>
                                        <Text style={styles.profileText}>{profile.groupName}</Text>
                                        <Text numberOfLines={1} style={styles.profileText}>
                                            {truncateString(
                                                AvailableUni[profile.university],
                                                window.width < 450 ? 20 : AvailableUni[profile.university].length
                                            )}
                                        </Text>
                                    </View>
                                </MenuItem>
                            </View>
                        ))
                    )}
                </ScrollView>
            </Menu>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    menu: {
        backgroundColor: '#211F26',
        width: '90%',
        maxHeight: 240,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    profileIcon: {
        marginRight: 24,
    },
    profileItem: {
        borderRadius: 5,
        borderTopWidth: 1,
        borderColor: '#FFFFFF',
        padding: 5,
        marginRight: 2,
    },
    firstProfileItem: {
        borderTopWidth: 0,
    },
    profileInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: '#FFFFFF',
    },
    profileText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});

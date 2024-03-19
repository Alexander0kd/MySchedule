import { RouteProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvailableRoutes } from '../../../../shared/env/available-routes';
import { LoadingScreen } from '../../../../shared/components/LoadingScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { IProfile } from '../../../../shared/interfaces/profile.interface';
import { getProfileById, setActiveProfile, updateProfileById } from '../../../../services/local-storage.service';
import { handleError, openModal } from '../../../../services/utility.service';
import { ProfileForm } from '../../../../shared/components/ProfileForm';
import { ThinButton } from '../../../../shared/components/ThinButton';
import { RoundButton } from '../../../../shared/components/RoundButton';

export const ProfileEdit: FunctionComponent<{
    route: RouteProp<AvailableRoutes>;
}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filledProfile, setFilledProfile] = useState<IProfile>(null);

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<IProfile>(null);

    const handleSave = async (profileData: IProfile) => {
        try {
            const profileUpdated = await updateProfileById(props.route.params.profileId, profileData, false);
            if (profileUpdated) {
                await setActiveProfile(profileData.id);
                navigation.push('AppNavbar');
            }
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const profile = await getProfileById(props.route.params.profileId);
            if (profile) {
                setFilledProfile(profile);
            } else {
                navigation.push('ProfileAdd');
            }
            setIsLoading(false);
        };

        loadData();

        navigation.addListener('beforeRemove', async (e) => {
            e.preventDefault();

            const modal = await openModal(
                'Бажаєте скасувати редагування?',
                'Цю дію неможливо відмінити',
                'Ні, залишитись',
                'Так, скасувати'
            );

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        });
    }, []);

    if (isLoading || !props.route.params || !props.route.params.profileId) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Змініть необхідну інформацію</Text>
                <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} filledProfile={filledProfile} />
            </View>
            <View style={styles.wrapper}>
                <ThinButton
                    label="Скасувати"
                    onPressFunc={() => {
                        navigation.replace('ProfileList');
                    }}
                />
                <RoundButton
                    label="Зберегти"
                    onPressFunc={() => {
                        handleSave(profileData);
                    }}
                    disabled={!isFormFilled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#141218',
    },
    container: {
        marginTop: 24,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
        width: '100%',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#49454F',
    },
    title: {
        color: '#FFF',
        fontSize: 45,
        lineHeight: 52,
        marginBottom: 8,
    },
    subTitle: {
        color: '#FFF',
        fontSize: 20,
        letterSpacing: 0.5,
        marginBottom: 24,
    },
});

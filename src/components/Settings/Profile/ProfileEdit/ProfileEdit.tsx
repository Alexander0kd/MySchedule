import { EventArg, RouteProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AvailableRoutes } from '../../../../environment/available-routes';
import { LoadingScreen } from '../../../../shared/LoadingScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { IProfile } from '../../../../interfaces/profile.interface';
import { getProfileById, setActiveProfile, updateProfileConfiguration } from '../../../../services/profile.service';
import { handleError, openModal } from '../../../../utils/utility.service';
import { ProfileForm } from '../../../../shared/ProfileForm';

import { RoundButton } from '../../../../shared/RoundButton';

export const ProfileEdit: FunctionComponent<{
    route: RouteProp<AvailableRoutes, 'ProfileEdit'>;
}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const { profileId } = props.route.params;

    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filledProfile, setFilledProfile] = useState<IProfile>(null);

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<IProfile>(null);

    const handleSave = async (profileData: IProfile) => {
        try {
            const profileUpdated = await updateProfileConfiguration(props.route.params.profileId, profileData);
            if (profileUpdated) {
                await setActiveProfile(profileData.id);
                setIsOpenModal(false);
                setTimeout(() => {
                    navigation.goBack();
                }, 10);
            }
        } catch (error) {
            handleError(error, `Виникла помилка під час оновлення профілю!`);
        }
    };

    useEffect(() => {
        if (!isOpenModal) return;

        async function handleBeforeUnload(
            e: EventArg<
                'beforeRemove',
                true,
                {
                    action: Readonly<{
                        type: string;
                        payload?: object;
                        source?: string;
                        target?: string;
                    }>;
                }
            >
        ) {
            e.preventDefault();

            const modal = await openModal('Бажаєте скасувати редагування?', 'Цю дію неможливо відмінити', 'Ні, залишитись', 'Так, скасувати');

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        }

        navigation.addListener('beforeRemove', handleBeforeUnload);

        return () => {
            navigation.removeListener('beforeRemove', handleBeforeUnload);
        };
    }, [isOpenModal]);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const profile = await getProfileById(profileId);
            if (profile) {
                setFilledProfile(profile);
            } else {
                navigation.navigate('ProfileAdd');
            }
            setIsLoading(false);
        };

        loadData();
    }, []);

    if (isLoading || !profileId) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Змініть необхідну інформацію</Text>
                <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} filledProfile={filledProfile} />
            </View>
            <View style={styles.wrapper}>
                <RoundButton
                    label="Скасувати"
                    onPressFn={() => {
                        navigation.goBack();
                    }}
                    isThin={true}
                />
                <RoundButton
                    label="Зберегти"
                    onPressFn={() => {
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

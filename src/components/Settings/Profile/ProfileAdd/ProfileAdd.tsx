import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProfileForm } from '../../../../shared/ProfileForm';
import { IProfile } from '../../../../interfaces/profile.interface';
import { RoundButton } from '../../../../shared/RoundButton';

import { addProfile, setActiveProfile } from '../../../../services/profile.service';
import { handleError, openModal } from '../../../../utils/utility.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../../../environment/available-routes';
import { EventArg, useNavigation } from '@react-navigation/native';

export const ProfileAdd = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<IProfile>(null);

    const handleSave = async (profileData: IProfile) => {
        try {
            const profileAdded = await addProfile(profileData);
            if (profileAdded) {
                await setActiveProfile(profileData.id);
                setIsOpenModal(false);
                setTimeout(() => {
                    navigation.goBack();
                }, 10);
            }
        } catch (error) {
            handleError(error, `Виникла помилка під час створення профілю!`);
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

            const modal = await openModal('Бажаєте скасувати додавання?', 'Цю дію неможливо відмінити', 'Ні, залишитись', 'Так, скасувати');

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        }

        navigation.addListener('beforeRemove', handleBeforeUnload);

        return () => {
            navigation.removeListener('beforeRemove', handleBeforeUnload);
        };
    }, [isOpenModal]);

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Щоб створити профіль заповніть значення полів:</Text>
                <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} />
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

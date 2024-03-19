import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProfileForm } from '../../../../shared/components/ProfileForm';
import { IProfile } from '../../../../shared/interfaces/profile.interface';
import { RoundButton } from '../../../../shared/components/RoundButton';
import { ThinButton } from '../../../../shared/components/ThinButton';
import { addProfile, setActiveProfile } from '../../../../services/local-storage.service';
import { handleError, openModal } from '../../../../services/utility.service';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';

export const ProfileAdd = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<IProfile>(null);

    const handleSave = async (profileData: IProfile) => {
        try {
            const profileAdded = await addProfile(profileData);
            if (profileAdded) {
                await setActiveProfile(profileData.id);
                navigation.push('AppNavbar');
            }
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        navigation.addListener('beforeRemove', async (e) => {
            e.preventDefault();

            const modal = await openModal(
                'Бажаєте скасувати додавання?',
                'Цю дію неможливо відмінити',
                'Ні, залишитись',
                'Так, скасувати'
            );

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        });
    }, []);

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Щоб створити профіль заповніть значення полів:</Text>
                <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} />
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

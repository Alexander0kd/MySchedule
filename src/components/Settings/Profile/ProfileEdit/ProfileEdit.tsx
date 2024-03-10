import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { AvailableRoutes } from '../../../../shared/env/available-routes';
import { LoadingScreen } from '../../../../shared/components/LoadingScreen';
import {StackNavigationProp} from "@react-navigation/stack";
import {IProfile} from "../../../../shared/interfaces/profile.interface";
import {addProfile, setActiveProfile} from "../../../../services/local-storage.service";
import {handleError, openModal} from "../../../../services/utility.service";
import {ProfileForm} from "../../../../shared/components/ProfileForm";
import {ThinButton} from "../../../../shared/components/ThinButton";
import {RoundButton} from "../../../../shared/components/RoundButton";


export const ProfileEdit: FunctionComponent<{
    route: RouteProp<AvailableRoutes>;

}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);
    const [profileData, setProfileData] = useState<IProfile>(null);

    const handleSave = async (profileData: IProfile) => {
        try {
            const profileAdded = await addProfile(profileData);
            if (profileAdded) {
                await setActiveProfile(profileData.id);
                navigation.goBack();
            }
        } catch (error) {
            handleError(error);
        }
    };
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();

            const modal = openModal('Бажаєте скасувати редагування?', 'Цю дію неможливо відмінити', 'Ні, залишитись', 'Так, скасувати');

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        });
    }, []);
    if (props.route.params && props.route.params.profileId) {

        return (
            <View style={styles.section}>
                <View style={styles.container}>
                    <Text style={styles.subTitle}>Змініть необхідну інформацію</Text>
                    <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} />
                </View>
                <View style={styles.wrapper}>
                    <ThinButton
                        label="Скасувати"
                        onPressFunc={() => {
                            navigation.goBack();
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
    }

    return <LoadingScreen></LoadingScreen>;
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

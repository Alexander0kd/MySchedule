import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import ProfileForm from '../../shared/components/ProfileForm';
import WideButton from '../../shared/components/WideButton';
import { setLocalProfile } from '../../services/localStorageService';

import okFace from '../../../assets/ok-face-1.png';

export default function RegistrationPage({ buttonFunction }) {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [profileData, setProfileData] = useState([]);

    const handleWideBtnClick = async (profileData) => {
        try {
            const profileAdded = await setLocalProfile(profileData);
            if (profileAdded) {
                buttonFunction();
            }
        } catch (error) {
            console.error('Error setting local profile:', error);
            throw error;
        }
    };

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>
                <View style={styles.contentWrapper}>
                    <Image source={okFace} style={styles.image} />
                    <Text style={styles.Title}>Почнемо!</Text>
                    <Text style={styles.subTitle}>Для початку розкажи трохи про себе, тим самим створи свій перший профіль</Text>

                    <ProfileForm setIsFormFilled={setIsFormFilled} setProfileData={setProfileData} />
                </View>
            </View>
            <View>
                <WideButton
                    label="Продовжити"
                    width={277}
                    onPressFunc={() => {
                        handleWideBtnClick(profileData);
                    }}
                    isDisabled={!isFormFilled}
                />
            </View>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height;
const paddingContainerTop = windowHeight < 800 ? windowHeight * 0.06 : windowHeight * 0.1;

const styles = StyleSheet.create({
    section: {
        flex: 1,
        backgroundColor: '#141218',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        height: '100%',
        width: '100%',
        padding: 24,
        backgroundColor: '#141218',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: paddingContainerTop,
        paddingBottom: 36,
    },
    Circle: {
        width: 233,
        height: 233,
        backgroundColor: '#381E72',
        borderRadius: 116.5,
    },
    leftCircle: { position: 'absolute', top: -116.5, left: -116.5 },
    rightCircle: {
        position: 'absolute',
        top: 48,
        right: -146,
        backgroundColor: '#D0BCFF',
    },
    image: {
        width: 185,
        height: 185,
        marginBottom: 24,
    },
    contentWrapper: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Title: {
        color: '#FFF',
        fontSize: 45,
        lineHeight: 52,
        marginBottom: 16,
    },
    subTitle: {
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        marginBottom: 16,

        textAlign: 'center',
    },
});

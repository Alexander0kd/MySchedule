import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import okFace from '../../../assets/ok-face-1.png';
import WideButton from '../../shared/components/WideButton';
import ProfileForm from '../../shared/components/ProfileForm';

const RegistrationPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>
                <View style={styles.contentWrapper}>
                    <Image source={okFace} style={{ width: 185, height: 185, marginBottom: 24 }} />
                    <Text style={styles.Title}>Почнемо!</Text>
                    <Text style={styles.subTitle}>Для початку розкажи трохи про себе, тим самим створи свій перший профіль</Text>

                    <ProfileForm />
                </View>

                <View>
                    <WideButton label="Продовжити" width={277} onPressFunc={() => navigation.replace('SuccessfulRegistrationPage')} />
                    <View style={styles.pagesNavWrapper}>
                        <View style={styles.pagesNavDot}></View>
                        <View style={[styles.pagesNavDot, styles.activeDot]}></View>
                        <View style={styles.pagesNavDot}></View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const windowHeight = Dimensions.get('window').height;
const paddingContainerTop = windowHeight < 800 ? windowHeight * 0.06 : windowHeight * 0.1;

const styles = StyleSheet.create({
    section: {
        flex: 1,
        backgroundColor: '#141218',
        alignItems: 'center',
        justifyContent: 'center',
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

    pagesNavWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,

        marginTop: 24,
    },
    pagesNavDot: {
        width: 12,
        height: 12,
        backgroundColor: '#332D41',
        borderRadius: 6,
    },

    activeDot: {
        backgroundColor: '#4F378B',
    },
});

export default RegistrationPage;

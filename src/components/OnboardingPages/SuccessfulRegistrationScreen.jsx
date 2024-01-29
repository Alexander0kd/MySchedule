import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import coolFace from '../../../assets/cool-face-1.png';
import WideButton from '../../shared/components/WideButton';

const SuccessfulRegistrationPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>

                <View style={{ width: '100%' }}>
                    <View style={styles.contentWrapper}>
                        <Image source={coolFace} style={{ width: 202, height: 185, marginBottom: 24 }} />
                        <Text style={styles.Title}>Чудово!</Text>
                    </View>

                    <View style={{ gap: 24, width: '100%' }}>
                        <View style={styles.leftTextContainer}>
                            <Text style={styles.pageText}>Тепер у тебе є твій перший профіль</Text>
                        </View>

                        <View style={{ alignItems: 'flex-end', width: '100%' }}>
                            <View style={styles.rightTextContainer}>
                                <Text style={styles.pageText}>Можливість створювати нагадування, щоб не забувати про пари</Text>
                            </View>
                        </View>

                        <View style={styles.leftTextContainer}>
                            <Text style={styles.pageText}>Та можливість створювати нотатки, щоб не забувати про завдання</Text>
                        </View>
                    </View>
                </View>

                <View>
                    <WideButton label="Продовжити" width={277} onPressFunc={() => navigation.replace('AppNavbar')} />
                    <View style={styles.pagesNavWrapper}>
                        <View style={styles.pagesNavDot}></View>
                        <View style={styles.pagesNavDot}></View>
                        <View style={[styles.pagesNavDot, styles.activeDot]}></View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const windowHeight = Dimensions.get('window').height;
const paddingContainerTop = windowHeight < 800 ? windowHeight * 0.06 : windowHeight * 0.1;
const marginTitleBot = windowHeight < 800 ? windowHeight * 0.04 : windowHeight * 0.066;

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

        marginBottom: marginTitleBot,
    },

    Title: {
        color: '#FFF',
        fontSize: 45,
        lineHeight: 52,
        marginBottom: 16,
    },
    leftTextContainer: {
        width: '90%',

        backgroundColor: '#6750A4',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingVertical: 14,
        paddingRight: 16,
        paddingLeft: 25,

        left: -25,
    },
    rightTextContainer: {
        width: '90%',

        backgroundColor: '#381E72',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingVertical: 14,
        paddingLeft: 16,
        paddingRight: 24,

        right: -25,
    },

    pageText: {
        color: '#FFF',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
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

export default SuccessfulRegistrationPage;

import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import okFace from '../../../assets/ok-face-1.png';
import WideButton from '../../shared/components/WideButton';

const WelcomePage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>
                <View style={styles.contentWrapper}>
                    <Image source={okFace} style={{ width: 185, height: 185 }} />
                    <Text style={styles.Title}>вітаю</Text>
                    <Text style={styles.subTitle}>у нашому додатку ти зможеш швидко та зручно переглянути розклад занять свого університету</Text>
                </View>

                <WideButton label="Продовжити" width={230} onPressFunc={() => navigation.replace('AppNavbar')} />
                <View style={styles.pagesNavWrapper}>
                    <View style={[styles.pagesNavDot, styles.activeDot]}></View>
                    <View style={styles.pagesNavDot}></View>
                    <View style={styles.pagesNavDot}></View>
                </View>
            </View>
        </View>
    );
};

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

        padding: 28,

        backgroundColor: '#141218',

        alignItems: 'center',
        justifyContent: 'space-between',

        paddingTop: 200,
        paddingBottom: 55,
    },
    Circle: {
        width: 233,
        height: 233,
        backgroundColor: '#381E72',
        borderRadius: 116.5,
    },
    leftCircle: { position: 'absolute', top: -116.5, left: -116.5 },
    rightCircle: { position: 'absolute', top: 0, right: -116.5 },

    contentWrapper: {
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 16,
    },

    Title: {
        color: '#FFF',
        fontSize: 48,
        textTransform: 'uppercase',
    },
    subTitle: {
        color: '#FFF',
        fontSize: 24,
        lineHeight: 32,

        textAlign: 'center',
    },

    pagesNavWrapper: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 16,

        marginTop: 10,
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

export default WelcomePage;

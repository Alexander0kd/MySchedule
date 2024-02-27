import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import happyFace from './../../../assets/happy-face-1.png';
import { WideButton } from '../../shared/components/WideButton';

export default function WelcomePage({ buttonFunction }) {
    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>
                <View style={styles.contentWrapper}>
                    <Image source={happyFace} style={{ width: 185, height: 185, marginBottom: 24 }} />
                    <Text style={styles.Title}>Вітаємо!</Text>
                    <Text style={styles.subTitle}>У нашому додатку ти зможеш швидко та зручно переглянути розклад занять свого університету</Text>
                </View>
            </View>
            <View>
                <WideButton label="Продовжити" onPressFunc={buttonFunction} isDisabled={false} />
            </View>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height;
const paddingContainerTop = windowHeight * 0.236;

const styles = StyleSheet.create({
    section: {
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

        textAlign: 'center',
    },
});

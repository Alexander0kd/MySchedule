import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';

import coolFace from '../../../assets/cool-face-1.png';
import { WideButton } from '../../shared/WideButton';
import { FunctionComponent } from 'react';

const { height } = Dimensions.get('window');
const paddingContainerTop = height < 800 ? height * 0.06 : height * 0.1;
const marginTitleBot = height < 800 ? height * 0.05 : height * 0.066;

export const SuccessfulRegistrationPage: FunctionComponent<{
    buttonFunction: () => void;
}> = (props) => {
    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={[styles.Circle, styles.leftCircle]}></View>
                <View style={[styles.Circle, styles.rightCircle]}></View>
                <View style={{ width: '100%' }}>
                    <View style={styles.contentWrapper}>
                        <Image source={coolFace} style={styles.image} />
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
            </View>
            <View>
                <WideButton label="Продовжити" onPressFn={props.buttonFunction} />
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
    image: {
        width: 185,
        height: 185,
        marginBottom: 24,
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

        marginTop: 40,
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
});

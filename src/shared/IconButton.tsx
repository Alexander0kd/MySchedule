import { Text, View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FunctionComponent } from 'react';

export const IconButton: FunctionComponent<{
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPressFn: () => void;
    iconPosition: 'left' | 'right' | 'center';
}> = (props) => {
    let iconStyle: StyleProp<ViewStyle>;

    switch (props.iconPosition) {
        case 'left':
            iconStyle = styles.contentLeft;
            break;
        case 'right':
            iconStyle = styles.contentRight;
            break;
        case 'center':
            iconStyle = styles.contentCenter;
            break;
        default:
            iconStyle = styles.contentLeft;
            break;
    }

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={props.onPressFn}>
            <View style={[styles.buttonContent, iconStyle]}>
                <MaterialIcons name={props.icon} size={24} color="#CAC4D0" />
                <Text style={styles.text}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#332D41',
        marginHorizontal: 24,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.1,
    },
    buttonContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    contentLeft: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    contentRight: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    contentCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

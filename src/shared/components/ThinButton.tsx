import { Text, View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FunctionComponent } from 'react';

export const ThinButton: FunctionComponent<{
    icon?: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPressFunc: () => void;
    iconPosition?: 'left' | 'right' | 'center';
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
        <TouchableOpacity style={styles.buttonThin} onPress={props.onPressFunc}>
            <View style={[styles.buttonContent, iconStyle]}>
                {props.icon && <MaterialIcons style={{ marginBottom: -3 }} name={props.icon} size={20} color="#CAC4D0" />}
                <Text style={styles.text}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonThin: {
        borderWidth: 1,
        borderColor: '#E8DEF8',
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    text: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
    },
    buttonContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
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

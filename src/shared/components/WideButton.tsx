import React, { FunctionComponent } from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

export const WideButton: FunctionComponent<{
    label: string;
    onPressFn: () => void;
    isDisabled?: boolean;
}> = (props) => {
    const { width } = Dimensions.get('window');

    return (
        <TouchableOpacity
            disabled={props.isDisabled}
            style={[styles.WideButton, { width: width - 48, backgroundColor: props.isDisabled ? 'rgba(202, 196, 208, 0.12)' : '#6750A4' }]}
            onPress={props.onPressFn}>
            <Text style={[styles.ButtonText, { color: props.isDisabled ? 'rgba(202, 196, 208, 0.38)' : '#FFF' }]}>{props.label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    WideButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 100,
    },
    ButtonText: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 20 /* 142.857% */,
        letterSpacing: 0.1,
    },
});

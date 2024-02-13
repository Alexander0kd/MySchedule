import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function IconButton({ icon, label, iconPosition, onPressFunc }) {
    const iconStyle = iconPosition === 'right' ? styles.contentRight : styles.contentLeft;
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPressFunc}>
            <View style={[styles.buttonContent, iconStyle]}>
                <MaterialIcons name={icon} size={24} color="#CAC4D0" />
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

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
        alignItems: 'flex-start',
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
});

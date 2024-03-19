import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { openModal } from '../../../services/utility.service';
import Eye from '../../../../assets/eye-open.png';
import EyeClosed from '../../../../assets/eye-closed.png';
import { IHiddenItem } from '../../../shared/interfaces/settings.interface';

export const ScheduleItem: FunctionComponent<{
    subject: IHiddenItem
    onVisibilityChange: (item: IHiddenItem) => void
}> = (props) => {
    const handleOpenModal = async (nameSubject: string) => {
        if (props.subject.isVisible) {
            const modal = await openModal(
                'Бажаєте Приховати цей предмет?',
                `"${nameSubject}" не буде відображатись у розкладі`,
                'Скасувати',
                'Приховати'
            );

            if (modal) {
                props.subject.isVisible = false;
                props.onVisibilityChange(props.subject);
            }
            return;
        }
        
        props.subject.isVisible = true;
        props.onVisibilityChange(props.subject);
    };

    return (
        <TouchableOpacity 
            style={{ ...styles.container, backgroundColor: props.subject.isVisible ? '#332D41' : '#1d192b' }} 
            onPress={() => handleOpenModal(props.subject.l)}>
                <Text style={{ ...styles.text, textDecorationLine: props.subject.isVisible ? 'none' : 'line-through' }}>
                    {props.subject.l}
                </Text>
                <Image source={props.subject.isVisible ? Eye : EyeClosed} style={styles.eye} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    eye: {
        width: 20,
        height: 15,
        marginLeft: 16,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        marginBottom: 16,
    },
    text: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
});

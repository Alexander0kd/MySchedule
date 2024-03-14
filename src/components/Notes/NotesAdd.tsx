import * as React from 'react';
import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput, View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { ThinButton } from '../../shared/components/ThinButton';
import { RoundButton } from '../../shared/components/RoundButton';

import { v4 as uuidv4 } from 'uuid';

import { addNote } from '../../services/notes-local-storage.service';
import { formatDateWithTime } from '../../services/utility.service';

const { width, height } = Dimensions.get('window');
const inputWidth = width;

export const NotesAdd = ({ route }) => {
    const { subject } = route.params;
    const [isInputFilled, setIsInputFilled] = React.useState<boolean>(false);
    const [InputText, setInputText] = React.useState<string>();

    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const inputFillChecker = (text) => {
        text.length > 0 ? setIsInputFilled(true) : setIsInputFilled(false);
        setInputText(text);
    };

    const handleAddNote = async (subject, text) => {
        const noteData = {
            date: formatDateWithTime(new Date()),
            text,
            id: uuidv4(),
        };
        await addNote(subject, noteData).then(() => navigation.replace('NotesList'));
    };

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Текст нотатки"
                    placeholderTextColor="gray"
                    onChangeText={(text) => inputFillChecker(text)}
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View style={styles.wrapper}>
                    <ThinButton
                        label="Скасувати"
                        onPressFunc={() => {
                            navigation.replace('NotesList');
                        }}
                    />
                    <RoundButton label="Зберегти" disabled={!isInputFilled} onPressFunc={() => handleAddNote(subject, InputText)} />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#141218',
    },
    container: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 12,
        width: '100%',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#49454F',
    },
    textInput: {
        color: '#FFF',
        backgroundColor: '#141218',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
        width: inputWidth - 24 * 2,
        maxHeight: height / 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlignVertical: 'top', // Вирівнює текст зверху
        textAlign: 'left', // Вирівнює текст ліворуч
    },
});

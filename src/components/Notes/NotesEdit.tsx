import * as React from 'react';
import { TextInput, View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { ThinButton } from '../../shared/components/ThinButton';
import { RoundButton } from '../../shared/components/RoundButton';

import { AvailableRoutes } from '../../shared/env/available-routes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { editNoteById } from '../../services/notes-local-storage.service';

const { width, height } = Dimensions.get('window');
const inputWidth = width - 24 * 2;

export const NotesEdit = ({ route }) => {
    const { selectedNote } = route.params;

    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [InputText, setInputText] = React.useState<string>(selectedNote.text);
    const [isInputFilled, setIsInputFilled] = React.useState<boolean>(false);

    const inputFillChecker = (text) => {
        text.length > 0 ? setIsInputFilled(true) : setIsInputFilled(false);
        text === selectedNote.text ? setIsInputFilled(false) : setIsInputFilled(true);
        setInputText(text);
    };

    const handleSaveChanges = async () => {
        selectedNote.text = InputText;
        await editNoteById(selectedNote).then(() => navigation.replace('NotesList'));
    };

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Текст нотатки"
                    placeholderTextColor="gray"
                    value={InputText}
                    onChangeText={(value) => {
                        setInputText(value);
                        inputFillChecker(value);
                    }}
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
                    <RoundButton label="Зберегти" disabled={!isInputFilled} onPressFunc={() => handleSaveChanges()} />
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
        width: inputWidth,
        maxHeight: height / 4,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

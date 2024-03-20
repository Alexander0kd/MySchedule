import React, { FunctionComponent, useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { ThinButton } from '../../../shared/components/ThinButton';
import { RoundButton } from '../../../shared/components/RoundButton';

import { AvailableRoutes } from '../../../shared/env/available-routes';
import { EventArg, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { updateNotesBySubject } from '../../../services/notes.service';
import { openModal } from '../../../services/utility.service';

const { width, height } = Dimensions.get('window');
const inputWidth = width - 24 * 2;

export const NotesEdit: FunctionComponent<{
    route: RouteProp<AvailableRoutes, 'NotesEdit'>;
}> = (props) => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();
    const { noteGroup, noteId } = props.route.params;

    const [inputText, setInputText] = useState<string>(noteGroup.data[noteId].text);
    const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

    useEffect(() => {
        if (!isInputFilled) return;
    
        async function handleBeforeUnload(e: EventArg<"beforeRemove", true, {
            action: Readonly<{
                type: string;
                payload?: object;
                source?: string;
                target?: string;
            }>;
        }>) {
            e.preventDefault();

            const modal = await openModal(
                'Бажаєте скасувати редагування?',
                'Цю дію неможливо відмінити',
                'Ні, залишитись',
                'Так, скасувати'
            );

            if (modal) {
                navigation.dispatch(e.data.action);
            }
        }

        navigation.addListener('beforeRemove', handleBeforeUnload);

        return () => {
            navigation.removeListener('beforeRemove', handleBeforeUnload);
        }
    }, [isInputFilled]);

    const inputFillChecker = (text: string) => {
        setIsInputFilled(text.length > 0 && text !== noteGroup.data[noteId].text);
        setInputText(text);
    };

    const handleSaveChanges = async () => {
        noteGroup.data[noteId].text = inputText;

        await updateNotesBySubject(noteGroup).then(() => {
            setIsInputFilled(false);
            setTimeout(() => {
                navigation.navigate('NotesList')                
            }, 10);
        });
    };

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Текст нотатки"
                    placeholderTextColor="gray"
                    value={inputText}
                    onChangeText={(value) => inputFillChecker(value)}
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View style={styles.wrapper}>
                    <ThinButton
                        label="Скасувати"
                        onPressFunc={() => {
                            navigation.navigate('NotesList');
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
        maxHeight: height / 1.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

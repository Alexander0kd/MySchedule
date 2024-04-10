import React, { FunctionComponent, useEffect, useState } from 'react';
import { AvailableRoutes } from '../../../environment/available-routes';
import { EventArg, RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TextInput, View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { RoundButton } from '../../../shared/RoundButton';

import { addNote } from '../../../services/notes.service';
import { INote, INoteData } from '../../../interfaces/notes.interface';
import { openModal } from '../../../utils/utility.service';

const { width, height } = Dimensions.get('window');
const inputWidth = width;

export const NotesAdd: FunctionComponent<{
    route: RouteProp<AvailableRoutes, 'NotesAdd'>;
}> = (props) => {
    const { noteGroup } = props.route.params;

    const [inputText, setInputText] = useState<string>();
    const [isInputFilled, setIsInputFilled] = useState<boolean>(false);

    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    useEffect(() => {
        if (!isInputFilled) return;

        async function handleBeforeUnload(
            e: EventArg<
                'beforeRemove',
                true,
                {
                    action: Readonly<{
                        type: string;
                        payload?: object;
                        source?: string;
                        target?: string;
                    }>;
                }
            >
        ) {
            e.preventDefault();

            const modal = await openModal(
                'Бажаєте скасувати додавання?', 
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
        };
    }, [isInputFilled]);

    const inputFillChecker = (text: string) => {
        setIsInputFilled(text.length > 0);
        setInputText(text);
    };

    const handleAddNote = async (noteGroup: INote, text: string) => {
        const noteData: INoteData = {
            text: text,
            date: new Date(),
        };

        await addNote(noteGroup, noteData).then(() => {
            setIsInputFilled(false);
            setTimeout(() => {
                navigation.navigate('NotesList');
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
                    onChangeText={(text) => inputFillChecker(text)}
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                <View style={styles.wrapper}>
                    <RoundButton
                        label="Скасувати"
                        onPressFn={() => {
                            navigation.navigate('NotesList');
                        }}
                        isThin={true}
                    />
                    <RoundButton label="Зберегти" disabled={!isInputFilled} onPressFn={() => handleAddNote(noteGroup, inputText)} />
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
        minHeight: 250,
        width: inputWidth - 24 * 2,
        maxHeight: height / 1.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        textAlign: 'left',
    },
});

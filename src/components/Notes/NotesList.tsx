import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { NotesDropdown } from './NotesDropdown';
import { INote } from '../../shared/interfaces/notes.interface';
import { getActiveProfile } from '../../services/local-storage.service';

const initialNotes: INote[] = [
    {
        subject: 'Subject1',
        notes: [
            {
                date: new Date(),
                text: 'lorem100 Dolore est voluptate culpa tempor velit cupidatat cillum dolor ea ullamco dolor amet. Occaecat adipisicing excepteur velit quis id. Id dolore est eu laborum nulla et irure mollit sint. Excepteur reprehenderit reprehenderit laboris elit aute tempor. Consectetur sit ipsum in dolor. Cillum aliqua consequat duis reprehenderit non amet pariatur in ea ex nulla eu voluptate amet. Magna elit ad adipisicing do aliquip elit. Proident reprehenderit nostrud aute cupidatat dolore ipsum in. Veniam aliqua incididunt est ut voluptate ex exercitation tempor ipsum aliqua eu adipisicing pariatur esse. Ex laborum id anim qui proident culpa duis aliquip tempor officia occaecat. Aliquip esse cupidatat minim occaecat. Qui est duis ad adipisicing ipsum labore laborum dolore est voluptate. Eu irure eiusmod laborum ullamco sit. Sint proident duis aliquip velit pariatur quis velit nisi consequat nostrud ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum odit inventore numquam modi itaque eum in. Accusantium alias autem temporibus rem numquam, facilis reprehenderit laborum! Est, temporibus. Aspernatur optio voluptatum nostrum rerum, voluptates mollitia quae asperiores suscipit corporis saepe voluptas vero exercitationem deserunt voluptate ab quod aliquam accusantium fuga quidem non! Eum sint aut, delectus est reprehenderit minus molestiae unde rerum vel iure architecto soluta labore, assumenda atque aliquam consequatur voluptates cum consectetur eveniet, ratione minima nobis. Perferendis explicabo ex ullam laboriosam architecto quibusdam blanditiis esse in, assumenda exercitationem! Eaque blanditiis iste ipsa officia id ipsum dolores quibusdam culpa quos.',
            },
            {
                date: new Date(),
                text: 'Proident id dolore ullamco exercitation dolor amet aute tempor occaecat cillum anim. Aliquip eu fugiat nisi aliqua cillum eu laboris ut adipisicing ex non adipisicing excepteur. Nulla veniam anim est occaecat elit dolor elit sint Lorem nostrud adipisicing nulla. Ipsum incididunt sint amet ad officia qui irure culpa id id aute. Id anim fugiat veniam dolor consectetur ea nostrud.',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
        ],
    },
    {
        subject: 'Subject2Subject2Subject2Subject2',
        notes: [
            {
                date: new Date(),
                text: 'Study somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy somethingStudy something',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
            {
                date: new Date(),
                text: 'Study something2',
            },
        ],
    },
    {
        subject: 'Subject4',
        notes: [
            {
                date: new Date(),
                text: 'lorem100 Dolore est voluptate culpa tempor velit cupidatat cillum dolor ea ullamco dolor amet. Occaecat adipisicing excepteur velit quis id. Id dolore est eu laborum nulla et irure mollit sint. Excepteur reprehenderit reprehenderit laboris elit aute tempor. Consectetur sit ipsum in dolor. Cillum aliqua consequat duis reprehenderit non amet pariatur in ea ex nulla eu voluptate amet. Magna elit ad adipisicing do aliquip elit. Proident reprehenderit nostrud aute cupidatat dolore ipsum in. Veniam aliqua incididunt est ut voluptate ex exercitation tempor ipsum aliqua eu adipisicing pariatur esse. Ex laborum id anim qui proident culpa duis aliquip tempor officia occaecat. Aliquip esse cupidatat minim occaecat. Qui est duis ad adipisicing ipsum labore laborum dolore est voluptate. Eu irure eiusmod laborum ullamco sit. Sint proident duis aliquip velit pariatur quis velit nisi consequat nostrud ipsum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum odit inventore numquam modi itaque eum in. Accusantium alias autem temporibus rem numquam, facilis reprehenderit laborum! Est, temporibus. Aspernatur optio voluptatum nostrum rerum, voluptates mollitia quae asperiores suscipit corporis saepe voluptas vero exercitationem deserunt voluptate ab quod aliquam accusantium fuga quidem non! Eum sint aut, delectus est reprehenderit minus molestiae unde rerum vel iure architecto soluta labore, assumenda atque aliquam consequatur voluptates cum consectetur eveniet, ratione minima nobis. Perferendis explicabo ex ullam laboriosam architecto quibusdam blanditiis esse in, assumenda exercitationem! Eaque blanditiis iste ipsa officia id ipsum dolores quibusdam culpa quos.',
            },
        ],
    },
];

export const NotesList = () => {
    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const profile = await getActiveProfile();
            setNotes(profile.notes);

            //! Temp
            setNotes(initialNotes);
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {notes.map((note: INote, index: number) => (
                    <NotesDropdown key={`${note.subject}-${index}`} note={note} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        paddingBottom: 16,
    },
});

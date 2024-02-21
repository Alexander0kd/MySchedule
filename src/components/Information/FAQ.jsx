import * as React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import FAQDropdown from './FAQDropdown';

const DATA = [
    {
        title: 'Профілі',
        children: [
            {
                title: 'Як редагувати профіль',
                description:
                    '1.Перейдіть на сторінку "Налаштування". <br/>2.Натисніть на кнопку "Налаштування профілів". <br/>3.Натисніть на профіль, який хочете редагувати.<br/>4.Натисніть на кнопку "Редагувати".',
            },
            {
                title: 'Як змінити профіль',
                description: 'Натисніть на значок профіля у правому верхньому кутку екрану та оберіть бажаний профіль з переліку.',
            },
        ]
    },
    {
        title: 'Приховування предметів',
        children: [
            {
                title: 'Як приховати предмети',
                description:
                    '1.Перейдіть на сторінку "Налаштування".<br/>2.Натисніть на кнопку "Налаштування занять".<br/>3.Натисніть на значок "ока" біля назви предмету, який хочете приховати.',
            }
        ]
    }
]

export default function FAQ() {
    return (
        <ScrollView>
            {DATA.map((group) => (
                <>
                    <Text style={styles.text}>{group.title}</Text>
                    {group.children.map((question) => (
                        <FAQDropdown question={question} />
                    ))}
                </>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    text: {
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 24,
        color: 'white',
        fontSize: 22,
    },
});

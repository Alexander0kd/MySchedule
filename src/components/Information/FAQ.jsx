import * as React from 'react';
import { Text, View, StatusBar, StyleSheet, ScrollView } from 'react-native';
import FAQDropdown from './FAQDropdown';
const DATA = [
    {
        id: 'Q1',
        title: 'Як редагувати профіль',
        description:
            '1.Перейдіть на сторінку "Налаштування". <br/>2.Натисніть на кнопку "Налаштування профілів". <br/>3.Натисніть на профіль, який хочете редагувати.<br/>4.Натисніть на кнопку "Редагувати".',
    },
    {
        id: 'Q2',
        title: 'Як змінити профіль',
        description: 'Натисніть на значок профіля у правому верхньому кутку екрану та оберіть бажаний профіль з переліку.',
    },
    {
        id: 'Q3',
        title: 'Як приховати предмети',
        description:
            '1.Перейдіть на сторінку "Налаштування".<br/>2.Натисніть на кнопку "Налаштування занять".<br/>3.Натисніть на значок "ока" біля назви предмету, який хочете приховати.',
    },
];
export default function FAQ() {
    return (
        <View>
            <StatusBar style="auto" />
            <ScrollView>
                <Text style={styles.text}>Профілі</Text>
                <FAQDropdown key={DATA[0].id} question={DATA[0]} />
                <FAQDropdown key={DATA[1].id} question={DATA[1]} />
                <Text style={styles.text}>Приховування предметів</Text>
                <FAQDropdown key={DATA[2].id} question={DATA[2]} />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 24,
        color: 'white',
        fontSize: 22,
    },
});

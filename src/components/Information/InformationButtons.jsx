import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import RightIconButton from '../../shared/components/RightIconButton';

export default function InformationButtons() {
    const navigation = useNavigation();

    return (
        <ScrollView>
            <View style={styles.buttonsContainer}>
                <RightIconButton icon="link" label="Технічна підтримка" />
                <RightIconButton icon="link" label="Оновити застосунок" />
                <RightIconButton icon="arrow-forward" label="Поширені запитання (FAQ)" onPressFunc={() => navigation.navigate('FAQPage')} />
            </View>
            <Text style={styles.text}>Поділитися застосунком</Text>
            <View style={styles.buttonsContainer}>
                <RightIconButton icon="share" label="Android" />
                <RightIconButton icon="share" label="IOS" />
            </View>
            <Text style={styles.text}>Розробники</Text>
            <View style={styles.buttonsContainer}>
                <RightIconButton icon="link" label="PNU" onPressFunc={() => Linking.openURL('https://pnu.edu.ua')} />
                <RightIconButton icon="link" label="KNIS" onPressFunc={() => Linking.openURL('https://comp-sc.pnu.edu.ua/')} />
                <RightIconButton
                    icon="link"
                    label="Бабала Вікторія"
                    onPressFunc={() => Linking.openURL('https://www.linkedin.com/in/victoria-babala-3198362a3/')}
                />
                <RightIconButton icon="link" label="Булавський Олег" />
                <RightIconButton icon="link" label="Гречин Ірина" />
                <RightIconButton icon="link" label="Данюк Владислав" />
                <RightIconButton
                    icon="link"
                    label="Запухляк Олег"
                    onPressFunc={() => Linking.openURL('https://www.linkedin.com/in/oleh-zapukhliak/')}
                />
                <RightIconButton icon="link" label="Кадемський Олександр" />
                <RightIconButton icon="link" label="Семків Константин" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    text: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 24,
        color: '#E6E0E9',
        fontSize: 22,
    },
});

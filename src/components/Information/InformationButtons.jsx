import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IconButton from '../../shared/components/IconButton';

export default function InformationButtons() {
    const navigation = useNavigation();
    const subject = 'Повідомлення про проблеми';
    const message =
        'Шановна команда підтримки, звертаюся до вас щодо проблеми, з якою я зіткнувся(-лася) під час використання вашого мобільного застосунку. Описую проблему нижче:';
    return (
        <ScrollView>
            <View style={styles.buttonsContainer}>
                <IconButton
                    icon="link"
                    label="Технічна підтримка"
                    iconPosition="right"
                    onPressFunc={() => Linking.openURL(`mailto:a96075066@gmail.com?subject=${subject}&body=${message}`)}
                />
                <IconButton icon="link" label="Оновити застосунок" iconPosition="right" onPressFunc={() => Linking.openURL('googlegmail://')} />
                <IconButton
                    icon="arrow-forward"
                    iconPosition="right"
                    label="Поширені запитання (FAQ)"
                    onPressFunc={() => navigation.navigate('FAQPage')}
                />
            </View>
            <Text style={styles.text}>Поділитися застосунком</Text>
            <View style={styles.buttonsContainer}>
                <IconButton icon="share" label="Android" iconPosition="right" />
                <IconButton icon="share" label="IOS" iconPosition="right" />
            </View>
            <Text style={styles.text}>Розробники</Text>
            <View style={styles.buttonsContainer}>
                <IconButton icon="link" iconPosition="right" label="PNU" onPressFunc={() => Linking.openURL('https://pnu.edu.ua')} />
                <IconButton icon="link" iconPosition="right" label="KNIS" onPressFunc={() => Linking.openURL('https://comp-sc.pnu.edu.ua/')} />
                <IconButton
                    icon="link"
                    label="Бабала Вікторія"
                    iconPosition="right"
                    onPressFunc={() => Linking.openURL('https://www.linkedin.com/in/victoria-babala-3198362a3/')}
                />
                <IconButton icon="link" label="Булавський Олег" iconPosition="right" />
                <IconButton icon="link" label="Гречин Ірина" iconPosition="right" />
                <IconButton
                    icon="link"
                    label="Данюк Владислав"
                    iconPosition="right"
                    onPressFunc={() =>
                        Linking.openURL(
                            'https://www.linkedin.com/in/vladdaniuk?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
                        )
                    }
                />
                <IconButton
                    icon="link"
                    label="Запухляк Олег"
                    iconPosition="right"
                    onPressFunc={() => Linking.openURL('https://www.linkedin.com/in/oleh-zapukhliak/')}
                />
                <IconButton icon="link" label="Кадемський Олександр" iconPosition="right" />
                <IconButton icon="link" label="Семків Константин" iconPosition="right" />
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

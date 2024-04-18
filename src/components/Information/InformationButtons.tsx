import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton } from '../../shared/IconButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../environment/available-routes';

export const InformationButtons = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const subject = 'Повідомлення про проблеми';
    const message =
        'Шановна команда підтримки, звертаюся до вас щодо проблеми, з якою я зіткнувся(-лася) під час використання вашого мобільного застосунку. Описую проблему нижче:';

    return (
        <ScrollView>
            <View style={styles.buttonsContainer}>
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Технічна підтримка"
                    onPressFn={() => Linking.openURL(`mailto:autodot222@gmail.com?subject=${subject}&body=${message}`)}
                />
                <IconButton icon="link" iconPosition="right" label="Оновити застосунок" onPressFn={() => Linking.openURL('#')} />
                <IconButton
                    icon="arrow-forward"
                    iconPosition="right"
                    label="Поширені запитання (FAQ)"
                    onPressFn={() => navigation.navigate('FAQPage')}
                />
            </View>

            <Text style={styles.text}>Поділитися застосунком</Text>
            <View style={styles.buttonsContainer}>
                <IconButton icon="share" iconPosition="right" label="Android" onPressFn={() => Linking.openURL('#')} />
                <IconButton icon="share" iconPosition="right" label="IOS" onPressFn={() => Linking.openURL('#')} />
            </View>

            <Text style={styles.text}>Розробники</Text>
            <View style={styles.buttonsContainer}>
                <IconButton icon="link" iconPosition="right" label="ПНУ" onPressFn={() => Linking.openURL('https://pnu.edu.ua')} />
                <IconButton icon="link" iconPosition="right" label="КНІС" onPressFn={() => Linking.openURL('https://comp-sc.pnu.edu.ua/')} />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Бабала Вікторія"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/victoria-babala-3198362a3/')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Булавський Олег"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/oleh-bulavskyi-534776300/')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Гречин Ірина"
                    onPressFn={() => Linking.openURL('www.linkedin.com/in/iryna-hrechyn-7754532b4')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Данюк Владислав"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/vladdaniuk/')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Запухляк Олег"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/oleh-zapukhliak/')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Кадемський Олександр"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/alexander-kademskyi-8939522b4/')}
                />
                <IconButton
                    icon="link"
                    iconPosition="right"
                    label="Семків Константин"
                    onPressFn={() => Linking.openURL('https://www.linkedin.com/in/kostiasemkiv/')}
                />
            </View>
        </ScrollView>
    );
};

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

import * as React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { FAQDropdown } from './FAQDropdown';
import { faqData } from '../../environment/faq-data';
import { IFAQ, IFAQChild } from '../../interfaces/faq.interface';

export const FAQ = () => {
    return (
        <ScrollView>
            {faqData.map((group: IFAQ, index: number) => (
                <View key={index}>
                    <Text style={styles.text}>{group.title}</Text>

                    {group.children.map((question: IFAQChild, _index: number) => (
                        <FAQDropdown key={_index} title={question.title} description={question.description} />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    text: {
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 24,
        color: 'white',
        fontSize: 22,
    },
});

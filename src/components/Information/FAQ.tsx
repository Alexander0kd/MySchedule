import * as React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import FAQDropdown from './FAQDropdown';
import { faqData } from '../../shared/env/faq-data';
import { IFAQ, IFAQChild } from '../../shared/interfaces/faq.interface';

export default function FAQ() {
    return (
        <ScrollView>
            {faqData.map((group: IFAQ, index: number) => (
                <View key={index}>
                    <Text style={styles.text}>{group.title}</Text>
                    
                    {group.children.map((question: IFAQChild, _index: number) => (
                        <FAQDropdown key={_index} question={question} />
                    ))}

                </View>
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

import React, { FunctionComponent, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export const ScheduleChanges: FunctionComponent<{
    isActive: boolean;
    onChangeFn: (state: boolean) => void;
}> = (props) => {
    const [value, setValue] = useState<boolean>(props.isActive);

    const toggleValue = async () => {
        setValue(!value);
        props.onChangeFn(!value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Сповіщати про зміни в розкладі</Text>
            <Switch
                value={value}
                onValueChange={toggleValue}
                trackColor={{ false: '#36343b', true: '#6750a4' }}
                thumbColor={value ? '#eaddff' : '#938f99'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
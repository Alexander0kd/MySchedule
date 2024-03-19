import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

export const ScheduleChanges = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    const toggleNotification = () => {
        setIsNotificationEnabled(previousState => !previousState);
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 16 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Сповіщати про зміни в розкладі</Text>
            <Switch
                value={isNotificationEnabled}
                onValueChange={toggleNotification}
                style={{ marginLeft: 10 }}
                trackColor={{ false: '#36343b', true: '#6750a4' }}
                thumbColor={isNotificationEnabled ? '#eaddff' : '#938f99'}
            />
        </View>
    );
};

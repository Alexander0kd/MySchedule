import { RouteProp } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { AvailableRoutes } from '../../../../shared/env/available-routes';
import { LoadingScreen } from '../../../../shared/components/LoadingScreen';

export const ProfileEdit: FunctionComponent<{
    route: RouteProp<AvailableRoutes>;
}> = (props) => {
    if (props.route.params && props.route.params.profileId) {
        return (
            <View>
                <Text style={{ color: 'red' }}>{props.route.params.profileId}</Text>
            </View>
        );
    }

    return <LoadingScreen></LoadingScreen>;
};

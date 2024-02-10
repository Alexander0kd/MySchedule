import { Dimensions } from 'react-native';

const ScreenWidthService = {
    getWidth: () => Dimensions.get('window').width,
    subscribeToWidthChanges: (callback) => {
        const updateScreenWidth = () => {
            callback(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change', updateScreenWidth);
        return () => {
            Dimensions.removeEventListener('change', updateScreenWidth);
        };
    },
};

export default ScreenWidthService;
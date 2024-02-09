import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// TODO: Перевірити вплив на продуктивність
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

import WelcomePage from './WelcomePage';
import RegistrationPage from './RegistrationPage';
import SuccessfulRegistrationScreen from './SuccessfulRegistrationScreen';

const { width } = Dimensions.get('window');

export default function OnboardingPage() {
    const navigation = useNavigation();
    const [activeSlide, setActiveSlide] = React.useState(0);
    const carouselRef = React.useRef(null);

    const goNext = () => {
        if (carouselRef.current) {
            carouselRef.current.snapToNext();
        }
    };

    const finishSetting = () => {
        navigation.replace('AppNavbar');
    };

    const slides = [
        { component: <WelcomePage />, action: goNext },
        { component: <RegistrationPage />, action: goNext },
        { component: <SuccessfulRegistrationScreen />, action: finishSetting },
    ];

    return (
        <View style={styles.container}>
            {/* // TODO: Добавити можливість скролити назад */}
            <Carousel
                ref={carouselRef}
                data={slides}
                renderItem={({ item }) => React.cloneElement(item.component, { buttonFunction: item.action })}
                sliderWidth={width}
                itemWidth={width}
                pagingEnabled={true}
                onSnapToItem={(index) => setActiveSlide(index)}
                contentContainerCustomStyle={styles.carouselContentContainer}
                scrollEnabled={false}
            />
            <Pagination
                dotsLength={slides.length}
                activeDotIndex={activeSlide}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationInactiveDot}
                inactiveDotOpacity={0.75}
                inactiveDotScale={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselContentContainer: {
        paddingBottom: 40,
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4F378B',
    },
    paginationInactiveDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#332D41',
    },
});

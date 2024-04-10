import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

import { WelcomePage } from './WelcomePage';
import { RegistrationPage } from './RegistrationPage';
import { StackNavigationProp } from '@react-navigation/stack';
import { AvailableRoutes } from '../../environment/available-routes';
import { SuccessfulRegistrationPage } from './SuccessfulRegistrationScreen';

const { width } = Dimensions.get('window');

export const OnboardingPage = () => {
    const navigation: StackNavigationProp<AvailableRoutes> = useNavigation();

    const [activeSlide, setActiveSlide] = useState<number>(0);
    const carouselRef = useRef<Carousel<React.JSX.Element>>(null);

    const goNext = () => {
        if (carouselRef.current) {
            carouselRef.current.snapToNext();
        }
    };

    const finishSetting = () => {
        navigation.replace('AppNavbar');
    };

    const slides = [
        <WelcomePage buttonFunction={goNext} />,
        <RegistrationPage buttonFunction={goNext} />,
        <SuccessfulRegistrationPage buttonFunction={finishSetting} />,
    ];

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                vertical={false}
                data={slides}
                renderItem={({ item }) => item}
                sliderWidth={width}
                itemWidth={width}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141218',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    carouselContentContainer: {
        paddingBottom: 50,
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

import React from 'react';
import { ImageBackground, Platform, Text, StyleSheet, View, Dimensions, Image, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';

// Default screen size (1024x600)
const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 600;

// Get the current screen size 
const { width, height } = Dimensions.get('window');

// Calculate the icon size based on the screen width
const ICON_SIZE = width * 0.045; // Change this multiplier to adjust icon size

function HomeScreen(props) {
    // Predefined navigation icons
    const navIcons = [
        require('../assets/media/icons/nav_icons/1.png'),
        require('../assets/media/icons/nav_icons/2.png'),
        require('../assets/media/icons/nav_icons/3.png'),
        require('../assets/media/icons/nav_icons/4.png'),
        require('../assets/media/icons/nav_icons/5.png'),
        require('../assets/media/icons/nav_icons/6.png'),
        require('../assets/media/icons/nav_icons/7.png'),
        require('../assets/media/icons/nav_icons/8.png'),
    ];

    // Calculate total height for the sideNav
    const totalHeight = (navIcons.length * ICON_SIZE ); 

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/media/backgrounds/darkTheme.jpg')}
        >
            <SafeAreaView style={styles.container}>
                <View style={[styles.sideNav, { height: totalHeight }]}>
                    <ScrollView
                        contentContainerStyle={styles.iconContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {navIcons.map((icon, index) => (
                            <Image
                                key={index}
                                source={icon}
                                style={[styles.navIcon, { width: ICON_SIZE, height: ICON_SIZE }]}
                            />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        flexDirection: 'row', // Align sideNav and mainContent in a row
        alignItems: 'center', // Center vertically
    },
    sideNav: {
        backgroundColor: 'rgba(240, 240, 240, 0.5)', // Set background with 50% opacity
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 1,
        width: '6%', // Width of the sideNav
        justifyContent: 'center', // Center icons vertically within sideNav
        marginLeft: Platform.OS === 'ios' ? 0 : 10,
        marginTop: Platform.OS === "ios"? 20: 0,
    },
    navIcon: {
        aspectRatio: 1, // Maintain square aspect ratio
        marginVertical: 13, // Vertical spacing
    },
    iconContainer: {
        justifyContent: 'center', // Center icons vertically
        alignItems: 'center',
    },
});

export default HomeScreen;

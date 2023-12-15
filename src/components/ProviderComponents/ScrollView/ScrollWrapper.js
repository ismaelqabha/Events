
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Footer from '../../Footers/Footer';
import { AppStyles } from '../../../assets/res/AppStyles';
import {
    useSharedValue,
} from 'react-native-reanimated';
import { Keyboard } from 'react-native';

const ScrollWrapper = ({ amountDots, dotPlace, onNextPress, children }) => {

    const [scrollDirection, setScrollDirection] = useState('up');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const scrollY = useSharedValue(0);
    const footerVisibility = useSharedValue(0);

    useEffect(() => {  // Keyboard Listeners 
        const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, () => {
            setKeyboardVisible(true);
            setScrollDirection('up');
            // Hide footer when keyboard appears and TextInput is focused
        });

        const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
            setKeyboardVisible(false);
            setScrollDirection('down');
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handleScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset > 0 && currentOffset > scrollY.value) {
            setScrollDirection('up');

        } else {
            setScrollDirection('down');
        }
        scrollY.value = currentOffset;

        footerVisibility.value = (scrollDirection === 'down' && !keyboardVisible) ? 1 : 0
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 130 }}
                keyboardShouldPersistTaps="handled"
            >
                {React.Children.map(children, (child) =>
                    React.cloneElement(child)
                )}
            </ScrollView>
            {!keyboardVisible && <Footer
                style={AppStyles.signUpFooter}
                onNextPress={onNextPress}
                footerVisibility={footerVisibility}
                dotPlace={dotPlace}
                amountDots={amountDots}
            />}
        </View>
    );
};

export default ScrollWrapper;

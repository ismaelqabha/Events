import { ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../assets/AppColors';
import { getAllInvitationBackgrounds } from '../resources/API';
import { invetationBackground } from '../resources/data';

const BackgroundInvetCard = (props) => {
    const [backgrounds, setBackgrounds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
                const response = await getAllInvitationBackgrounds();
                if (response && response.images) {
                    setBackgrounds(response.images);
                } else {
                    setBackgrounds(invetationBackground.map(bg => bg.value));
                }
            } catch (error) {
                console.error('Error fetching backgrounds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBackgrounds();
    }, []);

    const setInviteBg = (item) => {
        props.setBG(item); // Ensure you're passing only the URI
        props.setShowBGModal(false);
    };

    const renderBGCards = () => {
        return backgrounds.map((item, index) => (
            <Pressable key={index} style={styles.card} onPress={() => setInviteBg(item)}>
                <Image style={styles.img} source={{ uri: item }} />
            </Pressable>
        ));
    };

    return (
        <View style={styles.cont}>
            {loading ? (
                <ActivityIndicator size="large" color={colors.puprble} />
            ) : (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {renderBGCards()}
                </ScrollView>
            )}
        </View>
    );
};

export default BackgroundInvetCard;

const styles = StyleSheet.create({
    cont: {
        paddingLeft: 10,
        alignSelf: 'center',
        height: '95%',
    },
    card: {
        marginRight: 20,
        borderWidth: 3,
        borderColor: colors.darkGold
    },
    img: {
        width: 220,
        height: '100%',
        resizeMode: 'stretch'
    }
});

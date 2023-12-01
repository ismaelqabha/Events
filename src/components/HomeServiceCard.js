import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { Pressable } from 'react-native';



const HomeServiceCard = (props) => {
    const { subTitle } = props;
    const navigation = useNavigation();
    const { HomeCardType } = useContext(SearchContext);

    const queryImg = () => {
        return props.images?.filter(photo => {
            return photo.coverPhoto == true
        });
    };

    const renderImages = () => {
        const logo = queryImg()
        const imageArray = logo?.map(photo => {
            return <Image
                style={styles.img}
                source={{ uri: photo.image }} />;
        });
        return imageArray

    }
    const renderCards = () => {
        if (HomeCardType == 'top') {
            return (
                <View>
                    {renderImages()}
                    <View style={styles.InfoView}>
                        <View style={styles.txtView}>
                            <Text style={styles.txtRank}>★5</Text>
                        </View>
                        <View style={styles.txtView}>
                            <Text style={styles.txt}>{subTitle}</Text>
                        </View>

                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    {renderImages()}
                    <View style={styles.suggestView}>
                        <View style={styles.txtView}>
                            <Text style={styles.txtRank}>★5</Text>
                        </View>
                        <View style={styles.txtView}>
                            <Text style={styles.txt}>{subTitle}</Text>
                        </View>

                    </View>
                </View>
            )
        }

    }
    return (
        <Pressable style={styles.container}>
            {renderCards()}
        </Pressable>
    )
}

export default HomeServiceCard

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 160,
        margin: 10
    },
    img: {
        width: '100%',
        height: 160,
    },
    txt: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    InfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 30,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center'
    },
    suggestView: {
        height: 30,
        alignSelf: 'center',
        alignItems: 'center'
    },
    txtView: {
        backgroundColor: colors.puprble,
        borderRadius: 20
    },
    txtRank: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold'
    }
})
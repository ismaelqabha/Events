import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { Pressable } from 'react-native';



const HomeServiceCard = (props) => {
    const { isFromNearestServicesClick, isFromTopServicesClick, subTitle, title } = props;
    const navigation = useNavigation();
    const {  } = useContext(SearchContext);

    const queryImg = () => {
        return props.images?.filter(photo => {
            return photo.coverPhoto == true
        });
    };

    const renderImages = () => {
        const logo = queryImg()
        const imageArray = logo?.map(photo => {
            if (isFromTopServicesClick === true) {
                return (<View >
                    <Image
                        style={styles.Topimg}
                        source={{ uri: photo.image }} />
                    <View style={styles.topInfoView}>
                        <Text style={styles.txtTopTitle}>{title}</Text>
                        <Text style={styles.txtRankTop}>★5</Text>
                    </View>
                </View>
                );
            } else {
                if (isFromNearestServicesClick === true) {
                    return (<View>
                        <Image
                            style={styles.Nearestimg}
                            source={{ uri: photo.image }} />
                        <View style={styles.NearestInfoView}>
                            <Text style={styles.txtNeraestTitle}>{title}</Text>
                        </View>
                    </View>
                    );
                }
                else {
                    return (
                        <View>
                            <Image
                                style={styles.img}
                                source={{ uri: photo.image }} />
                            <View style={styles.InfoView}>
                                <View style={styles.txtView}>
                                    <Text style={styles.txtRank}>★5</Text>
                                </View>
                                <View style={styles.txtView}>
                                    <Text style={styles.txt}>{title}</Text>
                                </View>

                            </View>
                        </View>
                    )
                }
            }
        });
        return imageArray

    }
    const renderCards = () => {
        if (isFromTopServicesClick === true) {
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
            if (isFromNearestServicesClick === true) {
                return (
                    <View>
                        {renderImages()}
                        <View style={styles.suggestView}>
                            <View style={styles.txtView}>
                                {/* <Text style={styles.txtRank}>★5</Text> */}
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
            }

        }

    }
    return (
        <Pressable style={styles.container}>
            {renderImages()}
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
    suggestView: {
        height: 30,
        alignSelf: 'center',
        alignItems: 'center'
    },
    
    topInfoView: {
        width: '40%',
        height: 45,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: 'white',
        elevation: 5,
    },
    Topimg: {
        width: '40%',
        height: 100,
    },
    txtTopTitle: {
        fontSize: 14,
        color: 'bold',
        color: colors.puprble
    },
    txtRankTop: {
        fontSize: 12,
        color: colors.darkGold,
    },
    NearestInfoView: {
        width: '60%',
        //height: 30,
        position: 'absolute',
        bottom: 10,
    },
    Nearestimg: {
        width: '60%',
        height: 160,
        borderRadius: 20,
    },
    txtNeraestTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 3
    },
    InfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        height: 30,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: 160,
    },
    txt: {
        fontSize: 16,
        color: colors.puprble,
        fontWeight: 'bold'
    },

    txtView: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    txtRank: {
        fontSize: 16,
        color: colors.darkGold,
        fontWeight: 'bold'
    },


})
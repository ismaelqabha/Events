import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import { colors } from '../assets/AppColors';
import { Pressable } from 'react-native';


const HomeServiceCard = (props) => {
    const { isFromNearestServicesClick, isFromTopServicesClick, isFromSugestServicesClick, subTitle, title, address } = props;
    const navigation = useNavigation();
    const { } = useContext(SearchContext);

    const queryImg = () => {
        return props.images?.filter(photo => {
            return photo.coverPhoto == true
        });
    };

    const renderImages = () => {
        const logo = queryImg()
        const imageArray = logo?.map(photo => {
            if (isFromTopServicesClick === true) {
                return (<View style={{ marginVertical: 10 }}>
                    <Image
                        style={styles.Topimg}
                        source={{ uri: photo.image }} />
                    <View style={styles.topInfoView}>
                        <Text style={styles.txtRankTop}>★5</Text>
                        <Text style={styles.txtTopTitle}>{title}</Text>
                    </View>
                </View>
                );
            }
            if (isFromNearestServicesClick === true) {
                return (<View style={styles.nearest}>
                    <Image
                        style={styles.Nearestimg}
                        source={{ uri: photo.image }} />
                    <View style={styles.NearestInfoView}>
                        <Text style={styles.txtNeraestTitle}>{title}</Text>
                        <Text style={styles.txtNeraestTitle}>{address}</Text>
                        <Text style={styles.txtNearestRank}>★5</Text>

                    </View>
                </View>
                );
            }
            if (isFromSugestServicesClick === true) {
                return (
                    <View style={{ margin: 10, }}>
                        <Image
                            style={styles.img}
                            source={{ uri: photo.image }} />
                        <View style={styles.InfoView}>
                            <Text style={styles.txt}>{title}</Text>

                            <Text style={styles.txtRank}>★5</Text>
                        </View>
                    </View>
                );
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

    },
    suggestView: {
        height: 30,
        alignSelf: 'center',
        alignItems: 'center'
    },

    topInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 30,

        //backgroundColor: 'white',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
    },
    Topimg: {
        width: '100%',
        height: 150,
    },
    txtTopTitle: {
        fontSize: 20,
        color: 'bold',
        color: 'white',
        marginRight: 20
    },
    txtRankTop: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    nearest: {
        backgroundColor: colors.BGScereen,
        width: 280,
        height: 250,
        borderRadius: 20,
        elevation: 5,

        margin: 10,
        alignItems: 'center'
    },
    NearestInfoView: {
        width: '90%',
    },
    Nearestimg: {
        width: '90%',
        height: '60%',
        borderRadius: 20,
        marginVertical: 10
    },
    txtNeraestTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        //color: 'white',
        marginRight: 3
    },
    txtNearestRank: {

    },
    InfoView: {
        width: '60%',
        height: 50,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5
    },
    img: {
        width: '60%',
        height: 150,
    },
    txt: {
        fontSize: 16,
        color: colors.puprble,
        fontWeight: 'bold'
    },

    // txtView: {
    //     backgroundColor: 'white',
    //     borderRadius: 5,
    //     //borderWidth: 1
    // },
    txtRank: {
        fontSize: 16,
        //color: colors.darkGold,
        fontWeight: 'bold'
    },
    forHome: {
        borderRadius: 30,
        //shadowRadius: 4,
        elevation: 3,
        margin: 10,
        width: 200,
        height: 180,
        alignSelf: 'center'
    },

})
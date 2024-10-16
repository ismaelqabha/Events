import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';
import { review } from '../resources/data';
import SearchContext from '../../store/SearchContext';
import moment from 'moment';
import { getServiceBySerId } from '../resources/API';


const ReviewsScreen = (props) => {
    const { setIsfirst, isFirst } = useContext(SearchContext);
    const { clientReview, providerReview, userId } = props.route?.params || {}
    const [service, setService] = useState([])

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        // findServiseTitleLogo()
    }, []);

    const getProviderInfo = () => {
        return review?.filter(item => {
            return item.RecieverId === isFirst
        })
    }
    const getClientInfo = () => {
        return review?.filter(item => {
            return item.RecieverId === userId

        })
    }

    const findServiseTitleLogo = (id) => {
        getServiceInfo(id)


        console.log(id);
        console.log(">>", service);


        var serviceTitle = service[0].serviceData.title
        const index = service[0].serviceImages.logoArray?.findIndex((val) => val === true)
        const logo = service[0].serviceImages?.serviceImages[index]
        console.log(serviceTitle, logo);

    }
    const getServiceInfo = async (id) => {
        const respons = await getServiceBySerId({ service_id: id })

        setService(respons)
        //  console.log('res ', respons[0].serviceImages);


    }



    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>)
    }

    const clientReviewInfo = () => {
        const data = getClientInfo()

        return data?.map(item => {

            getServiceInfo(item.senderId)
            const index = service[0].serviceImages[0].logoArray?.findIndex((val) => val === true)
            const logo = service[0].serviceImages[0]?.serviceImages[index]

            const reviewDate = moment(item.reviewDate, "YYYYMMDD").fromNow()
            return (<View>
                <View style={styles.messageView}>
                    <View style={styles.reviewInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>{service[0].serviceData.title} </Text>
                            <Text style={styles.servicenameTxt}>{reviewDate}</Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={{ uri: logo }} /></View>
                    </View>
                    <Text style={styles.ReviewTxt}>{item.reviewText}</Text>
                </View>
                {seperater()}
            </View>
            )
        })
    }
    const ProviderReviewInfo = () => {
        const data = getProviderInfo()
        return data?.map(item => {
            const reviewDate = moment(item.reviewDate, "YYYYMMDD").fromNow()
            return (<View>
                <View style={styles.messageView}>
                    <View style={styles.reviewInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>ابو عبدالله</Text>
                            <Text style={styles.servicenameTxt}> {reviewDate} </Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={require('../assets/photos/raaed.png')} /></View>
                    </View>
                    <Text style={styles.ReviewTxt}>{item.reviewText}</Text>
                </View>
                {seperater()}
            </View>
            )
        })
    }
    const seperater = () => {
        return (
            <View style={{ borderWidth: 0.5, borderColor: 'lightgray', width: '90%', alignSelf: 'center', marginTop: 5 }}></View>
        )
    }
    const renderReview = () => {
        if (clientReview) {
            return <View>
                {clientReviewInfo()}
            </View>


        }
        if (providerReview) {
            return <View>
                {ProviderReviewInfo()}
            </View>

        }
    }
    return (
        <View>
            {renderHeader()}
            <Text style={styles.reviewtxt}>المراجعات (2)</Text>
            {renderReview()}
        </View>
    )
}

export default ReviewsScreen

const styles = StyleSheet.create({
    reviewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

    },
    header: {
        width: "95%",
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    reviewtxt: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20,
        marginTop: 30
    },
    clientImgView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 30
    },
    clientImg: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    servicenameTxt: {
        fontSize: 15,
        color: 'black',
    },
    messageView: {
        width: '90%',
        height: 200,
        alignSelf: 'center',
        marginTop: 30,
    },
    ReviewTxt: {
        fontSize: 15,
        color: 'black',
        marginTop: 20
    },
})
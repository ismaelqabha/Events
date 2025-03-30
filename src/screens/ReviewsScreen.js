import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';
import { review } from '../resources/data';
import SearchContext from '../../store/SearchContext';
import moment from 'moment';
import { getReviewForClient, getReviewForProvider, getServiceBySerId } from '../resources/API';
import ReviewsForClientComp from '../components/ReviewsForClientComp';
import ReviewForProviderComp from '../components/ReviewForProviderComp';


const ReviewsScreen = (props) => {
    const {isFirst } = useContext(SearchContext);
    const { clientReview, providerReview, userId } = props.route?.params || {}

    const [reviewForClient, setReviewForClient] = useState([])
    const [reviewForProvider, setReviewForProvider] = useState([])

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    useEffect(() => {
        checkReviewSource()
    }, []);

    const checkReviewSource = () => {
        if (clientReview) {
            getReviewForClient({ recieverId: userId }).then((res) => {
                setReviewForClient(res)
            })
        }
        if (providerReview) {
            getReviewForProvider({ recieverId: isFirst }).then((res) => {
                setReviewForProvider(res)
            })
        }
    }

    const renderReviews = () => {

        if (clientReview) {
            return (
                <ReviewsForClientComp reviewForClient={reviewForClient} />
            )
        }
        if (providerReview) {
            return (
                <ReviewForProviderComp reviewForProvider={reviewForProvider} />
            )
        }
    }

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>)
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderReviews()}
        </View>
    )
}

export default ReviewsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: "95%",
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
    },

})
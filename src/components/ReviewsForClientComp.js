import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { colors } from '../assets/AppColors';


const ReviewsForClientComp = (props) => {
    const { reviewForClient } = props

    const seperater = () => {
        return (
            <View style={styles.seperator}></View>
        )
    }

    const renderReview = () => {

        return reviewForClient?.map(item => {
            const reviewDate = moment(item.reviewData.reviewDate, "YYYYMMDD").fromNow()
            const index = item.providerImages[0].logoArray?.findIndex((val) => val === true)
            const logo = item.providerImages[0]?.serviceImages[index]
            return (<View>
                <View style={styles.messageView}>
                    <View style={styles.reviewInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>{item.providerInfo[0].title} </Text>
                            <Text style={styles.servicenameTxt}>{reviewDate}</Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={{ uri: logo }}
                        /></View>
                    </View>
                    <Text style={styles.ReviewTxt}>{item.reviewData.reviewText}</Text>
                </View>
                {seperater()}
            </View>
            )
        })
    }

    return (
        <View>
            <Text style={styles.reviewtxt}>{"المراجعات" + " " + "(" + reviewForClient.length + ")"}</Text>
            {renderReview()}
        </View>
    )
}

export default ReviewsForClientComp

const styles = StyleSheet.create({
    seperator:{ 
        borderWidth: 0.5, 
        borderColor: 'lightgray', 
        width: '90%', 
        alignSelf: 'center', 
        marginTop: 5 
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
    reviewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',

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
    clientImgView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginLeft: 30,
    },
    reviewtxt: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20,
        marginTop: 30
    },
})
import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from 'moment';
import { colors } from '../assets/AppColors';

const ReviewForProviderComp = (props) => {

    const { reviewForProvider } = props

    const seperater = () => {
        return (
            <View style={styles.seperator}></View>
        )
    }

    const renderReview = () => {

        return reviewForProvider?.map(item => {
            const reviewDate = moment(item.reviewData.reviewDate, "YYYYMMDD").fromNow()
           
            return (<View>
                <View style={styles.messageView}>
                    <View style={styles.reviewInfo}>
                        <View>
                            <Text style={styles.servicenameTxt}>{item.clientsInfo[0].User_name} </Text>
                            <Text style={styles.servicenameTxt}>{reviewDate}</Text>
                        </View>
                        <View style={styles.clientImgView}><Image style={styles.clientImg} source={{ uri: item.clientsInfo[0].UserPhoto }}
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
         <Text style={styles.reviewtxt}>{"المراجعات" + " " + "(" + reviewForProvider.length + ")"}</Text>
      {renderReview()}
    </View>
  )
}

export default ReviewForProviderComp

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
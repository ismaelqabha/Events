import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from '../assets/AppColors';
import SearchContext from '../../store/SearchContext';


const ReviewsScreen = (props) => {
    const { clientReview, providerReview } = props.route?.params || {}
    const { isFirst } = useContext(SearchContext);
    const [sderviceData, setServiceData] = useState([])
    const onPressHandler = () => {
        props.navigation.goBack();
    }


    const getServiceInfo = () => {
        getServiceBySerId({ service_id: isFirst }).then(res => {
            setServiceData(res)
        })
    }

    useEffect(() => {
        getServiceInfo()
    }, []);

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
        return (<View>
            <View style={styles.messageView}>
                <View style={styles.reviewInfo}>
                    <View>
                        <Text style={styles.servicenameTxt}>قاعة الامير</Text>
                        <Text>منذ 3 شهور</Text>
                    </View>
                    <View style={styles.clientImgView}><Image style={styles.clientImg} source={require('../assets/photos/ameer.png')} /></View>
                </View>
                <Text style={styles.ReviewTxt}>زبون محترم وخلوق جدا كان ملتزم في كل الشروط والتعليمات كل الاحترام والتقدير</Text>
            </View>
            {seperater()}
        </View>
        )
    }
    const ProviderReviewInfo = () => {
        return (<View>
            <View style={styles.messageView}>
                <View style={styles.reviewInfo}>
                    <View>
                        <Text style={styles.servicenameTxt}>عبد الله الزيود</Text>
                        <Text>منذ 3 شهور</Text>
                    </View>
                    <View style={styles.clientImgView}><Image style={styles.clientImg} source={require('../assets/photos/raaed.png')} /></View>
                </View>
                <Text style={styles.ReviewTxt}>معاملة جميلة وخدمات ممتازة كل الاحترام والتقدير</Text>
            </View>
            {seperater()}
        </View>
        )
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
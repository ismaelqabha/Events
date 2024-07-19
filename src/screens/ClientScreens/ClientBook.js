import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../../store/SearchContext';
import BookingCard from '../../components/BookingCard';
import SuggestionsServicesComp from '../../components/SuggestionsServicesComp';


const ClientBook = (props) => {

    const { requestInfoAccUser } = useContext(SearchContext);
    const { data } = props?.route.params;


    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const queryRequest = () => {
        if (requestInfoAccUser.message !== "no Request") {
            // console.log("requestInfoAccUser", requestInfoAccUser[1].requestInfo.paymentInfo);
            const clientReq = requestInfoAccUser.filter(item => {
                return item.requestInfo.ReqEventId == data.EventId;
            })
            return clientReq
        } else {
            return []
        }
    }

    const renderRequestData = () => {
        const reqData = queryRequest()
        //console.log(reqData);
        return reqData.map(item => {
            return <BookingCard {...item.requestInfo}
                services={item?.serviceData}
                images={item?.serviceImage}
                relatedCamp={item?.serviceCamp}
                realPayments={item?.payments}
                BookDates={item?.BookDates}
                serviceRequests={item?.serviceRequests}
                eventData={data} />
        })
    }


    return (
        <View style={styles.container}>

            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}>
                        <AntDesign
                            style={styles.icon}
                            name={"left"}
                            color={"black"}
                            size={20} />

                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>{data?.eventName || 'no event'}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.home}>
                {renderRequestData()}
                <View style={{marginVertical : 20}}>
                    <Text style={styles.title}>خدمات قد تهمك</Text>
                    <SuggestionsServicesComp />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    home: {
        paddingBottom: 30,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: 'black',
        marginRight: 30,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },

})

export default ClientBook;

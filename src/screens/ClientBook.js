import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';
import BookingCard from '../../src/components/BookingCard';
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../store/SearchContext';
import { getRequestInfoWithservice } from '../resources/API';


const ClientBook = (props) => {

    const { requestInfo, setRequestInfo } = useContext(SearchContext);
    const { data } = props?.route.params;

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    // console.log("data.EventId", data.EventId);

    const getRequestfromApi = () => {
        getRequestInfoWithservice({ ReqEventId: data?.EventId }).then(res => {
            setRequestInfo(res)
            //console.log("requestInfo", res);
        })
    }
    useEffect(() => {
        getRequestfromApi()
    }, [])

    // const query = () => {
    //     if (!data.EventId) {
    //         return requestInfo || [];
    //     }
    //     return requestInfo.filter(event => {
    //         return event.ReqEventId == data.EventId;
    //     })++
    // }
    const renderCard = () => {
        const dataa = requestInfo;
        const cardsArray = dataa.map(card => {
            return <BookingCard {...card.requestInfo}
                services={card?.serviceData}
                image={card?.serviceImage} />;
        });
        return cardsArray;
    };


    return (
        <View style={styles.container}>

            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}
                    >
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
                {renderCard()}
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

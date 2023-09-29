import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { Pressable } from 'react-native';
import { addNewOrderDetail, getOrderSubdetailInfo, getServiceSubDetail } from '../resources/API';
import Ionicons from "react-native-vector-icons/Ionicons";

const SubDetailPrices = (props) => {
    const { detail_ID } = props.route?.params || {}

    const { orderSubdetail, setOrderSubdetail, SubDetData, setSubDetData, serviceSubDetail, setserviceSubDetail, userId, RequestIdState } = useContext(SearchContext);
    console.log("request_Id", RequestIdState);
    const orderItemIndex = orderSubdetail?.findIndex(item => item.request_Id === RequestIdState && item.UserID === userId);
    const orderItem = orderItemIndex > -1 ? orderSubdetail[orderItemIndex] : false;

    const orderIndex = orderItem?.orderItems?.findIndex(order => order.DetialId == detail_ID)
    const order = orderIndex > -1 ? orderItem?.orderItems[orderIndex] : false;
    const { listSupDetail } = order || {};

    console.log('orderItemIndex: ', orderItemIndex, "orderIndex : ", order, "orderIndex", orderIndex);


    const getSubDetailFromApi = () => {
        getServiceSubDetail({ detailId: detail_ID }).then(res => {
            setserviceSubDetail(res)
        })
    }
    // const getOrderdetailFromApi = () => {
    //     getOrderSubdetailInfo({ request_Id: RequestIdState }).then(res => {
    //         console.log("request_Id", RequestIdState, "orderSubdetail", res);
    //         setOrderSubdetail(res)
    //     })
    // }
    

    useEffect(() => {
        getSubDetailFromApi()
       // getOrderdetailFromApi()
    }, [])

    const backPress = () => {
        props.navigation.goBack();
    }


    const creatNewOrder = (item) => {
        const newSubDetail = {
            orderItems: [],
            request_Id: RequestIdState,
            UserID: userId,
        }
        newSubDetail.orderItems.push({
            DetialId: item.detailId, // 3sha 
            listSupDetail: [item._id]
        })

        addNewOrderDetail(newSubDetail).then(res => {
            const ord = orderSubdetail || [];
            ord.push(newSubDetail)
            setOrderSubdetail([...ord])
        })

    }

    const addDetailToOrder = (item) => {
        const newOrderItems = {
            DetialId: item.detailId, // 3sha 
            listSupDetail: [item._id]
        }
        addNewOrderDetail(newOrderItems).then(res => {
            const items = orderItem.orderItems;
            items.push(newOrderItems)
            setOrderSubdetail([...items])
        })
    }

    const checkIfChecked = (item, addingDisabled) => {
        if (addingDisabled) {
            return !!listSupDetail?.find(i => i === item._id);
        }
        if (!orderItem) {
            creatNewOrder(item);
            return null;
        }
        if (!order) {
            addDetailToOrder(item)
            return null;
        }
        return !!listSupDetail?.find(i => i === item._id);

    }
    const CBvalueChange = (item) => {
        const subd = orderSubdetail;
        const isChecked = checkIfChecked(item);

        console.log('isChecked: ', isChecked);

        if (isChecked === null) {
            return;
        }

        if (!isChecked) {
            subd[orderItemIndex].orderItems[orderIndex].listSupDetail.push(item._id)
            setOrderSubdetail([...subd])
        } else {
            var prods = order?.listSupDetail;
            prods = prods.filter(pr => pr !== item._id)
            subd[orderItemIndex].orderItems[orderIndex].listSupDetail = prods
            setOrderSubdetail([...subd])
        }
    }
    //console.log("detailIdState", detailIdState);
    const query = () => {
        return serviceSubDetail?.filter(ItemSubdetail => {
            return ItemSubdetail.detailId == detail_ID;
        })
    }
    const renderSubDetail = ({ item, index }) => {
        const card = item;
        const clicked = checkIfChecked(item, true);
        console.log('clicked: ', clicked);

        return (
            <View >
                <Pressable
                    key={index}
                    style={clicked ? styles.checkBViewPress : styles.checkBView}
                    onPress={() => CBvalueChange(card)}>
                    <View style={styles.subView}>
                        <Text style={styles.subDeText} numberOfLines={2}>{card.detailDescrption}</Text>
                        <Text style={styles.subDeText}>{"السعر " + " " + card.detailCost}</Text>
                    </View>
                    <Image source={card.detailImg} style={styles.img} />
                </Pressable>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Pressable onPress={backPress}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
            <FlatList
                numColumns={1}
                data={query()}
                renderItem={renderSubDetail}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        margin: 20,
    },
    icon: {
        justifyContent: 'flex-start'
    },
    subView: {
        flex: 1,
        margin: 5
    },
    checkBView: {
        width: '90%',
        height: 100,
        // alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 5,
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white'
    },
    checkBViewPress: {
        width: '90%',
        height: 100,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white',
        borderWidth: 1
    },
    subDeText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 10
    },
    img: {
        width: 80,
        height: 80,
        backgroundColor: 'gray',
        alignItems: 'center'
    },

})

export default SubDetailPrices;

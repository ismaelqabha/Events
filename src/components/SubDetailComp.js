import React, { useContext } from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { Pressable } from 'react-native';

const SubDetailComp = () => {
    const { detailIdState, SubDetData, setSubDetData, serviceSubDetail, userId, RequestIdState } = useContext(SearchContext);

    const orderItemIndex = SubDetData.findIndex(item => item.request_Id === RequestIdState && item.UserID === userId);
    const orderItem = orderItemIndex > -1 ? SubDetData[orderItemIndex] : undefined ; 

    const orderIndex = orderItem?.orderItems?.findIndex(order => order.detial_id == detailIdState)
    const order = orderIndex > -1 ? orderItem?.orderItems[orderIndex] : undefined ;
    const{orderProducts} = order || {}; 

    console.log('orderItemIndex: ' , orderItemIndex , "orderIndex : " ,order );


    const creatNewOrder = (item) => {
        const newSubDetail = {
            orderItems: [],
            DetailId: detailIdState,
            request_Id: RequestIdState,
            UserID: userId,
        }
        newSubDetail.orderItems.push({
            detial_id: item.subDetail_Id, // 3sha 
            orderProducts: [item.id]
        })

        var arr = SubDetData;
        arr.push(newSubDetail);
        setSubDetData([...arr])
    }

    const addDetailToOrder = (item) => {
        const items = orderItem.orderItems;
        items.push({
            detial_id: item.subDetail_Id, // 3sha 
            orderProducts: [item.id]
        })
        setSubDetData([...items])
    }
    const checkIfChecked = (item , addingDisabled) => {
        if( addingDisabled) {
           return !!orderProducts?.find(i => i === item.id); 
        }
        if (!orderItem) {
            creatNewOrder(item);
            return null ; 
        }
        if (!order) {
            addDetailToOrder(item)
            return null;
        }
        return !!orderProducts?.find(i => i === item.id); 

    }
    const CBvalueChange = (item) => {
        const subd = SubDetData; 
        const isChecked = checkIfChecked(item) ; 

        console.log('isChecked: ' , isChecked);

        if(isChecked === null){
            return; 
        }

        if (!isChecked) { 
            subd[orderItemIndex].orderItems[orderIndex].orderProducts.push(item.id)
            setSubDetData([...subd])
        } else {
            var prods =  order?.orderProducts ; 
            prods = prods.filter(pr => pr !== item.id)
            subd[orderItemIndex].orderItems[orderIndex].orderProducts = prods 
            setSubDetData([...subd])
        }
    }
    const query = () => {
        return serviceSubDetail.filter(ItemSubdetail => {
            return ItemSubdetail.subDetail_Id === detailIdState;
        })
    }
    const renderSubDetail = ({ item, index }) => {
        const card = item;
        const clicked = checkIfChecked(item , true) ; 
        console.log('clicked: ' , clicked);

        return (
            <View  style={styles.subView}>
                <Pressable
                    style={styles.checkBView}
                    onPress={() => CBvalueChange(card)}>
                    <Image source={card.imgSrc} key={index} style={clicked ? styles.imgActive : styles.img} />
                </Pressable>
                <Text key={index} style={ clicked ? styles.subDeTextActive : styles.subDeText}>{card.detailSubtitle}</Text>
            </View>
        )
    };
    return (
        <View style={styles.container}>
            <FlatList
                numColumns={2}
                data={query()}
                renderItem={renderSubDetail}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    subView:{
       // width: '100%',
    },
    checkBView: {
        //flexDirection: 'row',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    subDeText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 3,
        textAlign: 'center'
    },
    subDeTextActive: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5f9ea0',
        paddingTop: 3,
        textAlign: 'center'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },


    imgActive: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#5f9ea0',
        borderWidth: 5
    },
})

export default SubDetailComp;

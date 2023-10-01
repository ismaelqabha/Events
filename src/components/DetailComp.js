import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';


const DetailComp = (props) => {
    const { data } = props.route?.params || {}
    const { detailOfServ, setDetailOfServ, isFromRequestScreen } = useContext(SearchContext);
    
    const navigation = useNavigation()

    const onPressHandler = (detail_ID) => {
        //console.log("detail_ID",detail_ID);
        navigation.navigate(ScreenNames.SubDetailPrices, { detail_ID })
    }

    const query = () => {
        return detailOfServ?.filter(ItemSerType => {
           // console.log("detailOfServvv", detailOfServ);
            return ItemSerType.SDserviceID == props.service_id;
        })
    }
    const renderDetail = () => {
        const dataa = query();

        if (isFromRequestScreen) {
            const cardsArray = dataa.map(card => {
                return <TouchableOpacity onPress={() => onPressHandler(card?.detail_Id)} style={styles.touchView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>
                   
                </TouchableOpacity>;
            });
            return cardsArray;
        }else{
            const cardsArray = dataa?.map((card, i) => {
                return <View key={i} style={styles.serviceView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>
                </View>;

            });
            return cardsArray;
        }

    };
    return (
        <View style={styles.container}>
            {renderDetail()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceView: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: 50,
        margin: 5,
        borderRadius: 10,
        
    
    },
    touchView: {
        borderRadius: 10,
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'snow',
        elevation: 5
    },
    txt1: {
        fontSize: 15,
        margin: 10,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right'
    },
   
})

export default DetailComp;

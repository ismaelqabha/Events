import React, { useContext, useState,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SearchContext from '../../store/SearchContext';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/ScreenNames';
import { getServiceDetail } from '../resources/API';


const DetailComp = (props) => {
    
    const { detailOfServ, setDetailOfServ, isFromRequestScreen } = useContext(SearchContext);
    const [gotMandotryDetail, setGotMandotryDetail] = useState(true)
    const [gotOptionalDetail, setGotOptionalDetail] = useState(true)

    const navigation = useNavigation()

    //console.log("detailOfServ",detailOfServ);
    const getDetailFromApi = () => {
        getServiceDetail({ SDserviceID: props.service_id }).then(res => {
            setDetailOfServ(res)
        })
    }
    useEffect(() => {
        getDetailFromApi()
    }, [])

    const onPressHandler = (detail_ID) => {
        navigation.navigate(ScreenNames.SubDetailPrices, { detail_ID })
    }

    const queryMandatoryDetail = () => {
        return detailOfServ?.filter(ItemSerType => {
            return ItemSerType.SDserviceID === props.service_id && ItemSerType.mandatroy === true;
        })
    }
    const queryOptionalDetail = () => {
        return detailOfServ?.filter(ItemSerType => {
            return ItemSerType.SDserviceID === props.service_id && ItemSerType.mandatroy === false;
        })
    }
    //console.log("queryMandatoryDetail", queryMandatoryDetail());
    const renderMandotryDetail = () => {
        const dataa = queryMandatoryDetail();
        
        if (isFromRequestScreen) {
            const cardsArray = dataa.map(card => {
                return <TouchableOpacity onPress={() => onPressHandler(card?.detail_Id)} style={styles.touchView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>

                </TouchableOpacity>;
            });
            if (cardsArray == '') {
                setGotMandotryDetail(false)
            }
            return cardsArray;
        } else {
            const MDetailArray = dataa?.map((card) => {
                return <View style={styles.serviceView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>
                </View>;
            });
            if (MDetailArray == '') {
                setGotMandotryDetail(false)
            }
            
            return MDetailArray;
        }

    }
    const renderOptionalDetail = () => {
        const dataa = queryOptionalDetail();
        if (isFromRequestScreen) {
            const cardsArray = dataa.map(card => {
                return <TouchableOpacity onPress={() => onPressHandler(card?.detail_Id)} style={styles.touchView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>

                </TouchableOpacity>;
            });
            if (cardsArray == '') {
                setGotMandotryDetail(false)
            }
            return cardsArray;
        } else {
            const OpDetailArray = dataa?.map((card) => {
                return <View style={styles.serviceView}>
                    <Text style={styles.txt1}>{card?.detailTitle}</Text>
                </View>;
            });
            if (OpDetailArray == '') {
                setGotOptionalDetail(false)
            }
            
            return OpDetailArray;
        }
    }
    const renderDetail = () => {
        return (<View>
            {gotMandotryDetail &&
                <View>
                    <Text style={styles.txt1}>الخدمات الاجبارية</Text>
                    {renderMandotryDetail()}
                </View>
            }
            {gotOptionalDetail &&
                <View>
                    <Text style={styles.txt1}>الخدمات الاختيارية</Text>
                    {renderOptionalDetail()}
                </View>
            }

        </View>);

    }
    return (
        <View style={styles.container}>
            {renderDetail()}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#199199',
        // height: 200,
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

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { colors } from '../../assets/AppColors';


const ProviderSubDetailComp = (props) => {


    const renderCard = () => {
        return (
            <View style={styles.cardHeader}>
                
                <View style={styles.imgView}>
                    <Image source={props.imgSrc} style={styles.img} />
                </View>
                <View style={styles.txtView}>
                    <Text style={styles.textTitle}>{props.detailSubtitle}</Text>
                    <Text style={styles.textTitle}>₪{props.detailSubtitleCost}</Text>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderCard()}
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        height: 150,
        elevation: 3,
        marginBottom: 20,
        backgroundColor: 'white',
        width: 350,
        borderRadius: 5,
        justifyContent: 'space-between',
        //alignItems: 'center',
        margin: 5,
        alignSelf: 'center'
    },
    txtView:{
        alignItems: 'flex-end',
        margin: 10,
        width: "55%",
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 18,
        color: colors.puprble,
    },
    img: {
        height: 60,
        width: 60,
        borderRadius: 20,
    },
    imgView: {
        height: 120,
        width: '30%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        margin: 10
    }
})

export default ProviderSubDetailComp;

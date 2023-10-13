import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text,Image } from 'react-native';

const ProviderSubDetailComp = (props) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardHeader}
               // onPress={onCaardPress}
            >
                <Text style={styles.textTitle}>₪{props.detailSubtitleCost}</Text>
                <Text style={styles.textTitle}>{props.detailSubtitle}</Text>
                <Image source={props.imgSrc} style={styles.img}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardHeader: {
        flexDirection:'row',
        height: 80,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        marginBottom: 20,
        backgroundColor: 'white',
        width: 300,
        borderRadius: 25,
        justifyContent:'space-around',
        alignItems: 'center'
        
    },
    textTitle:{
        fontSize:25,
        fontWeight: 'bold',
        color:'#483d8b'
    },
    img:{
        height: 60,
        width:60,
        borderRadius: 20,
    },
})

export default ProviderSubDetailComp;

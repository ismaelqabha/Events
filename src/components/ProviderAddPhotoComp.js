import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const ProviderAddPhotoComp = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.ImgView}>
                <Image source={props.image}/>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ImgView:{
        width: 150,
        height: 70,
        borderRadius: 15,
        backgroundColor: 'white',
    },

})

export default ProviderAddPhotoComp;

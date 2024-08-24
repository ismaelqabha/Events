import { ScrollView, StyleSheet, Text, View,Image, Pressable } from 'react-native'
import React from 'react'
import { invetationBackground } from '../resources/data'
import { colors } from '../assets/AppColors'


const BackgroundInvetCard = () => {

    const renderBGCards = () => {
        return invetationBackground.map(item => {
            return (
                <Pressable style={styles.card}>
                    <Image style={styles.img} source={item.value}/>
                </Pressable>
            )
        })

    }
    return (
        <View style={styles.cont}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
               {renderBGCards()} 
            </ScrollView>
        </View>
    )
}

export default BackgroundInvetCard

const styles = StyleSheet.create({
    cont:{
        paddingLeft: 10,
        alignSelf: 'center',
        height: '95%',
        
    },
    card:{
       marginRight: 20,
       borderWidth: 3,
       borderColor: colors.darkGold
    },
    img:{
        width: 220,
        height: '100%',
        resizeMode: 'stretch'
    }
})
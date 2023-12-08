import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors } from '../assets/AppColors'
import ServiceProviderContext from '../../store/ServiceProviderContext'


const HallTypeCard = (props) => {   

    const {hallType,setHallType} = useContext(ServiceProviderContext)

    const [HallPress, setHallPress] = useState(false)

    const onHallTypePress=  () => {
      setHallType(props.hallType)
    }
    useEffect(()=>{
        if (hallType !== props.hallType) {
            setHallPress(false)
        }else{
            setHallPress(true)
        }
    },[hallType])
    
    return (
        <View style={styles.container}>
            <Pressable style={[HallPress ? styles.typePress : styles.typeNotPres]}
                onPress={() => onHallTypePress()}
                >
                    <Image style={styles.img} source={props.img}/>
                <Text style={styles.typetxt}>{props.hallType}</Text>
            </Pressable>
        </View>
    )
}

export default HallTypeCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    typePress: {
        width: 75,
        height: 80,
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    typeNotPres: {
        width: 75,
        height: 80,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5
    },
    typetxt: {
        fontSize: 14,
        color: colors.puprble
    },
    img:{
        width: 50,
        height: 50
    }
})
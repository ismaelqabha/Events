import { useNavigation } from '@react-navigation/native';
import React, { useContext,useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import SearchContext from '../../store/SearchContext';
import SliderImage from '../components/SliderImage';


const HomeCards = (props) => {
    const navigation = useNavigation();
    const { subTitle, title, images } = props;
    const { setSType, setServId } = useContext(SearchContext);

    const onCaardPress = () => {
        setSType((props.servType))
        navigation.navigate(ScreenNames.ServiceDescr, { data: { ...props } })
    }

    useEffect(() => {
        
    }, [])


    return (
        <View>
            <SliderImage  {...props} />
            <TouchableOpacity onPress={onCaardPress}  >
                <View style={{ width: 350, height: 100, marginTop: 10 }}>
                    <View style={styles.nestedView}>
                        <Text>★5</Text>
                        <Text style={{ fontFamily: 'Amiri-BoldItalic', fontSize: 18 }}>{title}</Text>

                    </View>
                    <Text style={styles.text} numberOfLines={2} >{subTitle} ....</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    normallDots: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        marginBottom: 20,
    },
    card1: {
        flex: 1,
        width: 300,
        overflow: 'hidden',
        alignSelf: 'center',
        borderRadius: 15,
    },
    card: {
        marginTop: 10,
        height: 320,
        width: 330,
        alignSelf: 'center',
    },
    nestedView: {
        // marginRight: 20,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginBottom: 30,
        fontSize: 15,
        color: '#696969',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        width: 350,
        width: "80%",
        alignSelf: 'flex-end',
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 35,
        marginTop: 12,
    },
    touch: () => ({
        //backgroundColor: 'rgba(1,0,0,0)',
        flex: 1,
        elevation: 1,
        width: 350,
        alignSelf: 'center',
        //marginVertical: 20,
        marginBottom: 10,
    }),

})

export default HomeCards;

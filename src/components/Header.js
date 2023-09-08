import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import ServiceCard from '../components/ServiceCard';
import SearchContext from '../../store/SearchContext';
import { servicesCategory } from '../resources/data';
import { ScreenNames } from '../../route/ScreenNames';


const Header = (props) => {
    const { cat, setCat } = useContext(SearchContext);
    const navigation = useNavigation();
    const [isPressed, setIsPressed] = useState(true);
    const [dateViewPressed, setdateViewIsPressed] = useState(false);
    const [placeViewPressed, setplaceViewIsPressed] = useState(false);

    const handlePress = () => {
        if (isPressed == true && dateViewPressed == false && placeViewPressed == false) {
            setIsPressed(!isPressed)
            setdateViewIsPressed(!dateViewPressed)
            setplaceViewIsPressed(false)
        } else if (isPressed == false && dateViewPressed == true && placeViewPressed == false) {
            setIsPressed(false)
            setdateViewIsPressed(!dateViewPressed)
            setplaceViewIsPressed(!placeViewPressed)
        }
        else if (isPressed == false && dateViewPressed == false && placeViewPressed == true) {
            setIsPressed(!isPressed)
            setdateViewIsPressed(false)
            setplaceViewIsPressed(!placeViewPressed)
        }
    };

    const categoryPress = () => {
        setIsPressed(true)
        setdateViewIsPressed(false)
        setplaceViewIsPressed(false)
    }
    const calenderPress = () => {
        setIsPressed(false)
        setdateViewIsPressed(true)
        setplaceViewIsPressed(false)
    }
    const placePress = () => {
        setIsPressed(false)
        setdateViewIsPressed(false)
        setplaceViewIsPressed(true)
    }



    const query = () => {
        return servicesCategory || [];
    }
    const renderCard = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <ServiceCard  {...card} />;
        });
        return cardsArray;
    };
    const searchBar = () => {
        return (
            <View style={[styles.header, isPressed ? styles.header : styles.pressHeader]}>
                <TouchableOpacity onPress={categoryPress}>
                    <Text style={styles.headerText}>ماذا تريد ان تحجز ؟</Text>
                </TouchableOpacity>
                <Pressable
                    style={styles.search}
                    onPress={() => navigation.navigate(ScreenNames.SearchServcies)}
                >
                    <Image style={styles.img} source={require('../assets/search.png')} />
                    <Text style={styles.txt}>بحث الخدمات</Text>
                </Pressable>
                <ScrollView horizontal={true} contentContainerStyle={styles.home} showsHorizontalScrollIndicator={false} >
                    {renderCard()}
                </ScrollView>
                <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التالي</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const calenderRender = () => {
        return (
            <View style={[styles.dateView, dateViewPressed ? styles.dateView : styles.pressDateView]}>
                <TouchableOpacity onPress={calenderPress}>
                    <Text style={styles.headerText}>متى تريد ان تحجز ؟</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التالي</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const placeRender = () => {
        return (
            <View style={[styles.placeView, placeViewPressed ? styles.placeView : styles.pressplaceView]}>

                <TouchableOpacity onPress={placePress}>
                    <Text style={styles.headerText}>أين تريد ان تحجز ؟</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress} style={styles.nextView}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التالي</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            {searchBar()}

            {calenderRender()}

            {placeRender()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width: 350,
        height: 350,
        backgroundColor: 'snow',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8
    },
    pressHeader: {
        width: 350,
        height: 80,
        backgroundColor: 'snow',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 8
    },
    dateView: {
        width: 350,
        height: 350,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10
    },
    pressDateView: {
        width: 350,
        height: 80,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10
    },
    placeView: {
        width: 350,
        height: 350,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
    },
    pressplaceView: {
        width: 350,
        height: 80,
        backgroundColor: 'snow',
        elevation: 5,
        borderRadius: 8,
        margin: 10,
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        alignSelf: 'flex-end'

    },

    search: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: 310,
        fontSize: 18,
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: '#ffff',
        elevation: 5,
        marginBottom: 20,
        marginRight: 15,

    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 7,
    },
    txt: {
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 15,
        color: 'gray'
    },
    nextView: {
        height: 30,
        width: 80,
        borderRadius: 5,
        backgroundColor: '#ffff',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        position: 'absolute',
        bottom: 0,
        right: 0


    }
})
export default Header;

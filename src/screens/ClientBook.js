import React,{useContext} from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import BookingCard from '../../src/components/BookingCard';
import { bookingList } from '../resources/data';
import DataNotExist from '../components/DataNotExist';
import SearchContext from '../../store/SearchContext';


const ClientBook = (props) => {
    const {eventId} = props;
    const {evId,setevId} = useContext(SearchContext);
    const { data } = props?.route.params;

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    //setevId(eventId);
    
    const query = () => {
        
        console.log(evId);
        if (!evId) {
            return BookingCard || [];
        }

        return bookingList.filter(id => {
            return id.eventId == evId ;
        })
    }

    const renderCard = () => {
       
        const data = query();

        if (!data?.length) {
            //TODO : return no data component
            return (
                <DataNotExist />
            );
        }

        const cardsArray = data.map(card => {
            return <BookingCard  {...card} />;
        }); return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerImg}>
                <Pressable onPress={() => props.navigation.navigate(ScreenNames.ClientSearch)}>
                    <Image
                        source={require('../assets/add.png')}
                        style={styles.img}
                    />
                </Pressable>
                <Pressable onPress={onPressHandler}>
                    <Image
                        source={require('../assets/back.png')}
                        style={styles.img}
                    />
                </Pressable>
            </View>
            <View style={styles.vieText}>
                <Text style={styles.title}>{data?.eventName || 'no event'}</Text>

            </View>
            <ScrollView contentContainerStyle={styles.home}>
                {renderCard()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    home: {
        borderRadius: 40,
        backgroundColor: '#87ceeb',
    },
    vieText: {
        alignItems: 'center',
        justifyContent:'center',
        height: 50,
        backgroundColor:'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    img: {
        width: 50,
        height: 50,
        marginLeft: 130,
        marginRight: 130,
        marginTop: 5,

    },
    headerImg: {
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        height: 60,
        backgroundColor: '#87ceeb',
    },

})

export default ClientBook;

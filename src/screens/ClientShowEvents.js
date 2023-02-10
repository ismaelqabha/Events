import React,{useContext} from 'react';
import { View, StyleSheet, Pressable, ScrollView, Image,Text } from 'react-native';
import EventsCard from '../components/EventsCard';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';

const ClientShowEvents = (props) => {
    const { fileEventState} = useContext(SearchContext);
    const onPressHandler = () => {
        props.navigation.goBack();
    }


    const query = () => {
        return fileEventState || [];
    }
    const renderCard = ({item}) => {
        // const data = query();

        // if (!data?.length) {
        //     return (
        //         <DataNotExist />
        //     );
        // }
        // const cardsArray = data.map(card => {
            return <EventsCard  {...item} />;
        // });
        // return cardsArray;
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                    <Pressable onPress={onPressHandler}
                    >
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
            <FlatList
                data={query()}
                renderItem={renderCard}
                numColumns={2}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    }
})

export default ClientShowEvents;

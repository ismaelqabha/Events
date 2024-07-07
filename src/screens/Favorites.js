import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import HomeCards from '../components/HomeCards';
import SearchContext from '../../store/SearchContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFavoritesServiceInfo } from '../resources/API';
import UsersContext from '../../store/UsersContext';

const Favorites = (props) => {
    const context = useContext(SearchContext);
    const { favorites, setFavorites, allServicesFavorites } = context;
    const { userId } = useContext(UsersContext);
    const { fileName, fileId } = props?.route.params;
    const [userFavorates, setUserFavorates] = useState([])

    const onPressHandler = () => {
        props.navigation.goBack();
    }


    const getFavoritesFromApi = () => {
        // console.log("fileId",fileId, "userId",userId);
        getFavoritesServiceInfo({ favoListFileId: fileId, favoListUserId: userId }).then(res => {
            setUserFavorates(res)
            //console.log("UFavorates: ", res.map(i => i.favorateInfo.service_id)); 
            // console.log("userFavorates",res);
        })
    }
    useEffect(() => {
       // getFavoritesFromApi()
        // const data = getServiceDetail()
        //  console.log("data", data);
    }, [])

    const filterFavoritsAccFile = () => {
        return favorites.filter(item => {
           // console.log(item.fileId , fileId);
            return item.fileId === fileId
        })
    }

    const getServiceDetail = () => {
        const myFile = filterFavoritsAccFile()
        //  console.log("myFile", myFile[0]);

        return allServicesFavorites.filter(item =>{
           return myFile[0].favoListServiceId.filter(elem => {
             //console.log(elem , item.serInfo.service_id);
             return elem === item.serInfo.service_id && elem === item.serImages.serviceID
           })
        })
    }

//    console.log("allServicesFavorites", allServicesFavorites[0].serImages);
    //console.log("favorites", favorites);

    const renderCard = () => {
         const data = getServiceDetail()
        //console.log("data", data);
        const cardsArray = data?.map(card => {
            return <HomeCards  {...card.serInfo}
                images={card?.serImages}
            />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}
                    >
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>{fileName}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    {/* {renderCard()} */}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: 20,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 30,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    contentContainerStyle: {
        paddingBottom: 100,
    }
})

export default Favorites;

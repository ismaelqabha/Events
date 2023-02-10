import React, { useState, useContext } from 'react';
import { View, StyleSheet, Pressable, Modal, Image, Text, TextInput } from 'react-native';
import EventsCard from '../components/EventsCard';
import { Events } from '../resources/data';
import { FlatList } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../store/SearchContext';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';


const ClientEvents = (props) => {
    const {isFromAddEventClick} = props.route?.params || {}
    const [showModal, setShowModal] = useState(false);
    const [fileEventName, setfileEventName] = useState();
    const { userId,fileEventState, setfileEventState } = useContext(SearchContext);


    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const onPressModalHandler = () => {
        setShowModal(true);
    }

    const onModalBtnPress = () => {
        const EventFile = {
            EventId: uuidv4(),
            userId: userId,
            eventName: fileEventName,
        }
        let EvArr = fileEventState;
        EvArr.push(EventFile)
        setfileEventState([...EvArr])

        setShowModal(false)
    }
    
    const query = () => {
        return fileEventState || [];
    }
    const renderCard = ({ item }) => {
        return <EventsCard  {...item} isFromAddEventClick={isFromAddEventClick} />;
       
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

            <View style={styles.footer}>
                <Pressable
                    onPress={() => onPressModalHandler()}
                >
                    <Image
                        source={require('../assets/add.png')}
                        style={styles.img}
                    />
                </Pressable>
            </View>
            <Modal
                transparent
                visible={showModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.text}>انشاء مناسبة</Text>
                        </View>
                        <View style={styles.body}>
                            <Text style={styles.text}>اسم المناسبة</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم المناسبة '
                                onChangeText={setfileEventName}
                            //value={fileEventName}
                            //editable={false}
                            />
                        </View>
                        <Pressable onPress={() => onModalBtnPress()} style={styles.btn}>
                            <Text style={styles.text}>OK</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 60,
        height: 60,
    },
    footer: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 20,
    },
    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
    detailModal: {
        width: 320,
        height: 250,
        backgroundColor: '#ffffff',
        borderColor: '#000',
        borderRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Motitle: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        height: 120,
        marginTop: 50,
        alignSelf: 'flex-end',
        marginRight: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    },
    btn: {
        //borderWidth: 1,
        height: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'gray',
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: 200,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        // marginTop: 20,
        marginRight: 10,
        color: 'black',
        backgroundColor: '#fffaf0',
    },
})

export default ClientEvents;

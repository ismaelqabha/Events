import React, { useContext,useEffect,useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView,Modal,TextInput } from 'react-native';
import { fileFavorites } from '../resources/data';
import SearchContext from '../../store/SearchContext';
import FileFavoCard from '../components/FileFavoCard';
import { v4 as uuidv4 } from 'uuid';


const FileFavorites = (props) => {
    const {isFromFavorateClick} = props.route?.params || {}
    const [showModal, setShowModal] = useState(false);
    const [fileFavoriteName, setfileFavoriteName] = useState();
    const { userId ,fileFavoriteState , setFileFavoriteState,ServId, userFavorates, setUserFavorates,ServiceImg } = useContext(SearchContext);
    const  data = userFavorates;

    console.log('screen ' , props.route?.params);

    const onPressModalHandler = () => {
        setShowModal(true);
    }

    const query = () => {
        if (!data.fileId) {
            return fileFavoriteState || [];
        }
        return fileFavoriteState.filter(id => {
            return id.fileFavoUserId == userId;
        })
    }
    const renderFiles = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <FileFavoCard  {...card} isFromFavorateClick={isFromFavorateClick} />;
        }); 
        return cardsArray;
    };

    const onAddFileFavoPress =() => {
        const favFile = {
            fileId: uuidv4(),
            fileName: fileFavoriteName,
            fileImg: ServiceImg,
            fileFavoUserId: userId,
        }

        let favArr = fileFavoriteState;
        favArr.push(favFile)
        setFileFavoriteState([...favArr])

        // const favItem = {
        //     favoListFileId: favFile.fileId,
        //     favoListUserId: userId,
        //     favoListServiceId: ServId, 
        // }

        // let favUserArr = userFavorates;
        // favUserArr.push(favItem)
        // setUserFavorates([...favUserArr])
        setShowModal(false)
    }

    useEffect(()=>{

    } , [fileFavoriteState])

    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.txt}>قوائم الامنيات</Text>
            </View>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.home}>
                    {renderFiles()}
                </ScrollView>
           
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
                            <Text style={styles.text}>انشاء ملف مفضلة</Text>
                        </View>
                        <View style={styles.Mbody}>
                            <Text style={styles.text}>اسم الملف</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم الملف '
                                onChangeText={setfileFavoriteName}
                                //value={fileEventName}
                            //editable={false}
                            />
                        </View>
                        <Pressable onPress={() => onAddFileFavoPress()} style={styles.btn}>
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
    txt: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    header: {
        alignItems: 'flex-end',
        marginTop: 20,
        marginRight: 20,
    },
    body: {
        width: '100%',
        height: 620,
        backgroundColor: 'white',
        marginTop: 20,
    },
    img: {
        width: 65,
        height: 60,

    },
    footer: {
        //alignItems: 'flex-end',
        //marginTop: 20,
        //marginRight: 20,
        //borderWidth:1,
        borderRadius:30,
        width: 64,
        marginLeft: 150,
        marginBottom:10,
        backgroundColor: '#f0f8ff',
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
    Mbody: {
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

export default FileFavorites;

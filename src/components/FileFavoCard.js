import React, { useContext, useState,useEffect } from 'react';
import { View, StyleSheet, Image, Modal, Text, Pressable, TextInput,Alert,ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import { AddNewFavorites, DeleteFileFavorite, RemoveFavorite, UpdateFileFavorite, getFavoritesbyFileId } from '../resources/API';




const FileFavoCard = (props) => {
    const { isFromFavorateClick, fileName, fileImg, fileId } = props;
    const { ServId, userId, userFavorates, setUserFavorates, fileFavoriteState, setFileFavoriteState } = useContext(SearchContext);
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [fileFavoriteName, setfileFavoriteName] = useState();
    const [favoritelistbyFileId, setFavoritelistbyFileId] = useState([]);
    const [serviceId, setServiceId] = useState();
   


    const fileFavoriteIndex = fileFavoriteState?.findIndex(item => item.fileId === fileId)

    const resetStack = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: ScreenNames.ClientHomeAds }
            ]
        })
    }
    const setNewFavoritFromApi = () => {
        const newFavorateItem = { favoListFileId: fileId, favoListUserId: userId, favoListServiceId: ServId }
        AddNewFavorites(newFavorateItem).then(res => {
            const userFav = userFavorates || [];
            userFav.push(newFavorateItem)
            setUserFavorates([...userFav])
        })
        navigation.navigate(ScreenNames.Results)
    }

    const onCaardPress = () => {
        setShowMenu(false)
        if (!isFromFavorateClick) {
            navigation.navigate(ScreenNames.Favorites, { fileName: fileName, fileId: fileId })
            return;
        }
        setNewFavoritFromApi()
        resetStack()
    }

    const whencardLongPress = () => {
        setShowMenu(true)
    }
    const showModalMenu = () => {
        setShowModal(true)
    }

    const getFavoItemfromAPI = () => {
        getFavoritesbyFileId({favoListFileId: fileId}).then(res => {
            setFavoritelistbyFileId(res)
        })
        getServiceID()
    }
    const getServiceID = () => {
        const favoriteData = favoritelistbyFileId || [];
        return favoriteData?.map(item => {
            return setServiceId(item.favoListServiceId)
        }); 
    }
    useEffect(() => {
        getFavoItemfromAPI()
    }, [])
    
    const removeFavoritList = () => {
        RemoveFavorite({ favoListUserId: userId, favoListServiceId: serviceId }).then(res => {
            setUserFavorates(res?.favorates)
        }) 
    }

    const removing = () => {
        DeleteFileFavorite({ fileId: fileId }).then(res => {
                           
            if (res.message === "Delete Sucessfuly") {
                const delData = fileFavoriteState
                const newData = delData?.filter(item => item !== fileId)
                setFileFavoriteState([...newData])
            }
        })
        removeFavoritList()
        setShowModal(false)
        ToastAndroid.showWithGravity('تم اٍلالغاء بنجاح',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
        )
    }

    const letMenuShow = () => {
        return (
            <TouchableOpacity onPress={() => showModalMenu()}>
                <Image source={require('../assets/photos/verticalDots.png')} style={styles.menuSetting} />
            </TouchableOpacity>
        )
    }

    const onDeletePress = () => {
        Alert.alert(
            'تأكيد',
            'هل انت متأكد من الحذف ؟ ',
            [
                {
                    text: 'الغاء الامر',
                    style: 'cancel',
                },
                {
                    text: 'حذف',
                    onPress: () => removing(),
                    style: 'destructive', // Use 'destructive' for a red-colored button
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
        
    }

    const onUpdatePress = () => {
        const editFileInfo = {fileName: fileFavoriteName}
        UpdateFileFavorite(editFileInfo).then(res => {
            const file = fileFavoriteState || [];
            if (fileFavoriteIndex > -1) {
                file[fileFavoriteIndex] = editFileInfo;
            }
            setFileFavoriteState([...file])
        })
        setShowUpdateModal(false)
        setShowModal(false)
    }


    return (
        <View style={styles.container}>
            <Card >
                <TouchableOpacity style={styles.cardHeader}
                    onPress={onCaardPress} onLongPress={whencardLongPress}
                >
                    {showMenu &&
                        <View style={styles.settingView}>
                            {letMenuShow()}
                        </View>
                    }
                    <Card.Image
                        style={styles.image}
                        source={{ uri: fileImg }}
                    />
                    <Card.Title style={{ fontSize: 20, marginLeft: 90 }}>{fileName}</Card.Title>
                </TouchableOpacity>
            </Card>
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
                        <View style={styles.Mbody}>
                            <Pressable onPress={() => onDeletePress()}
                            //style={styles.btn}
                            >
                                <Text style={styles.text}>حذف</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowUpdateModal(true)}
                            //style={styles.btn}
                            >
                                <Text style={styles.text}>تعديل</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                transparent
                visible={showUpdateModal}
                animationType='fade'
                onRequestClose={() =>
                    setShowUpdateModal(false)
                }
            >
                <View style={styles.centeredVieww}>
                    <View style={styles.detailModall}>
                        <View style={styles.body}>

                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم الملف '
                                onChangeText={setfileFavoriteName}
                            />
                        </View>
                        <Pressable onPress={() => onUpdatePress()} style={styles.btn}>
                            <Text style={styles.text}>حفظ</Text>
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
    image: {
        width: 70,
        height: 70,
        borderRadius: 30,
    },
   
    cardHeader: {
        flexDirection: 'row',
    },
    menuSetting: {
        width: 30,
        height: 30,
    },
    settingView: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    detailModal: {
        width: 200,
        height: 80,
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
    Mbody: {
        margin: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        margin: 5
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
    detailModall: {
        width: 300,
        height: 150,
        backgroundColor: '#ffffff',
        //borderColor: '#000',
        borderRadius: 20,
    },
    centeredVieww: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    body: {
        height: 80,
        marginTop: 30,
        alignItems: 'center',
    },

    btn: {
        height: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default FileFavoCard;

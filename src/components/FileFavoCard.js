import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Modal, Text, Pressable, TextInput, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchContext from '../../store/SearchContext';
import { TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../route/ScreenNames';
import { DeleteFileFavorite, UpdateFileFavorite } from '../resources/API';
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { images } from '../assets/photos/images';
import { colors } from '../assets/AppColors';



const FileFavoCard = (props) => {
    const { isFromFavorateClick,
        fileName, fileImg, fileId, favoListServiceId,
        lastSerLogoSelected, serviceId } = props;

    const { favorites, setFavorites } = useContext(SearchContext);
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [fileFavoriteName, setfileFavoriteName] = useState();



    const fileFavoritesIndex = favorites?.findIndex(item => item.fileId === fileId)


    const updateFavorits = () => {
        const favoriteList = favoListServiceId || []
        favoriteList.push(serviceId)

        const newfavoritRecord = {
            fileId: fileId,
            fileImg: lastSerLogoSelected,
            fileName: fileName,
            favoListServiceId: [...favoriteList]
        }

        UpdateFileFavorite(newfavoritRecord).then(res => {
            const file = favorites || [];
            if (fileFavoritesIndex > -1) {
                file[fileFavoritesIndex] = newfavoritRecord;
            }
            setFavorites([...file])
            ToastAndroid.showWithGravity(
                'تم التعديل بنجاح',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );

        })
    }
    const updateFavoName = () => {
        const file = favorites || [];

        const newData = {
            fileId: file[fileFavoritesIndex].fileId,
            fileName: fileFavoriteName,
        }

        UpdateFileFavorite(newData).then(res => {
            if (res.message === 'Updated Sucessfuly') {

                if (fileFavoritesIndex > -1) {
                    file[fileFavoritesIndex] = newData;
                }
                setFavorites([...file])
                setShowUpdateModal(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }

        })

    }

    const resetStack = () => {
        navigation.reset({
            index: 0,
            routes: [
                { name: ScreenNames.ClientHomeAds }
            ]
        })
    }


    const onCaardPress = () => {
        if (!isFromFavorateClick) {
            navigation.navigate(ScreenNames.Favorites, { fileName: fileName, fileId: fileId })
            return;
        }
        updateFavorits()
        resetStack()
    }

    const whencardLongPress = () => {
        setShowMenu(true)
    }

    useEffect(() => {

    }, [])

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
    const removing = () => {

        const DataAfterDel = favorites?.filter(item => item.fileId !== fileId)

        DeleteFileFavorite({ fileId: fileId }).then(res => {

            if (res.message === "Delete Sucessfuly") {
                setFavorites([...DataAfterDel])
                setShowMenu(false)
                ToastAndroid.showWithGravity('تم اٍلالغاء بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
            }
        })


    }



    const moreOperation = () => {
        return (
            <View style={styles.moreChoice}>
                <Pressable style={styles.moreItem} onPress={onDeletePress}
                >
                    <AntDesign
                        name={"delete"}
                        color={colors.silver}
                        size={40} />
                    <Text style={styles.moreTxt}>حذف</Text>
                </Pressable>

                <Pressable style={styles.moreItem} onPress={() => {
                    setShowUpdateModal(true)
                    setShowMenu(false)
                }}>
                    <Feather
                        name={"edit"}
                        color={colors.silver}
                        size={40} />
                    <Text style={styles.moreTxt}>تعديل</Text>
                </Pressable>
            </View>
        )
    }
    const editingModal = () => {
        return (
            <Modal
                transparent
                visible={showMenu}
                animationType='fade'
                onRequestClose={() =>
                    setShowMenu(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Mbody}>
                            {moreOperation()}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    const updtaingModal = () => {
        return (
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
                                placeholder='اسم الملف الجديد'
                                onChangeText={setfileFavoriteName}
                            />
                        </View>
                        <Pressable onPress={() => updateFavoName()}
                            style={styles.btn}>
                            <Text style={styles.text}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        )
    }

    const fileImageSource = (fileImg) => {
        if (fileImg) {
            return { uri: fileImg }
        } else {
            return images.accept
        }
    }


    return (
        <View style={styles.container}>

            <Pressable style={styles.card} onPress={onCaardPress} onLongPress={whencardLongPress}>
                <View style={styles.imgView}>
                    <Image style={styles.image} source={fileImageSource(fileImg)} />
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>{fileName}</Text>
                </View>
                <View style={styles.iconView}>

                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={"black"}
                        size={20} />

                </View>
            </Pressable>
            {editingModal()}
            {updtaingModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        width: '85%',
        height: 70,
        //borderWidth: 1,
        flexDirection: 'row',
    },
    imgView: {
        width: 60,
        height: 60,
        borderWidth: 0.5,
        margin: 5,
        borderRadius: 8,
    },
    titleView: {
        width: 150,
        height: 60,
        // borderWidth: 1,
        margin: 5,
        alignSelf: 'center',
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTxt: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    iconView: {
        width: 60,
        height: 60,
        margin: 5,
        alignSelf: 'flex-end',
        //borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cardHeader: {
        flexDirection: 'row',
    },
    settingView: {
        position: 'absolute',
        top: 0,
        right: 0
    },
    detailModal: {
        width: '95%',
        height: 120,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Mbody: {
        marginVertical: 30
    },
    text: {
        fontSize: 15,
        color: 'black',
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: "90%",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.silver,
        fontSize: 18,
    },
    detailModall: {
        width: '90%',
        height: 150,
        backgroundColor: '#ffffff',
        borderColor: '#000',
        borderRadius: 20,
    },
    centeredVieww: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    body: {
        marginVertical: 40,
        width: '100%',
        alignItems: 'center',
    },

    btn: {
        height: 40,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        alignItems: 'center'

    },
    moreChoice: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        //  borderWidth: 1
    },
    moreItem: {
        // borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center'

    },
    moreTxt: {
        fontSize: 18
    },
})

export default FileFavoCard;

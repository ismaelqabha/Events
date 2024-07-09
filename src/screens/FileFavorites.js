import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView, Modal, TextInput, ToastAndroid } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import SearchContext from '../../store/SearchContext';
import FileFavoCard from '../components/FileFavoCard';
import { AddFileFavorite } from '../resources/API';
import UsersContext from '../../store/UsersContext';
import { colors } from '../assets/AppColors';


const FileFavorites = (props) => {
    const { isFromFavorateClick, lastSerLogoSelected ,serviceId} = props.route?.params || {}
    const [showModal, setShowModal] = useState(false);
    const [fileFavoriteName, setfileFavoriteName] = useState();
    const { userId } = useContext(UsersContext);
    const { favorites, setFavorites } = useContext(SearchContext);

    const onPressModalHandler = () => {
        setShowModal(true);
    }
    const onPressHandler = () => {
        props.navigation.goBack();
    }
    
    useEffect(() => {

    }, [])

    const renderFiles = () => {

        const data = favorites || [];
        const cardsArray = data?.map(card => {
            return <FileFavoCard  {...card} 
            isFromFavorateClick={isFromFavorateClick} 
            lastSerLogoSelected={lastSerLogoSelected} 
            serviceId={serviceId}/>;
        });

        return cardsArray;
    };
    const AddNewFile = () => {
        const newDateCreated = {
            fileName: fileFavoriteName,
            fileFavoUserId: userId
        }

        AddFileFavorite(newDateCreated).then(res => {

            if (res.message === "File Created") {
                setFavorites([...favorites, newDateCreated])
                ToastAndroid.showWithGravity('تم اٍنشاء الملف بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                )
            }
        })
    }

    const onAddFileFavoPress = () => {
        AddNewFile()
        setShowModal(false)
    }
    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <AntDesign
                        style={styles.iconBack}
                        name={"left"}
                        color={"black"}
                        size={20} />
                </Pressable>
                <Text style={styles.txt}>مفضلاتي</Text>
                <Pressable
                    onPress={onPressModalHandler}
                >
                    <Entypo
                        style={styles.icon}
                        name={"plus"}
                        color={"black"}
                        size={30} />
                </Pressable>
            </View>
        )
    }
    const renderAddFileModal = () => {
        return (
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
                            <TextInput
                                style={styles.input}
                                keyboardType='default'
                                placeholder='ادخل اسم الملف '
                                onChangeText={setfileFavoriteName}
                            />
                        </View>
                        <Pressable onPress={onAddFileFavoPress} style={styles.btn}>
                            <Text style={styles.text}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>

            </Modal>
        )
    }



    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.home}>
                    {renderFiles()}
                </ScrollView>

                {renderAddFileModal()}
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    txt: {
        fontSize: 20,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        color: 'black',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    iconBack: {
        marginRight: 40
    },
    icon: {
        marginLeft: 40
    },
    body: {
        width: '100%',
        height: 565,
        marginTop: 20,
    },


    detailModal: {
        width: '90%',
        height: 180,
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
    },
    Mbody: {
        marginVertical: 20,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black'
    },
    btn: {
        height: 40,
        width: '100%',
        position: 'absolute',
        bottom: 0
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
})

export default FileFavorites;

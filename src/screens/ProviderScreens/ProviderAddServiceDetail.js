import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';
import SearchContext from '../../../store/SearchContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ProviderShowServDetailComp from '../../components/ProviderShowServDetailComp';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const ProviderAddServiceDetail = (props) => {
    const { ServId, detailOfServ, setDetailOfServ } = useContext(SearchContext)
    const [showModal, setShowModal] = useState(false);
    const [Dtitle, setDTitle] = useState();

    console.log("ServId", ServId);
    let Did = uuidv4();
    const chickIfExist = () => {
        const isChecked = detailOfServ.find(item => item.detail_Id === Did && item.SDserviceID === ServId)
        return !!isChecked;
    }
    const modalSavePress = () => {
        const AddNewDetail = {
            detail_Id: Did,
            detailTitle: Dtitle,
            SDserviceID: ServId,
        }

        let DetailArr = detailOfServ;
        if (!chickIfExist()) {
            DetailArr.push(AddNewDetail);
            setDetailOfServ([...DetailArr])
        }
        console.log(detailOfServ);
        setShowModal(false);
    }
    const modalDeletePress = () => {
        setShowModal(false);
    }
    const onStartPress = () => {
        setShowModal(true);
    }
    const onBackPress = () => {
        props.navigation.goBack();
    }
    const query = () => {
        return detailOfServ.filter(id => {
            return id.SDserviceID == ServId;
        })
    }
    const renderService = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <ProviderShowServDetailComp  {...card} />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>ما هي الخدمات التي تقدمها ؟</Text>
            </View>
            <View style={styles.Mbody}>
                <TouchableOpacity style={styles.AddButton}
                    onPress={onStartPress}

                >
                    <AntDesign
                        name='plussquareo'
                        style={{ fontSize: 30, alignSelf: 'center', marginRight: 30 }}
                    />
                    <Text style={styles.footText}>انشاء جديد</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.home}>
                    {renderService()}

                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
            </View >
            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.text}>أدخل اسم الخدمة</Text>
                        </View>
                        <View style={styles.body}>
                            <TextInput
                                style={styles.titleInput}
                                keyboardType='default'
                                maxLength={60}
                                onChangeText={(value) => { setDTitle(value) }}
                            />
                        </View>
                        <View style={styles.Modalbtn}>
                            <Pressable onPress={() => modalDeletePress()} >
                                <Text style={styles.text}>الغاء</Text>
                            </Pressable>
                            <Pressable onPress={() => modalSavePress()} >
                                <Text style={styles.text}>حفظ</Text>
                            </Pressable>
                        </View>

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
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    Mbody: {
        height: '75%',
        marginTop: 20,
        alignItems: 'center'
    },

    AddButton: {
        flexDirection: 'row-reverse',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 25,
        marginBottom: 20,
    },
    footText: {
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 130,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    detailModal: {
        width: "100%",
        height: 200,
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
    Motitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    Modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
    },
    titleInput: {
        textAlign: 'right',
        height: 50,
        width: 315,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
    },
})

export default ProviderAddServiceDetail;

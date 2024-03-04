import { StyleSheet, Text, View, ToastAndroid, TextInput, Pressable, Image, ScrollView, Modal } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { updateService } from '../../resources/API';
import { SelectList } from 'react-native-dropdown-select-list';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/AppColors';
import { mandoteryOptions } from "../../resources/data";
import { launchImageLibrary } from 'react-native-image-picker';

const EditServiceDetails = (props) => {
    const { serviceID, detailItem, DetailType, sub_DetailArr, detailIsperson } = props

    const { serviceInfoAccorUser, setServiceInfoAccorUser,
        editServiceDetail, setEditServiceDetail,
        addNewDetail, setAddNewDetail,
         setShowDetailModal } = useContext(ServiceProviderContext);

    const [serviceAdditionalServ, setServiceAdditionalServ] = useState([]);
    const [serviceDetail, setServiceDetail] = useState();
    const [detailType, setDetailType] = useState();
    const [serEditedDescrItem, setSerEditedDescrItem] = useState();
    const [addNewDescrItem, setaddNewDescrItem] = useState();

    const [addNewSubDetItem, setaddNewSubDetItem] = useState();

    const [showSubDetModal, setShowSubDetModal] = useState(false);
    const [perPerson, setPerPerson] = useState();
    const [yesPerPerson, setYesPerPerson] = useState();
    const [noPerPerson, setNoPerPerson] = useState();

    const [subDetailImg, setSubDetailImg] = useState();

    const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)
    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    useEffect(() => {
        if (detailIsperson) {
            setYesPerPerson(true)
            setNoPerPerson(false)
        } else {
            setYesPerPerson(false)
            setNoPerPerson(true)
        }

    }, [])

    const yesIsPerson = () => {
        setYesPerPerson(true)
        setNoPerPerson(false)
        setPerPerson(true)
    }
    const noIsPerson = () => {
        setYesPerPerson(false)
        setNoPerPerson(true)
        setPerPerson(false)
    }
    const renderIsPerPerson = () => {
        return (
            <View style={styles.perPersoneView}>
                <Text style={styles.perPersoneText}>السعر  لهذة الخدمة حسب الشخص ؟</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Pressable style={[noPerPerson ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={noIsPerson}>
                        <Text style={styles.perPersoneText}>لا</Text>
                    </Pressable>

                    <Pressable style={[yesPerPerson ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={yesIsPerson}>
                        <Text style={styles.perPersoneText}>نعم</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const addNewSubDetPress = () => {
        setaddNewSubDetItem(true)
    }
    const subDetEditPress = (item, editSubDetItem, setEditSubDetItem) => {
        setEditSubDetItem(true)
        setShowSubDetModal(false)
    }

    
    const closeModalPress = () => {
        setShowSubDetModal(false)
    }
    const onAddImgPress = async () => {
        try {
            let options = {
                mediaType: 'photo',
                includeBase64: false,
            };

            launchImageLibrary(options, response => GalleryImageResponse(response));
        }
        catch (error) {
            console.error(error);
        }
    };
    const GalleryImageResponse = response => {
        if (response.didCancel) {
            console.log('User Cancelled');
        } else if (response.error) {
            console.log('Gallery Error : ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom Button ', response.customButton);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            SaveImg(imageUri);
        }
    };
    const SaveImg = source => {
        if (source) {
            const newImage = {
                imgId: uuidv4(),
                uri: source,
            };
            setSubDetailImg(newImage);
        } else {
            console.log('Error: Source is not valid.');
        }
    };

    const saveNewSubDet = () => {
        setaddNewSubDetItem(false)
    }
    const updateSubDet = (setEditSubDetItem) => {
        setEditSubDetItem(false)
    }
    const editServiceDetailPress = () => {
        let DType = ''
        if (DetailType == 'Optional') {
            DType = 'خدمة اختيارية'
        } else {
            DType = 'خدمة اجبارية'
        }
        return (
            <View style={styles.itemView}>
                <View style={styles.editDetailView}>
                    <Text style={styles.itemText}>الخدمة</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="default"
                        maxLength={60}
                        placeholder={detailItem}
                        onChangeText={setServiceDetail}
                    />
                    <View style={styles.list}>
                        <SelectList
                            data={mandoteryOptions}
                            setSelected={val => { setDetailType(mandoteryOptions[val].alt) }}
                            placeholder={DType}
                            boxStyles={styles.dropdownDetailType}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View>
                    {renderIsPerPerson()}
                    {/* <Text style={styles.itemText}>تفاصيل الخدمة</Text> */}

                    <View style={styles.subDetailView}>
                        {/* Add new Sub Detail */}
                        {renderAddSubDet()}
                        {/* Render Sub Detail */}
                        {renderSubDetail()}
                    </View>

                    <View style={styles.itemFooter}>
                        <Pressable onPress={updateServiceDetail}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>)
    }
    const renderSubDetail = () => {
        return sub_DetailArr.map(sub => {
            const [editSubDetItem, setEditSubDetItem] = useState();
            return (<ScrollView>
                {editSubDetItem ? <View style={styles.addSubDetView}>
                    <Pressable style={styles.subImg} onPress={onAddImgPress}>
                        {subDetailImg ?
                            <Image
                                source={subDetailImg}
                                style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }}
                            />
                            :
                            <MaterialIcons
                                style={{ alignSelf: 'center' }}
                                name={"add-photo-alternate"}
                                color={'white'}
                                size={100} />}
                    </Pressable>
                    <View style={{ width: '95%', alignSelf: 'center' }}>
                        <TextInput
                            style={styles.titleInput}
                            placeholder={sub.detailSubtitle}
                            keyboardType="default"
                            maxLength={60}
                        // onChangeText={value => {
                        //     setSDTitle(value);
                        // }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Pressable onPress={() => updateSubDet(setEditSubDetItem)}
                            >
                                <Feather
                                    name={'save'}
                                    color={colors.BGScereen}
                                    size={40} />
                            </Pressable>
                            <TextInput
                                style={styles.priceInput}
                                placeholder={sub.detailSubtitleCost}
                                keyboardType="numeric"
                            // onChangeText={value => {
                            //     setSPricetitle(value);
                            // }}
                            />
                        </View>
                    </View>
                </View> :
                    <View style={styles.subDetailItemView}>
                        <Pressable onPress={() => {
                            setShowSubDetModal(true)
                        }}
                        >
                            <Feather
                                name={'more-vertical'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <View>
                                <Text style={styles.itemText}>{sub.detailSubtitle}</Text>
                                <Text style={styles.itemText}>{sub.detailSubtitleCost + ' ₪'}</Text>
                            </View>

                            <View style={styles.subDetailImg}>
                                <Image style={styles.subDetailImg}
                                //source={{ uri: sub.subDetailPhoto.uri }}
                                /></View>
                        </View>
                    </View>
                }
                {subDetModal(sub.detailSubtitle, editSubDetItem, setEditSubDetItem)}
            </ScrollView >)
        })
    }
    const renderAddSubDet = () => {
        return (<View>
            {addNewSubDetItem ? <View style={styles.addSubDetView}>
                <Pressable style={styles.subImg} onPress={onAddImgPress}>
                    {subDetailImg ?
                        <Image
                            source={subDetailImg}
                            style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }}
                        />
                        :
                        <MaterialIcons
                            style={{ alignSelf: 'center' }}
                            name={"add-photo-alternate"}
                            color={'white'}
                            size={100} />}
                </Pressable>
                <View style={{ width: '95%', alignSelf: 'center' }}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder={'ادخل تفاصيل الخدمة'}
                        keyboardType="default"
                        maxLength={60}
                    // onChangeText={value => {
                    //     setSDTitle(value);
                    // }}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Pressable onPress={saveNewSubDet}
                        >
                            <Feather
                                name={'save'}
                                color={colors.BGScereen}
                                size={40} />
                        </Pressable>
                        <TextInput
                            style={styles.priceInput}
                            placeholder={'السعر'}
                            keyboardType="numeric"
                        // onChangeText={value => {
                        //     setSPricetitle(value);
                        // }}
                        />
                    </View>
                </View>
            </View> :
                <Pressable style={styles.addsubDetailView} onPress={addNewSubDetPress}
                >
                    <Text style={styles.itemText}>اضافة جديد</Text>
                    <View style={styles.IconView}>
                        <Entypo
                            name={'plus'}
                            color={colors.puprble}
                            size={25}
                        />
                    </View>
                </Pressable>}


        </View>)
    }
    const subDetModal = (item, editSubDetItem, setEditSubDetItem) => {
        return (
            <Modal
                transparent
                visible={showSubDetModal}
                animationType="slide"
                onRequestClose={() => setShowSubDetModal(false)}>
                <View style={styles.subDetModal}>
                    <View style={styles.bodyModal}>
                        <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                            <Feather
                                name={'more-horizontal'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        <View style={{ justifyContent: 'flex-end', height: '100%' }}>
                            <View style={styles.modalMenu}>
                                <Pressable style={styles.modalItem} onPress={() => subDetEditPress(item, editSubDetItem, setEditSubDetItem)}>
                                    <Feather
                                        name={'edit'}
                                        color={colors.gray}
                                        size={25} />
                                    <Text style={styles.modalHeaderTxt}>تعديل</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem}>
                                    <AntDesign
                                        name={'delete'}
                                        color={colors.gray}
                                        size={25} />
                                    <Text style={styles.modalHeaderTxt}>اِلغاء</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const updateServiceDetail = () => {
        setShowDetailModal(false)
        // const data = serviceInfoAccorUser || [];
        // const selectedServiceDetailItemIndex = data[selectedServiceIndex].additionalServices?.findIndex(item => item.detailTitle === detailItem)
        // const newDetailItem = {
        //     detailTitle: serviceDetail,
        //     necessity: detailType,
        //     isPerPerson: perPerson
        // }
        // setServiceAdditionalServ(element => {
        //     const newDescElement = [...element];
        //     newDescElement[selectedServiceDetailItemIndex] = newDetailItem;
        //     return newDescElement;
        // })
        // const newData = {
        //     service_id: serviceID,
        //     additionalServices: serviceAdditionalServ
        // }
        // updateService(newData).then(res => {
        //     if (selectedServiceIndex > -1) {
        //         data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setServiceInfoAccorUser([...data])
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })

    }

    const editObject = [
        {
            editItem: addNewDetail,
            // editFunction: editBasicInfoPress(),
        },
        {
            editItem: editServiceDetail,
            editFunction: editServiceDetailPress(),
        },

    ]
    const renderSelectedEdit = () => {
        return editObject.map(item => {
            if (item.editItem) {
                return (
                    <View>{item.editFunction}</View>
                )
            }
        })
    }

    return (
        <View>
            {renderSelectedEdit()}
        </View>
    )
}


export default EditServiceDetails

const styles = StyleSheet.create({
    editDetailView: {
        height: '100%',
        backgroundColor: 'lightgray',
        elevation: 5,
        margin: 5,
        alignItems: 'center',
        paddingVertical: 10
    },
    subDetailItemView: {
        width: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subDetailView: {
        borderWidth: 1,
        borderColor: 'white',
        width: '95%',
        borderRadius: 10,
        height: 380
    },
    subDetailImg: {
        width: 80,
        height: 80,
        borderRadius: 30,
        borderWidth: 1
    },
    addsubDetailView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10
    },
    perPersoneView: {
        marginVertical: 20,
        width: '90%',
    },
    itemPersonView: {
        borderWidth: 2,
        borderColor: '#dcdcdc',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 5,
        marginTop: 10
    },
    itemPersonViewPressed: {
        borderWidth: 3,
        borderColor: colors.puprble,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 5,
        marginTop: 10
    },
    perPersoneText: {
        fontSize: 18,
        color: colors.puprble
    },
    itemText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20,
        textAlign: 'right'
    },
    itemView: {
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        //borderWidth: 1
    },

    itemFooter: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1,
        position: 'absolute',
        bottom: 20
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderWidth: 0.6,
        borderRadius: 8,
        borderColor: 'white',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5
    },
    list: {
        width: '90%',
        marginTop: 20
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    },
    dropdownDetailType: {
        height: 50,
        fontSize: 17,
        borderColor: 'white'
    },
    dropstyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.puprble,
        textAlign: 'right'
    },
    addSubDetView: {
        alignSelf: 'center',
        width: '100%',
    },
    subImg: {
        borderWidth: 1,
        borderColor: 'white',
        width: '40%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 10
    },
    titleInput: {
        textAlign: 'right',
        height: 50,
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    priceInput: {
        textAlign: 'right',
        height: 50,
        width: '50%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    subDetModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    bodyModal: {
        width: '100%',
        height: '15%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0
    },
    modalMenu: {
        //borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    modalItem: {
        // borderWidth: 1,
        alignItems: 'center'
    },
    modalHeaderTxt: {
        fontSize: 18
    },
})
import { StyleSheet, Text, View, ToastAndroid, TextInput, Pressable, Image, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { updateService } from '../../resources/API';
import { SelectList } from 'react-native-dropdown-select-list';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../assets/AppColors';
import { hallDetailOptions, mandoteryOptions } from "../../resources/data";
import { launchImageLibrary } from 'react-native-image-picker';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const EditServiceDetails = (props) => {

    const { serviceID, detailItem, DetailType, sub_DetailArr, serviceItemInclude, editProviderServiceItem } = props

    const { serviceInfoAccorUser, setServiceInfoAccorUser,
        editServiceDetail, setEditServiceDetail,
        addNewDetail, setAddNewDetail,
        setShowDetailModal } = useContext(ServiceProviderContext);

    const [serviceDetail, setServiceDetail] = useState(null);
    const [otherDetail, setOtherDetail] = useState();
    const [detailType, setDetailType] = useState();
    const [priceInclude, setPriceInclude] = useState(null);
    const [addNewSubDetItem, setaddNewSubDetItem] = useState();
    const [PerPackage, setPerPackage] = useState(false);
    const [PerPerson, setPerPerson] = useState(false);
    const [PerTable, setPerTable] = useState(false);
    const [showSubDetModal, setShowSubDetModal] = useState(false);
    const [subDetailImg, setSubDetailImg] = useState();
    const [loading, setLoading] = useState(false);

    const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)

    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    const [providerDetail, setProviderDetail] = useState(serviceData[0].additionalServices);

    useEffect(() => {
        if (serviceItemInclude === 'perRequest') {
            setPerPackage(true)
            setPerPerson(false)
            setPerTable(false)
        }
        if (serviceItemInclude === 'perPerson') {
            setPerPackage(false)
            setPerPerson(true)
            setPerTable(false)
        }
        if (serviceItemInclude === 'perTable') {
            setPerPackage(false)
            setPerPerson(false)
            setPerTable(true)
        }
    }, []);

    const handleSave = async (callback) => {
        setLoading(true);
        try {
            await callback();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error while saving:', error);
        }
    };

    const Package = () => {
        setPerPackage(true)
        setPerPerson(false)
        setPerTable(false)
        setPriceInclude('perRequest')
    }

    const Person = () => {
        setPerPackage(false)
        setPerPerson(true)
        setPerTable(false)
        setPriceInclude('perPerson')
    }

    const Table = () => {
        setPerPackage(false)
        setPerPerson(false)
        setPerTable(true)
        setPriceInclude('perTable')
    }

    const renderIncludedType = () => {

        return (
            <View >
                <Text style={styles.perPersoneText}>السعر يشمل </Text>
                <View style={styles.perPersoneView}>
                    <TouchableOpacity style={[PerPackage ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Package}>

                        <MaterialCommunityIcons
                            style={{ alignSelf: 'center' }}
                            name={"all-inclusive"}
                            color={colors.puprble}
                            size={30} />
                        <Text style={styles.perPersoneText}>لكل الحجز</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[PerPerson ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Person}>

                        <Fontisto
                            style={{ alignSelf: 'center' }}
                            name={"person"}
                            color={colors.puprble}
                            size={30} />
                        <Text style={styles.perPersoneText}>للشخص</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[PerTable ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Table}>

                        <MaterialCommunityIcons
                            style={{ alignSelf: 'center' }}
                            name={"table-furniture"}
                            color={colors.puprble}
                            size={30} />
                        <Text style={styles.perPersoneText}>للطاولة</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
        handleSave(() => setaddNewSubDetItem(false));
    }

    const updateSubDet = (setEditSubDetItem) => {
        handleSave(() => setEditSubDetItem(false));
    }

    const addNewServiceDetailPress = () => {
        return (

            <View style={styles.editDetailView}>

                <View style={styles.modalHead}>
                    <TouchableOpacity style={styles.saveBtn} onPress={newServiceDetail}>
                        <Text style={styles.itemText}>حفظ</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.modalPart}>
                    <View style={styles.list}>
                        <SelectList
                            data={hallDetailOptions}
                            setSelected={val => {
                                setServiceDetail(hallDetailOptions[val].value);
                            }}
                            placeholder={'اختيار وصف الخدمة'}
                            boxStyles={styles.dropdownDetailType}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View>

                    {serviceDetail === 'أخرى' &&
                        <TextInput
                            style={styles.titleInput}
                            keyboardType="default"
                            maxLength={60}
                            placeholder={'أدخل اسم الخدمة'}
                            onChangeText={setOtherDetail}
                        />}

                    {/* <View style={styles.list}>
                        <SelectList
                            data={mandoteryOptions}
                            setSelected={val => { setDetailType(mandoteryOptions[val].alt) }}
                            placeholder={'أختر نوع الخدمة'}
                            boxStyles={styles.dropdownDetailType}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View> */}
                </View>

                <View style={styles.modalfooter}>
                    {renderIncludedType()}

                    {/* <Text style={styles.itemText}>أدخل تفاصيل الخدمة </Text>
                    <View style={styles.subDetailView}>
                  
                        {renderAddSubDet()}
                    </View> */}
                </View>
            </View>
        )
    }
    const editServiceDetailPress = () => {
        let DType = DetailType == 'Optional' ? 'خدمة اختيارية' : 'خدمة اجبارية';
        return (
                <View style={styles.editDetailView}>
                    <View style={styles.modalHead}>
                        <TouchableOpacity style={styles.saveBtn} onPress={updateServiceDetail}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalPart}>
                        <View style={styles.list}>
                            <SelectList
                                data={hallDetailOptions}
                                setSelected={val => {
                                    setServiceDetail(hallDetailOptions[val].value);
                                }}
                                placeholder={'اختيار وصف الخدمة'}
                                boxStyles={styles.dropdownDetailType}
                                inputStyles={styles.droptext}
                                dropdownTextStyles={styles.dropstyle}
                            />
                        </View>
                        {serviceDetail === 'أخرى' &&
                        <TextInput
                            style={styles.titleInput}
                            keyboardType="default"
                            maxLength={60}
                            placeholder={'أدخل اسم الخدمة'}
                            onChangeText={setOtherDetail}
                        />}
                       
                        <View style={styles.list}>
                            <SelectList
                                data={mandoteryOptions}
                                setSelected={val => setDetailType(mandoteryOptions[val].alt)}
                                placeholder={DType}
                                boxStyles={styles.dropdownDetailType}
                                inputStyles={styles.droptext}
                                dropdownTextStyles={styles.dropstyle}
                            />
                        </View>
                    </View>
                    <View style={styles.modalfooter}>
                        {renderIncludedType()}
                    </View>

                    {/* <View style={styles.subDetailView}>
                        {renderAddSubDet()}
                        {renderSubDetail()}
                    </View> */}

                    {/* <View style={styles.itemFooter}>
                        {loading ? (
                            <ActivityIndicator size="large" color={colors.puprble} />
                        ) : (
                            <Pressable onPress={() => handleSave(updateServiceDetail)}>
                                <Text style={styles.itemText}>حفظ</Text>
                            </Pressable>
                        )}
                    </View> */}
                </View>
        )
    }



    const renderSubDetail = () => {
        return sub_DetailArr.map(sub => {
            const [editSubDetItem, setEditSubDetItem] = useState();
            return (
                <ScrollView>
                    {editSubDetItem ? (
                        <View style={styles.addSubDetView}>
                            <Pressable style={styles.subImg} onPress={onAddImgPress}>
                                {subDetailImg ? (
                                    <Image source={{ uri: sub.subDetailPhoto.uri }} style={{ width: 100, height: 100, resizeMode: 'stretch', borderRadius: 10 }} />
                                ) : (
                                    <MaterialIcons style={{ alignSelf: 'center' }} name={"add-photo-alternate"} color={'white'} size={100} />
                                )}
                            </Pressable>
                            <View style={{ width: '95%', alignSelf: 'center' }}>
                                <TextInput style={styles.titleInput} placeholder={sub.detailSubtitle} keyboardType="default" maxLength={60} />
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {loading ? (
                                        <ActivityIndicator size="large" color={colors.puprble} />
                                    ) : (
                                        <Pressable onPress={() => updateSubDet(setEditSubDetItem)}>
                                            <Feather name={'save'} color={colors.BGScereen} size={40} />
                                        </Pressable>
                                    )}
                                    <TextInput style={styles.priceInput} placeholder={sub.detailSubtitleCost} keyboardType="numeric" />
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.subDetailItemView}>
                            <Pressable onPress={() => setShowSubDetModal(true)}>
                                <Feather name={'more-vertical'} color={colors.puprble} size={25} />
                            </Pressable>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <View>
                                    <Text style={styles.itemText}>{sub.detailSubtitle}</Text>
                                    <Text style={styles.itemText}>{sub.detailSubtitleCost + ' ₪'}</Text>
                                </View>

                                <View style={styles.subDetailImg}>
                                    <Image style={styles.subDetailImg} source={{ uri: sub.subDetailPhoto.uri }} />
                                </View>
                            </View>
                        </View>
                    )}
                    {subDetModal(sub.detailSubtitle, editSubDetItem, setEditSubDetItem)}
                </ScrollView>
            )
        })
    }
    const renderAddSubDet = () => {
        return (
            <View>
                {addNewSubDetItem ? (
                    <View style={styles.addSubDetView}>
                        <Pressable style={styles.subImg} onPress={onAddImgPress}>
                            {subDetailImg ? (
                                <Image source={subDetailImg} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }} />
                            ) : (
                                <MaterialIcons style={{ alignSelf: 'center' }} name={"add-photo-alternate"} color={'white'} size={100} />
                            )}
                        </Pressable>
                        <View style={{ width: '95%', alignSelf: 'center' }}>
                            <TextInput
                                style={styles.titleInput}
                                placeholder={'ادخل تفاصيل الخدمة'}
                                keyboardType="default"
                                maxLength={60} />

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                {loading ? (
                                    <ActivityIndicator size="large" color={colors.puprble} />
                                ) : (
                                    <Pressable onPress={saveNewSubDet}>
                                        <Feather name={'save'} color={colors.BGScereen} size={40} />
                                    </Pressable>
                                )}
                                <TextInput
                                    style={styles.priceInput}
                                    placeholder={'السعر'}
                                    keyboardType="numeric" />
                            </View>
                        </View>
                    </View>
                ) : (
                    <Pressable style={styles.addsubDetailView} onPress={() => setaddNewSubDetItem(true)}>
                        <Text style={styles.itemText}>اضافة جديد</Text>
                        <View style={styles.IconView}>
                            <Entypo name={'plus'} color={colors.puprble} size={25} />
                        </View>
                    </Pressable>
                )}
            </View>
        )
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
                        <Pressable //onPress={closeModalPress} 
                            style={styles.modalHeader}>
                            <Feather name={'more-horizontal'} color={colors.puprble} size={25} />
                        </Pressable>
                        <View style={{ justifyContent: 'flex-end', height: '100%' }}>
                            <View style={styles.modalMenu}>
                                <Pressable style={styles.modalItem} onPress={() => subDetEditPress(item, editSubDetItem, setEditSubDetItem)}>
                                    <Feather name={'edit'} color={colors.gray} size={25} />
                                    <Text style={styles.modalHeaderTxt}>تعديل</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem}>
                                    <AntDesign name={'delete'} color={colors.gray} size={25} />
                                    <Text style={styles.modalHeaderTxt}>اِلغاء</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    //// update database
    const updateInfo = (infoData) => {
        const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)
        const data = serviceInfoAccorUser || [];

        updateService(infoData).then(res => {

            if (res.message === 'Updated Sucessfuly') {
                if (selectedServiceIndex > -1) {
                    data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...infoData };
                }
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const addNewServiceDet = () => {
        const addNewDItem = {
            detail_Id: uuidv4(),
            detailTitle: serviceDetail,
            necessity: DetailType,
            additionType: priceInclude,
            numberPerTable: '',
            subDetailArray: [],
        }

        const newRecord = providerDetail || []
        newRecord.push(addNewDItem)
        setProviderDetail([...newRecord])

        const newData = {
            service_id: serviceID,
            additionalServices: [...newRecord]
        }

        updateInfo(newData)
    }
    const updateServiceDetail = () => {

    }
    const newServiceDetail = () => {
        if (priceInclude !== null && serviceDetail !== null) {
            addNewServiceDet()
            setShowDetailModal(false);
        } else {

            Alert.alert(
                'تنبية',
                'الرجاء التأكد من ملء جميع الحقول',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );

        }

    }

   



    const editObject = [
        {
            editItem: addNewDetail,
            editFunction: addNewServiceDetailPress(),
        }, {
            editItem: editProviderServiceItem,
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
        paddingVertical: 10
    },
    modalHead: {
        height: '10%',
        justifyContent: 'center'
    },
    modalPart: {
        height: '45%',
        // justifyContent: 'center'
    },
    modalfooter: {
        height: '45%',
        justifyContent: 'flex-end'
    },
    subDetailItemView: {
        //borderWidth: 1,
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
        alignSelf: 'center',
        marginVertical: 10,
        //height: 380
    },
    subDetailImg: {
        width: 80,
        height: 80,
        borderRadius: 30,
        //borderWidth: 1
    },
    addsubDetailView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10
    },
    perPersoneView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.silver,
        elevation: 5,
        marginVertical: 10
    },
    itemPersonView: {
        borderWidth: 2,
        borderColor: '#dcdcdc',
        width: '30%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    itemPersonViewPressed: {
        borderWidth: 3,
        borderColor: colors.puprble,
        width: '30%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        borderRadius: 5,

    },
    perPersoneText: {
        fontSize: 18,
        color: colors.puprble,

    },
    itemText: {
        fontSize: 18,
        color: colors.puprble,

    },


    saveBtn: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: colors.silver,
        elevation: 5,
        marginLeft: 20,
        marginBottom: 20
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: colors.silver,
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginTop: 20
    },
    list: {
        width: '90%',
        marginVertical: 10,
        alignSelf: 'center',
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
        borderColor: colors.silver,
        borderWidth: 2
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
        width: '90%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.silver,
        fontSize: 15,
        color: colors.puprble,
        alignSelf: 'center',
        marginVertical: 10
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
        justifyContent: 'center',

    },
    modalItem: {
        // borderWidth: 1,
        alignItems: 'center'
    },
    modalHeaderTxt: {
        fontSize: 18
    },
})
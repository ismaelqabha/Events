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

    const { serviceID, detailItem, DetailType, sub_DetailArr, serviceItemInclude, editProviderServiceItem, showSubDetail } = props

    const { serviceInfoAccorUser, setServiceInfoAccorUser,
        editServiceDetail, setEditServiceDetail,
        addNewDetail, setAddNewDetail, setShowSubDetailModal,
        setShowDetailModal, detailId } = useContext(ServiceProviderContext);


    const [serviceDetail, setServiceDetail] = useState(null);
    const [otherDetail, setOtherDetail] = useState();
    const [detailType, setDetailType] = useState(DetailType);
    const [priceInclude, setPriceInclude] = useState(null);
    const [noPerTable, setNoPerTable] = useState(null);


    const [serviceDetailUpdated, setServiceDetailUpdated] = useState(detailItem);
    const [otherDetailUpdated, setOtherDetailUpdated] = useState(detailItem);
    const [detailTypeUpdated, setDetailTypeUpdated] = useState(DetailType);
    const [priceIncludeUpdated, setPriceIncludeUpdated] = useState(serviceItemInclude);
    const [noPerTableUpdated, setNoPerTableUpdated] = useState(null);
    const [serSubDetail, setSerSubDetail] = useState(sub_DetailArr);

    const [newSDTitle, setNewSDTitle] = useState(null);
    const [newSDPrice, setNewSDPrice] = useState(null);
    const [subDetailImg, setSubDetailImg] = useState(null);

    const [updatedSDTitle, setUpdatedSDTitle] = useState(null);
    const [updatedSDPrice, setUpdatedSDPrice] = useState(null);


    const [addNewSubDetItem, setaddNewSubDetItem] = useState(false);
    const [PerPackage, setPerPackage] = useState(false);
    const [PerPerson, setPerPerson] = useState(false);
    const [PerTable, setPerTable] = useState(false);
    const [showSubDetModal, setShowSubDetModal] = useState(false);
    const [SDEditAllowed, setSDEditAllowed] = useState(true);
    const [SDEditPress, setSDEditPress] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isOther, setIsOther] = useState(false);

    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    const [providerDetail, setProviderDetail] = useState(serviceData[0].additionalServices);

    const searchDetailInmenu = () => {
        return hallDetailOptions.find(item => item.value === detailItem)
    }

    useEffect(() => {

        const result = searchDetailInmenu()

        if (!result) {
            setServiceDetailUpdated('أخرى')
            setIsOther(true)
        }
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

    const Package = () => {
        setPerPackage(true)
        setPerPerson(false)
        setPerTable(false)
        setPriceInclude('perRequest')
        setPriceIncludeUpdated('perRequest')
    }

    const Person = () => {
        setPerPackage(false)
        setPerPerson(true)
        setPerTable(false)
        setPriceInclude('perPerson')
        setPriceIncludeUpdated('perPerson')
    }

    const Table = () => {
        setPerPackage(false)
        setPerPerson(false)
        setPerTable(true)
        setPriceInclude('perTable')
        setPriceIncludeUpdated('perTable')
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
        addNewSDRecord()
        handleSave(() => setaddNewSubDetItem(false));
    }

    const updateSubDet = (setEditSubDetItem) => {
        handleSave(() => setEditSubDetItem(false));
    }

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
    const checkSaveSDRecord = () => {
        if (newSDTitle !== null && newSDPrice !== null && subDetailImg) {
            addNewSDRecord()
        } else {

            Alert.alert(
                'تنبية',
                ' الرجاء التأكد من ملء جميع الحقول',
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
    const checkAddMoreSDRecord = () => {
        if (newSDTitle !== null && newSDPrice !== null && subDetailImg) {
            saveMoreThanSDRecord()
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
    const saveMoreThanSDRecord = () => {
        const newSubRecord = {
            subDetail_Id: uuidv4(),
            detailSubtitle: newSDTitle,
            detailSubtitleCost: newSDPrice,
            subDetailPhoto: subDetailImg
        }
        const SubDetData = serSubDetail
        // SubDetData.push(newSubRecord)
        setSerSubDetail([...SubDetData])
        setNewSDTitle()
        setNewSDPrice()
        setSubDetailImg(null)
    }
    const addNewSDRecord = () => {
        const findRecord = serSubDetail.find(item => item.detailSubtitle === newSDTitle)

        if (!(!!findRecord)) {
            const newSubRecord = {
                subDetail_Id: uuidv4(),
                detailSubtitle: newSDTitle,
                detailSubtitleCost: newSDPrice,
                subDetailPhoto: subDetailImg
            }
            const SubDetData = serSubDetail
            SubDetData.push(newSubRecord)
            setSerSubDetail([...SubDetData])
        }

        const itemIndex = providerDetail.findIndex(elme => elme.detail_Id === detailId)
        const itemDetail = providerDetail

        if (itemIndex > -1) {
            itemDetail[itemIndex].subDetailArray = serSubDetail
        }
        setProviderDetail(itemDetail[itemIndex]);

        const newData = {
            service_id: serviceID,
            additionalServices: providerDetail
        }
        updateInfo(newData)
    }
    const updateSDRecord = () => {
        setSDEditPress(false)
    }


    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={() => setShowSubDetailModal(false)}>
                    <AntDesign
                        style={styles.icon}
                        name={'left'}
                        color={'black'}
                        size={20}
                    />
                </Pressable>
                <Text style={styles.headerTxt}>التفاصيل</Text>
            </View>
        )
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
                </View>
            </View>
        )
    }
    const editServiceDetailPress = () => {
        let DType = detailTypeUpdated == 'Optional' ? 'خدمة اختيارية' : 'خدمة اجبارية';

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
                            placeholder={serviceDetailUpdated}
                            setSelected={val => {
                                setServiceDetailUpdated(hallDetailOptions[val].value);
                                setIsOther(false)

                                if (hallDetailOptions[val].value === 'أخرى') {
                                    setOtherDetailUpdated()
                                    setIsOther(true)
                                }

                            }}

                            boxStyles={styles.dropdownDetailType}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                    </View>
                    {isOther &&
                        <TextInput
                            style={styles.titleInput}
                            keyboardType="default"
                            maxLength={60}
                            value={otherDetailUpdated}
                            placeholder={'أدخل اسم الخدمة'}
                            onChangeText={val => {
                                setOtherDetailUpdated(val)
                                setServiceDetailUpdated(val)
                            }}
                        />}

                    <View style={styles.list}>
                        <SelectList
                            data={mandoteryOptions}
                            setSelected={val => setDetailTypeUpdated(mandoteryOptions[val].alt)}
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
    const renderServiceSubDetail = () => {

        return (
            <View>
                <View style={{ width: "100%", height: '8%' }}>
                    {header()}
                </View>

                <View style={{ borderWidth: 1, height: '40%' }}>
                    {SDEditPress ? renderEditSubDet() : renderAddSubDet()}
                </View>

                <View style={{ borderWidth: 1, height: '52%' }}>
                    {renderSubDetail()}
                </View>

            </View>
        )
    }

    const renderAddSubDet = () => {
        return (
            <View>
                {addNewSubDetItem ? (
                    <View style={styles.addSubDetView}>
                        <Pressable style={styles.subImg} onPress={onAddImgPress}>
                            {subDetailImg ?
                                <Image source={subDetailImg} style={styles.addImgView} />
                                :
                                <MaterialIcons style={{ alignSelf: 'center' }} name={"add-photo-alternate"} color={colors.silver} size={100} />
                            }
                        </Pressable>
                        <View style={styles.infoDetView}>
                            <TextInput
                                style={styles.titleInput}
                                placeholder={'ادخل تفاصيل الخدمة'}
                                keyboardType="default"
                                maxLength={60}
                                onChangeText={setNewSDTitle} />

                            <View style={styles.addViewR3}>

                                {loading ? (
                                    <ActivityIndicator size="large" color={colors.puprble} />
                                ) : (
                                    <TouchableOpacity onPress={checkSaveSDRecord} style={styles.btnStyle}>
                                        <Text style={styles.btnAddText}>حفظ</Text>
                                        <Feather name={'save'} color={colors.puprble} size={20} />
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={styles.btnStyle} onPress={checkAddMoreSDRecord}>
                                    <Text style={styles.btnAddText}>أضافة المزيد</Text>
                                    <Entypo name={'plus'} color={colors.puprble} size={20} />
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.priceInput}
                                    placeholder={'السعر'}
                                    keyboardType="numeric"
                                    onChangeText={setNewSDPrice} />
                            </View>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.addsubDetailView} onPress={() => {
                        setaddNewSubDetItem(true)
                        setSDEditAllowed(false)
                    }}>
                        <Text style={styles.itemText}>اضافة جديد</Text>
                        <View style={styles.IconView}>
                            <Entypo name={'plus'} color={colors.puprble} size={25} />
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        )
    }
    const renderEditSubDet = () => {
        return (
            <View style={styles.addSubDetView}>
                <Pressable style={styles.subImg} onPress={onAddImgPress}>
                    {subDetailImg ?
                        <Image source={{uri : subDetailImg}} style={styles.addImgView} />
                        :
                        <MaterialIcons style={{ alignSelf: 'center' }} name={"add-photo-alternate"} color={colors.silver} size={100} />
                    }
                </Pressable>

                <View style={styles.infoDetView}>

                    <TextInput
                        style={styles.titleInput}
                        value={updatedSDTitle}
                        keyboardType="default"
                        maxLength={60}
                        onChangeText={val => setUpdatedSDTitle(val)} />

                    <View style={styles.addViewR3}>

                        {loading ? (
                            <ActivityIndicator size="large" color={colors.puprble} />
                        ) : (
                            <TouchableOpacity onPress={updateSDRecord}
                                style={styles.btnStyle}>
                                <Text style={styles.btnAddText}>حفظ</Text>
                                <Feather name={'save'} color={colors.puprble} size={20} />
                            </TouchableOpacity>
                        )}

                        <TextInput
                            style={styles.priceInput}
                            value={updatedSDPrice}
                            keyboardType="numeric"
                            onChangeText={val => setUpdatedSDPrice(val)} />
                    </View>
                </View>
            </View>
        )
    }
    const renderSubDetail = () => {
        return serSubDetail?.map(sub => {
            return (
                <ScrollView>
                    <View style={styles.subDetailItemView}>
                        {SDEditAllowed &&
                            <Pressable onPress={() => subDetEditPress(sub.detailSubtitle, sub.subDetail_Id, sub.subDetailPhoto.uri, sub.detailSubtitleCost)} style={{ width: '10%' }}>
                                <Feather name={'more-vertical'} color={colors.puprble} size={25} />
                            </Pressable>}
                        <View style={styles.subDetPart}>
                            <View>
                                <Text style={styles.itemText}>{sub.detailSubtitle}</Text>
                                <Text style={styles.itemText}>{sub.detailSubtitleCost + ' ₪'}</Text>
                            </View>

                            <View style={styles.subDetImgView}>
                                <Image style={styles.subDetailImg} source={{ uri: sub.subDetailPhoto.uri }} />
                            </View>
                        </View>
                    </View>
                    {subDetModal()}
                </ScrollView>
            )
        })
    }
    const subDetModal = () => {
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
                                <Pressable style={styles.modalItem} onPress={() => {
                                    setSDEditPress(true)
                                    setShowSubDetModal(false)
                                }}>
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

    const subDetEditPress = (itemTitle, itemId, itemImg, itemCost) => {
        console.log(itemTitle, itemId, itemImg, itemCost);
        setUpdatedSDPrice(itemCost)
        setUpdatedSDTitle(itemTitle)
        setSubDetailImg(itemImg)
        setShowSubDetModal(true)
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
        var serDetail
        if (serviceDetail === 'أخرى') {
            serDetail = otherDetail
        } else {
            serDetail = serviceDetail
        }
        const addNewDItem = {
            detail_Id: uuidv4(),
            detailTitle: serDetail,
            necessity: detailType,
            additionType: priceInclude,
            numberPerTable: noPerTable,
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
        const itemIndex = providerDetail.findIndex(elme => elme.detail_Id === detailId)
        const itemDetail = providerDetail

        if (itemIndex > -1) {
            itemDetail[itemIndex].detailTitle = serviceDetailUpdated
            itemDetail[itemIndex].necessity = detailTypeUpdated
            itemDetail[itemIndex].additionType = priceIncludeUpdated
            itemDetail[itemIndex].numberPerTable = noPerTableUpdated
        }

        setProviderDetail(itemDetail[itemIndex]);
        const newData = {
            service_id: serviceID,
            additionalServices: providerDetail
        }
        setShowDetailModal(false);
        updateInfo(newData)
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
        },
        {
            editItem: editProviderServiceItem,
            editFunction: editServiceDetailPress(),
        },
        {
            editItem: showSubDetail,
            editFunction: renderServiceSubDetail(),
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
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
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
        borderWidth: 1,
        width: '95%',
        // height: '100%',
        // padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        // margin: 10
    },
    subDetPart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '90%'
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
    subDetImgView: {
        width: "20%",
        height: "100%",
        marginLeft: 20,
    },
    subDetailImg: {
        width: "100%",
        height: "100%",
        // borderRadius: 30,
    },
    addsubDetailView: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 10,
        alignSelf: 'center',
        // marginRight: 10,
        marginBottom: 20
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
        elevation: 5,
        marginLeft: 10,
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
        backgroundColor: 'white',
        paddingVertical: 10,
        elevation: 2,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    },
    subImg: {
        borderWidth: 3,
        borderColor: colors.silver,
        width: '50%',
        height: '50%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    addImgView: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
        borderRadius: 10
    },
    infoDetView: {
        width: '100%',
        alignSelf: 'center'
    },
    addViewR3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center'
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
        marginVertical: 10,
        paddingRight: 10
    },
    priceInput: {
        textAlign: 'center',
        height: 50,
        width: '30%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.silver,
        fontSize: 15,
        color: colors.puprble,
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    btnStyle: {
        width: '30%',
        height: 50,
        backgroundColor: 'white',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    btnAddText: {
        fontSize: 15,
        color: colors.puprble,
        marginRight: 5
    },
    subDetModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: '#00000099',
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
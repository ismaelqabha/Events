import { StyleSheet, Text, View, TextInput, ToastAndroid, Image, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { colors } from '../../assets/AppColors';
import { Pressable } from 'react-native';
import { getRegions, updateService } from '../../resources/API';
import { SelectList } from 'react-native-dropdown-select-list';
import { hallData, mandoteryOptions, socialMediaList } from "../../resources/data";
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5'
import WebView from "react-native-webview";
import HallTypeCard from '../../components/HallTypeCard';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const EditServiceInfo = (props) => {
    const {
        // editSubTitle,
        // editHallcapasity, editphone, editEmail,
        // editprice, editNumofRequest, editCity, editHallType,
        // editSocialMedia,editDescrItem, editServiceDetail, 
        serviceID, socialItem, descriptionItem,
        detailItem, DetailType, detailIsperson, sub_DetailArr } = props
    const { serviceInfoAccorUser, setServiceInfoAccorUser, socialMediaArray,
        setSocialMediaArray, editTitle, seteditTitle,
        editSubTitle, seteditSubTitle,
        editCity, seteditCity,
        locationEdit, setlocationEdit,
        editHallType, seteditHallType,
        editHallcapasity, seteditHallcapasity,
        editphone, seteditphone,
        editEmail, setEditEmail,
        editSocialMedia, setEditSocialMedia,
        editprice, setEditprice,
        editDescrItem, setEditDescrItem,
        editNumofRequest, setEditNumofRequest,
        editServiceDetail, setEditServiceDetail } = useContext(ServiceProviderContext);

    const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)
    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    const [serviceTitle, setServiceTitle] = useState();
    const [serviceSubTitle, setServiceSubTitle] = useState();
    const [serviceHallCapasity, setServiceHallCapasity] = useState();
    const [servicePhone, setServicePhone] = useState();
    const [serviceEmail, setServiceEmail] = useState();
    const [servicePrice, setServicePrice] = useState();
    const [maxRequest, setMaxRequest] = useState();
    const [serviceRegion, setserviceRegion] = useState();
    const [serviceAddress, setserviceAddress] = useState();
    const [selectHallType, setSelectHallType] = useState();
    const [serviceDescrItem, setServiceDescrItem] = useState();
    const [serviceDescr, setServiceDescr] = useState([]);

    const [serviceAdditionalServ, setServiceAdditionalServ] = useState([]);
    const [serviceDetail, setServiceDetail] = useState();
    const [detailType, setDetailType] = useState();
    const [perPerson, setPerPerson] = useState();
    const [yesPerPerson, setYesPerPerson] = useState();
    const [noPerPerson, setNoPerPerson] = useState();

    //console.log("perPerson", perPerson);

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [address, setAddress] = useState(null)

    const [contactVal, setContactVal] = useState(null)
    const [contactType, setContactType] = useState(null)
    const [webViewVisible, setWebViewVisible] = useState(false);

    const iconColors = {
        facebook: "blue",
        instagram: 'purple',
        tiktok: 'black',
        youtube: 'red'
    }
    const webUri = {
        facebook: "https://www.facebook.com",
        instagram: "https://www.instagram.com",
        tiktok: "https://www.tiktok.com",
        youtube: "https://www.youtube.com"
    };
    const handleLogin = () => {
        setWebViewVisible(true);
    };
    useEffect(() => {
        getRegionsfromApi()
        if (detailIsperson) {
            setYesPerPerson(true)
            setNoPerPerson(false)
        } else {
            setYesPerPerson(false)
            setNoPerPerson(true)
        }
    }, [])

    // region part
    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            res?.message ? showMessage(res.message) : updateData(res?.regions)
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })

    }
    const updateData = (regions) => {
        setRegions(regions)
        const allData = []
        regions?.forEach(region => {
            allData.push(...region?.regionCities)
        });
        allData.sort()
        setRegionData(allData)
    }
    const searchRegion = (val) => {
        if (!regions) {
            return;
        } else {
            regions.forEach((region) => {
                var index = region?.regionCities?.findIndex(city => {
                    return city === val
                })
                if (!(index === -1)) {
                    setAddress(region?.regionName)
                    setserviceRegion(region?.regionName)
                }
            })
        }
    }

    useEffect(() => {

    }, [])

    const editBasicInfoPress = (itemInfo, setState, update) => {
        if(Number.isInteger(itemInfo)){
            itemInfo = itemInfo.toString()
        }
       
        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={update} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.puprble}
                            size={20} />
                    </Pressable>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        //value={itemInfo}
                        placeholder={itemInfo || ''}
                        onChangeText={setState}
                    //(val) => {
                    // console.log("val", val);
                    //setState(val)
                    />

                </View>
            </View>)
    }
    const editAddressPress = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editAddressView}>
                    <Pressable onPress={updateAddress} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.puprble}
                            size={20} />
                    </Pressable>
                    <View>
                        <View style={styles.region}>
                            <Text> {address || serviceData[0].region}</Text>
                        </View>
                        <SelectList
                            data={regionData}
                            setSelected={val => {
                                setserviceAddress(val)
                                searchRegion(val)
                            }}
                            placeholder={serviceAddress || serviceData[0].address}
                            boxStyles={styles.dropdown}
                            inputstyles={styles.droptext}
                            dropdownTextstyles={styles.dropstyle}
                        />
                    </View>
                </View>
            </View>
        )
    }
    const editHallTypePress = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editHallTypeView}>
                    <Pressable onPress={updateHallTypeItem} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.puprble}
                            size={20} />
                    </Pressable>
                    {/* <Text style={styles.itemText}>نوع القاعة</Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 40 }}>
                        {hallData?.map((item) => {
                            return (
                                <HallTypeCard {...item}
                                    isChecked={item.hallType === selectHallType}
                                    onHallTypePress={(value) => setSelectHallType(value)} />
                            )
                        })
                        }
                    </View>
                </View>
            </View>)
    }

    // edit social media
    const updateArray = (data, index) => {
        setSocialMediaArray(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = data;
            return newArray;
        });
    };
    const handleWebViewNavigationStateChange = (newNavState) => {
        // Extract relevant data from the web view's navigation state
        // You can check if the user has logged in and extract profile information here
        console.log("new state ->", newNavState);
    };
    const editSocialMediaPress = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editAddressView}>
                    <SelectList
                        data={socialMediaList}
                        setSelected={val => {
                            setContactType(socialMediaList[val].value)
                            const data = {
                                social: socialMediaList[val].value,
                                link: contactVal,
                            }
                            updateArray(data, index)
                        }}

                        placeholder={contactType || socialItem}
                        boxStyles={styles.dropdown}
                        inputStyles={styles.droptext}
                        dropdownTextStyles={styles.dropstyle}
                    />
                    <View style={styles.socialInput}>
                        <FontAwesome5Brands name={contactType} size={25} style={styles.socialIcon} color={iconColors[contactType]} />
                        <TextInput style={styles.TextInput}
                            keyboardType={'default'}
                            placeholder={'حمل رابط الشبكة'}
                            value={contactVal}
                            onChangeText={(val) => setContactVal(val)}
                            onFocus={() => {
                                handleLogin()
                            }}
                            onEndEditing={(event) => {
                                const text = event.nativeEvent.text
                                const data = {
                                    social: contactType,
                                    link: text,
                                }
                                updateArray(data, index)
                            }}
                        />
                    </View>
                    {webViewVisible && (
                        <WebView
                            source={{ uri: webUri[contactType] }} // Change URL to the social media platform's login page
                            onNavigationStateChange={handleWebViewNavigationStateChange}
                        />
                    )}
                    <View style={styles.itemFooter}>
                        <Pressable onPress={updateSocialMediaItem}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    // edit service datail
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
                    <Text style={styles.itemText}>تفاصيل الخدمة</Text>
                    {/* <ScrollView> */}
                    <View style={styles.subDetailView}>
                        <Pressable style={styles.addsubDetailView} //onPress={addNewDescr}
                        >
                            <Text style={styles.itemText}>اضافة جديد</Text>
                            <View style={styles.IconView}>
                                <Entypo
                                    name={'plus'}
                                    color={colors.puprble}
                                    size={25}
                                />
                            </View>
                        </Pressable>

                        {sub_DetailArr.map(sub => {
                            return (<View style={styles.subDetailItemView}>
                                <Pressable //onPress={() => serviceDetailEditPress(itemDetail.detailTitle)}
                                >
                                    <Feather
                                        name={'more-vertical'}
                                        color={colors.puprble}
                                        size={25} />
                                </Pressable>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <Text style={styles.itemText}>{sub.detailSubtitle}</Text>
                                    <Image style={styles.subDetailImg} source={{ uri: sub.subDetailPhoto.uri }} />
                                </View>
                            </View>)
                        })}

                    </View>
                    {/* </ScrollView> */}
                    <View style={styles.itemFooter}>
                        <Pressable onPress={updateServiceDetail}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>)
    }

    // Update functions
    const updateTitle = () => {
        const newData = {
            service_id: serviceID,
            title: serviceTitle
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditTitle(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateSubTitle = () => {
        const newData = {
            service_id: serviceID,
            subTitle: serviceSubTitle
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditSubTitle(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateHallCapasity = () => {
        const newData = {
            service_id: serviceID,
            maxCapasity: serviceHallCapasity
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditHallcapasity(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updatePhone = () => {
        const newData = {
            service_id: serviceID,
            servicePhone: servicePhone
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditphone(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateEmail = () => {
        const newData = {
            service_id: serviceID,
            serviceEmail: serviceEmail
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                setEditEmail(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updatePrice = () => {
        const newData = {
            service_id: serviceID,
            servicePrice: servicePrice
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                setEditprice(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateMaxRequest = () => {
        const newData = {
            service_id: serviceID,
            numRecivedRequest: maxRequest
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                setEditNumofRequest(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateAddress = () => {
        const newData = {
            service_id: serviceID,
            region: serviceRegion,
            address: serviceAddress
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditCity(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateSocialMediaItem = () => {
        const newData = {
            service_id: serviceID,
            socialMedia: socialMediaArray
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateHallTypeItem = () => {
        const newData = {
            service_id: serviceID,
            hallType: selectHallType
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                seteditHallType(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateServiceDescrItem = () => {
        const data = serviceInfoAccorUser || [];
        const selectedServiceDescrItemIndex = data[selectedServiceIndex].desc?.findIndex(item => item.descItem === descriptionItem)
        const newDescItem = {
            descItem: serviceDescrItem
        }
        setServiceDescr(element => {
            const newDescElement = [...element];
            newDescElement[selectedServiceDescrItemIndex] = newDescItem;
            return newDescElement;
        })
        const newData = {
            service_id: serviceID,
            desc: serviceDescr
        }
        updateService(newData).then(res => {
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateServiceDetail = () => {
        const data = serviceInfoAccorUser || [];
        const selectedServiceDetailItemIndex = data[selectedServiceIndex].additionalServices?.findIndex(item => item.detailTitle === detailItem)
        const newDetailItem = {
            detailTitle: serviceDetail,
            necessity: detailType,
            isPerPerson: perPerson
        }
        setServiceAdditionalServ(element => {
            const newDescElement = [...element];
            newDescElement[selectedServiceDetailItemIndex] = newDetailItem;
            return newDescElement;
        })
        const newData = {
            service_id: serviceID,
            additionalServices: serviceAdditionalServ
        }
        updateService(newData).then(res => {
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }


    // const editObject = [
    //     {
    //          editItem: editTitle,
    //          label: 'اسم المصلحة',
    //          editFunction: editBasicInfoPress(editObject[0].label, serviceData[0].title, setServiceTitle, updateTitle(editObject.updateElements)),
    //          updateElements : {
    //             service_id: serviceID,
    //             title: serviceTitle
    //          }
    //     }
    // ]
    const renderSelectedEdit = () => {
        //     if (editObject.editItem) {
        //         return (
        //             <View>{editObject.editFunction}</View>
        //         )
        //     }
        if (editTitle) {
            return (
                <View>{editBasicInfoPress(serviceData[0].title, setServiceTitle, updateTitle)}</View>
            )
        }
        if (editSubTitle) {
            return (
                <View>{editBasicInfoPress(serviceData[0].subTitle, setServiceSubTitle, updateSubTitle)}</View>
            )
        }
        if (editphone) {
            return (
                <View>{editBasicInfoPress(serviceData[0].servicePhone, setServicePhone, updatePhone)}</View>
            )
        }
        if (editEmail) {
            return (
                <View>{editBasicInfoPress(serviceData[0].serviceEmail, setServiceEmail, updateEmail)}</View>
            )
        }
        if (editprice) {
            return (
                <View>{editBasicInfoPress(serviceData[0].servicePrice, setServicePrice, updatePrice)}</View>
            )
        }
        if (editNumofRequest) {
            return (
                <View>{editBasicInfoPress(serviceData[0].numRecivedRequest, setMaxRequest, updateMaxRequest)}</View>
            )
        }
        if (editHallcapasity) {
            return (
                <View>{editBasicInfoPress(serviceData[0].maxCapasity, setServiceHallCapasity, updateHallCapasity)}</View>
            )
        }

        if (editCity) {
            return (
                <View>{editAddressPress()}</View>
            )
        }
        if (editHallType) {
            return (
                <View>{editHallTypePress()}</View >
            )
        }
        if (editSocialMedia) {
            return (
                <View>{editSocialMediaPress()}</View>
            )
        }
        if (editDescrItem) {
            let label = 'الوصف'
            return (
                <View>{editBasicInfoPress(label, descriptionItem, setServiceDescrItem, updateServiceDescrItem)}</View>
            )
        }
        if (editServiceDetail) {
            return (
                <View>{editServiceDetailPress()}</View>
            )
        }
        return null
    }

    return (
        <View style={styles.container}>
            {renderSelectedEdit()}
        </View>
    )
}

export default EditServiceInfo

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    itemView: {
        width: '100%',
        // height: '90%',
        marginTop: 20,
        justifyContent: 'center',
        //borderWidth: 1
    },
    // itemText: {
    //     fontSize: 18,
    //     color: colors.puprble,
    //     marginRight: 20
    // },
    itemFooter: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editTitleView: {
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    editAddressView: {
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    region: {
        height: 50,
        width: '90%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        maxWidth: '90%',
        minWidth: '90%',
        fontSize: 17,
        borderColor: 'white',
        alignSelf: 'center',
    },
    dropdownDetailType: {
        height: 50,
        // maxWidth: '70%',
        // minWidth: '70%',
        fontSize: 17,
        borderColor: 'white'
    },
    dropstyle: {
        textAlign: 'left',
        //color: colors.darkGold,
        fontWeight: 'bold',
        fontSize: 20,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.darkGold,
        textAlign: 'right'
    },
    socialInput: {
        borderWidth: 1,
        width: "95%",
        textAlign: 'right',
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        fontSize: 18,
        marginVertical: 20,
        flexDirection: 'row'
    },
    socialIcon: {
        alignSelf: 'center',
        marginLeft: 10
    },
    TextInput: {
        flex: 1,
        fontSize: 20,
        textAlign: 'right',
    },
    editHallTypeView: {
        backgroundColor: 'lightgray',
        alignSelf: 'center',
    },
    editDetailView: {
        height: '100%',
        backgroundColor: 'lightgray',
        elevation: 5,
        margin: 5,
        alignItems: 'center',
        paddingVertical: 10
    },
    list: {
        width: '90%',
        marginTop: 20
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
        // height: 100
    },
    subDetailImg: {
        width: 80,
        height: 80,
        borderRadius: 30
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
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
    },
})
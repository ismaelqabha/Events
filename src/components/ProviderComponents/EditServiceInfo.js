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
        serviceID, socialItem, socialLink, socialIndex,
        descriptionItem, editDescrItem, setEditDescrItem,
        editSocialMedia,setEditSocialMedia } = props

    const { serviceInfoAccorUser, setServiceInfoAccorUser, socialMediaArray,
        setSocialMediaArray, editTitle, seteditTitle,
        editSubTitle, seteditSubTitle,
        editCity, seteditCity,
        locationEdit, setlocationEdit,
        editHallType, seteditHallType,
        editHallcapasity, seteditHallcapasity,
        editphone, seteditphone,
        editEmail, setEditEmail,
        editprice, setEditprice,
        addNewDesc, setAddNewDesc,
        editNumofRequest, setEditNumofRequest,
        addSocilMedia, setAddSocilMedia } = useContext(ServiceProviderContext);

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
    const [serEditedDescrItem, setSerEditedDescrItem] = useState();
    const [addNewDescrItem, setaddNewDescrItem] = useState();
    const [serviceDescr, setServiceDescr] = useState([]);


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
      
    }, [])

    const editBasicInfoPress = (itemInfo, setState, update) => {
        if (Number.isInteger(itemInfo)) {
            itemInfo = itemInfo.toString()
        }

        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={update} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
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
                            color={colors.BGScereen}
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
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
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
                    <Pressable onPress={updateSocialMediaItem} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <View style={{width: '85%', marginRight: 10}}>
                        <Text style={styles.editSocialtxt}>{socialItem}</Text>
                        <View style={styles.socialInput}>
                            <FontAwesome5Brands name={contactType} size={25} style={styles.socialIcon} color={iconColors[contactType]} />
                            <TextInput
                                style={styles.TextInput}
                                keyboardType={'default'}
                                placeholder={socialLink}
                                index= {socialIndex}
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
                    </View>
                </View>
            </View>
        )
    }
    const addingSocialMediaPress = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editAddressView}>
                    <Pressable style={styles.itemFooter} onPress={addNewSocialMediaItem} 
                    >
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <View>
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

                            placeholder={'اختر الشبكة الاجتماعية'}
                            boxStyles={styles.dropdown}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                        <View style={styles.socialInput}>
                            <FontAwesome5Brands name={contactType} size={25} style={styles.socialIcon} color={iconColors[contactType]} />
                            <TextInput
                                style={styles.TextInput}
                                keyboardType={'default'}
                                placeholder={"حمل الرابط"}
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
                    </View>
                </View>
            </View>
        )
    }

    // Add description part
    const addNewDescItemPress = () => {
        // if (Number.isInteger(itemInfo)) {
        //     itemInfo = itemInfo.toString()
        // }

        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={addNewDescItem} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        //value={itemInfo}
                        placeholder={'اضافة وصف جديد'}
                        onChangeText={setaddNewDescrItem}
                    //(val) => {
                    // console.log("val", val);
                    //setState(val)
                    />

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
        setEditSocialMedia(false)
        // const newData = {
        //     service_id: serviceID,
        //     socialMedia: socialMediaArray
        // }
        // updateService(newData).then(res => {
        //     const data = serviceInfoAccorUser || [];
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
    const addNewSocialMediaItem = () => {
        setAddSocilMedia(false)
        // const newData = {
        //     service_id: serviceID,
        //     socialMedia: socialMediaArray
        // }
        // updateService(newData).then(res => {
        //     const data = serviceInfoAccorUser || [];
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
        setEditDescrItem(false)
        // const data = serviceInfoAccorUser || [];
        // const selectedServiceDescrItemIndex = data[selectedServiceIndex].desc?.findIndex(item => item.descItem === descriptionItem)
        // const newDescItem = {
        //     descItem: serviceDescrItem
        // }
        // setServiceDescr(element => {
        //     const newDescElement = [...element];
        //     newDescElement[selectedServiceDescrItemIndex] = newDescItem;
        //     return newDescElement;
        // })
        // const newData = {
        //     service_id: serviceID,
        //     desc: serviceDescr
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
    const addNewDescItem = () => {
        setAddNewDesc(false)
        // const newData = {
        //     service_id: serviceID,
        //     socialMedia: socialMediaArray
        // }
        // updateService(newData).then(res => {
        //     const data = serviceInfoAccorUser || [];
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
            editItem: editTitle,
            editFunction: editBasicInfoPress(serviceData[0].title, setServiceTitle, updateTitle),
        },
        {
            editItem: editSubTitle,
            editFunction: editBasicInfoPress(serviceData[0].subTitle, setServiceSubTitle, updateSubTitle),
        },
        {
            editItem: editEmail,
            editFunction: editBasicInfoPress(serviceData[0].serviceEmail, setServiceEmail, updateEmail),
        },
        {
            editItem: editphone,
            editFunction: editBasicInfoPress(serviceData[0].servicePhone, setServicePhone, updatePhone),
        },
        {
            editItem: editprice,
            editFunction: editBasicInfoPress(serviceData[0].servicePrice, setServicePrice, updatePrice),
        },
        {
            editItem: editNumofRequest,
            editFunction: editBasicInfoPress(serviceData[0].numRecivedRequest, setMaxRequest, updateMaxRequest),
        },
        {
            editItem: editHallcapasity,
            editFunction: editBasicInfoPress(serviceData[0].maxCapasity, setServiceHallCapasity, updateHallCapasity),
        },
        {
            editItem: editCity,
            editFunction: editAddressPress(),
        },
        {
            editItem: editHallType,
            editFunction: editHallTypePress(),
        },
        {
            editItem: editSocialMedia,
            editFunction: editSocialMediaPress(),
        },
        {
            editItem: addSocilMedia,
            editFunction: addingSocialMediaPress(),
        },
        {
            editItem: editDescrItem,
            editFunction: editBasicInfoPress(descriptionItem, setSerEditedDescrItem, updateServiceDescrItem),
        },
        {
            editItem: addNewDesc,
            editFunction: addNewDescItemPress(),
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
        marginTop: 20,
        justifyContent: 'center',
        //borderWidth: 1
    },
    
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
        borderWidth: 1,
        borderColor: colors.BGScereen,
        borderRadius: 10
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
    socialInput: {
        borderWidth: 1,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'white',
        fontSize: 15,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    editSocialtxt:{
       textAlign:'center',
       fontSize: 18,
       color : colors.puprble
    },
    socialIcon: {
        alignSelf: 'center',
        marginLeft: 10
    },
    TextInput: {
        fontSize: 15,
        width: "50%",
    },
    editHallTypeView: {
        backgroundColor: 'lightgray',
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
})
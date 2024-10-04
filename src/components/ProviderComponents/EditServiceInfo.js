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
        serviceID, socialItem, socialLink,
        descriptionItem, editDescrItem, setEditDescrItem,
        editSocialMedia, setEditSocialMedia } = props

    const { serviceInfoAccorUser, setServiceInfoAccorUser,
        editTitle, seteditTitle,
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




    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    const [serviceTitle, setServiceTitle] = useState(serviceData[0].title);
    const [serviceSubTitle, setServiceSubTitle] = useState(serviceData[0].subTitle);
    const [serviceHallCapasity, setServiceHallCapasity] = useState(serviceData[0].maxCapasity);
    const [servicePhone, setServicePhone] = useState(serviceData[0].servicePhone);
    const [serviceEmail, setServiceEmail] = useState(serviceData[0].serviceEmail);
    const [servicePrice, setServicePrice] = useState(serviceData[0].servicePrice);
    const [maxRequest, setMaxRequest] = useState(serviceData[0].maxNumberOFRequest);
    const [serviceSocialMedia, setServiceSocialMedia] = useState(serviceData[0].socialMedia)
    const [selectHallType, setSelectHallType] = useState(serviceData[0].hallType);
    const [serviceAddress, setserviceAddress] = useState(serviceData[0].address);
    const [serviceRegion, setserviceRegion] = useState();

    const [serEditedDescrItem, setSerEditedDescrItem] = useState(descriptionItem);
    const [addNewDescrItem, setaddNewDescrItem] = useState();
    const [serviceDescr, setServiceDescr] = useState(serviceData[0].desc);

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [address, setAddress] = useState(null)

    const [socialMediaLinkItem, setSocialMediaLinkItem] = useState(socialLink)
    const [socailMediaItem, setSocailMediaItem] = useState()
    const [webViewVisible, setWebViewVisible] = useState(false);

    setTimeout(() => {
        setServiceDescr(serviceData[0].desc)
    }, 2000)

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

    const editBasicInfoPress = (itemInfo, state, setState, update) => {
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
                        value={state}
                        // placeholder={itemInfo || ''}
                        onChangeText={(text) => setState(text)}
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
    const addNewRecordSM = (data) => {
        let newSMitemIndex = serviceSocialMedia.length

        setServiceSocialMedia(prevArray => {
            const newArray = [...prevArray];
            newArray[newSMitemIndex] = { ...newArray[newSMitemIndex], ...data };
            //console.log("newArray", newArray);
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
                    <View style={{ width: '85%', marginRight: 10 }}>
                        <Text style={styles.editSocialtxt}>{socialItem}</Text>
                        <View style={styles.socialInput}>
                            <FontAwesome5Brands name={socailMediaItem} size={25} style={styles.socialIcon} color={iconColors[socailMediaItem]} />
                            <TextInput
                                style={styles.TextInput}
                                keyboardType={'default'}
                                placeholder={socialLink}
                                value={socialMediaLinkItem}
                                onChangeText={setSocialMediaLinkItem}
                            // onFocus={() => {
                            //     handleLogin()
                            // }}
                            />
                        </View>
                        {webViewVisible && (
                            <WebView
                                source={{ uri: webUri[socailMediaItem] }} // Change URL to the social media platform's login page
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
                    <Pressable style={styles.itemFooter} onPress={addNewSocialMediaItem}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <View>
                        <SelectList
                            data={socialMediaList}
                            setSelected={val => {
                                setSocailMediaItem(socialMediaList[val].value)
                                // const data = {
                                //     social: socialMediaList[val].value,
                                //     link: socialMediaLinkItem,
                                // }
                                //  addNewRecordSM(data)
                            }}

                            placeholder={'اختر الشبكة الاجتماعية'}
                            boxStyles={styles.dropdown}
                            inputStyles={styles.droptext}
                            dropdownTextStyles={styles.dropstyle}
                        />
                        <View style={styles.socialInput}>
                            <FontAwesome5Brands name={socailMediaItem} size={25} style={styles.socialIcon} color={iconColors[socailMediaItem]} />
                            <TextInput
                                style={styles.TextInput}
                                keyboardType={'default'}
                                placeholder={"حمل الرابط"}
                                value={socialMediaLinkItem}
                                onChangeText={setSocialMediaLinkItem}
                            // onFocus={() => {
                            //     handleLogin()
                            // }}
                            // onEndEditing={(event) => {
                            //     const text = event.nativeEvent.text
                            //     const data = {
                            //         social: socailMediaItem,
                            //         link: socialMediaLinkItem,
                            //     }
                            //     addNewRecordSM(data)
                            // }}
                            />
                        </View>
                        {webViewVisible && (
                            <WebView
                                source={{ uri: webUri[socailMediaItem] }} // Change URL to the social media platform's login page
                                onNavigationStateChange={handleWebViewNavigationStateChange}
                            />
                        )}
                    </View>
                </View>
            </View>
        )
    }

    // Add description part
    const addNewRecordDesc = (data) => {
        let newDescitemIndex = serviceDescr.length

        setServiceDescr(prevArray => {
            const newArray = [...prevArray];
            newArray[newDescitemIndex] = { ...newArray[newDescitemIndex], ...data };
            return newArray;
        });

    };
    const addNewDescItemPress = () => {
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
                        placeholder={'اضافة وصف جديد'}
                        value={addNewDescrItem}
                        onChangeText={setaddNewDescrItem}
                    // onEndEditing={val => {
                    //     const text = val.nativeEvent.text
                    //     const data = {
                    //         descItem: addNewDescrItem,
                    //     }
                    //     addNewRecordDesc(data)
                    // }}
                    />

                </View>
            </View>)
    }

    // Update functions
    const updateInfo = (infoData, setstate) => {
        const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)
        const data = serviceInfoAccorUser || [];
        setstate(false)
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
    const updateTitle = () => {
        const newData = {
            service_id: serviceID,
            title: serviceTitle
        }
        updateInfo(newData, seteditTitle)
    }
    const updateSubTitle = () => {
        const newData = {
            service_id: serviceID,
            subTitle: serviceSubTitle
        }
        updateInfo(newData, seteditSubTitle)

    }
    const updateHallCapasity = () => {
        const newData = {
            service_id: serviceID,
            maxCapasity: serviceHallCapasity
        }
        updateInfo(newData, seteditHallcapasity)
    }
    const updatePhone = () => {
        const newData = {
            service_id: serviceID,
            servicePhone: servicePhone
        }
        updateInfo(newData, seteditphone)
    }
    const updateEmail = () => {
        const newData = {
            service_id: serviceID,
            serviceEmail: serviceEmail
        }
        updateInfo(newData, setEditEmail)
    }
    const updatePrice = () => {
        const newData = {
            service_id: serviceID,
            servicePrice: servicePrice
        }
        updateInfo(newData, setEditprice)

    }
    const updateMaxRequest = () => {
        const newData = {
            service_id: serviceID,
            maxNumberOFRequest: maxRequest
        }
        updateInfo(newData, setEditNumofRequest)
    }
    const updateAddress = () => {
        const newData = {
            service_id: serviceID,
            region: serviceRegion,
            address: serviceAddress
        }
        updateInfo(newData, seteditCity)

    }
    const updateSocialMediaItem = () => {

        const SMitemIndex = serviceSocialMedia?.findIndex(elme => elme.social === socialItem)
        const SM = serviceSocialMedia
        if (SMitemIndex > -1) {
            SM[SMitemIndex].link = socialMediaLinkItem
        }
        setServiceSocialMedia(SM[SMitemIndex]);

        const newData = {
            service_id: serviceID,
            socialMedia: serviceSocialMedia
        }
        updateInfo(newData, setEditSocialMedia)
    }
    const updateHallTypeItem = () => {
        const newData = {
            service_id: serviceID,
            hallType: selectHallType
        }
        updateInfo(newData, seteditHallType)
    }
    const updateServiceDescrItem = () => {
        const itemIndex = serviceDescr.findIndex(elme => elme.descItem === descriptionItem)
        const itemDesc = serviceDescr
        if (itemIndex > -1) {
            itemDesc[itemIndex].descItem = serEditedDescrItem
        }
        setServiceDescr(itemDesc[itemIndex]);

        const newData = {
            service_id: serviceID,
            desc: serviceDescr
        }

        updateInfo(newData, setEditDescrItem)

    }

    const addNewDescItem = () => {
        const addNewDItem = {
            descItem: addNewDescrItem
        }
        const newRecord = serviceDescr || []
        newRecord.push(addNewDItem)

        setServiceDescr([...newRecord])

        const newData = {
            service_id: serviceID,
            desc: [...newRecord]
        }

        updateInfo(newData, setAddNewDesc)
    }

    const addNewSocialMediaItem = () => {

        const addNewSMedia = {
            social: socailMediaItem,
            link: socialMediaLinkItem,
        }
        const newRecord = serviceSocialMedia || []
        newRecord.push(addNewSMedia)
        setServiceSocialMedia([...newRecord])

        const newData = {
            service_id: serviceID,
            socialMedia: [...newRecord]
        }

        updateInfo(newData, setAddSocilMedia)
    }


    const editObject = [
        {
            editItem: editTitle,
            editFunction: editBasicInfoPress(serviceData[0].title, serviceTitle, setServiceTitle, updateTitle),
        },
        {
            editItem: editSubTitle,
            editFunction: editBasicInfoPress(serviceData[0].subTitle, serviceSubTitle, setServiceSubTitle, updateSubTitle),
        },
        {
            editItem: editEmail,
            editFunction: editBasicInfoPress(serviceData[0].serviceEmail, serviceEmail, setServiceEmail, updateEmail),
        },
        {
            editItem: editphone,
            editFunction: editBasicInfoPress(serviceData[0].servicePhone, servicePhone, setServicePhone, updatePhone),
        },
        {
            editItem: editprice,
            editFunction: editBasicInfoPress(serviceData[0].servicePrice, servicePrice, setServicePrice, updatePrice),
        },
        {
            editItem: editNumofRequest,
            editFunction: editBasicInfoPress(serviceData[0].numRecivedRequest, maxRequest, setMaxRequest, updateMaxRequest),
        },
        {
            editItem: editHallcapasity,
            editFunction: editBasicInfoPress(serviceData[0].maxCapasity, serviceHallCapasity, setServiceHallCapasity, updateHallCapasity),
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
            editFunction: editBasicInfoPress(descriptionItem, serEditedDescrItem, setSerEditedDescrItem, updateServiceDescrItem),
        },
        {
            editItem: addNewDesc,
            editFunction: addNewDescItemPress(),
        },

    ]

    const renderSelectedEdit = () => {
        return editObject
            .filter(item => item.editItem)
            .map(item => {
                return <View key={item.editItem}>{item.editFunction}</View>;
            });
    };

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
    editSocialtxt: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.puprble
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
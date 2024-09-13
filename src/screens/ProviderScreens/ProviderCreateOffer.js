import { StyleSheet, Text, View, Pressable, TextInput, Image, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import SearchContext from '../../../store/SearchContext';
import UsersContext from '../../../store/UsersContext';
import { createNewOffer, getCampaignsByServiceId, getRegions } from '../../resources/API';
import DateTimePicker from '@react-native-community/datetimepicker';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { ScreenNames } from '../../../route/ScreenNames';
import moment from 'moment';

const ProviderCreateOffer = (props) => {
    const { isFirst, serviceCat, Region } = props.route?.params || {}
    const { campInfo, setCampInfo } = useContext(SearchContext);
    const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
    const { userId } = useContext(UsersContext);

    const [PerPackage, setPerPackage] = useState(false);
    const [PerPerson, setPerPerson] = useState(false);
    const [PerTable, setPerTable] = useState(false);

    const [isPriceperPersone, setIsPriceperPersone] = useState(false);

    const [OfferImageError, setOfferImageError] = useState(false)
    const [OfferTitleError, setOfferTitleError] = useState(false)
    const [OfferPriceError, setOOfferPriceError] = useState(false)
    const [OfferExpireDateError, setOfferExpireDateError] = useState(false)
    const [OfferPriIncludError, setOfferPriIncludError] = useState(false)
    const [OfferRegionError, setOfferRegionError] = useState(false)
    const [OfferContentError, setOfferContentError] = useState(false)

    const [OfferTitle, setOfferTitle] = useState(null)
    const [OfferPrice, setOfferPrice] = useState(null)
    const [OfferExpireDate, setOfferExpireDate] = useState(null)
    const [OfferContent, setOfferContent] = useState([])
    const [subDetContent, setSubDetContent] = useState([])
    const [OfferWorkingRegion, setOfferWorkingRegion] = useState([])
    const [offerImg, setOfferImg] = useState(null)
    const [priceInclude, setPriceInclude] = useState()

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [Region1, SetRegion] = useState([])

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    const today = moment(date, "YYYY-MM-DD")
    let day = today.format('D')
    let month = today.format('M')
    let year = today.format('YYYY')
    let completeDate = year + '-' + month + '-' + day

    useEffect(() => {
        getCampignsfromApi()
        getRegionsfromApi()
        //showOfferData()
    }, []);

    const getRegionsfromApi = () => {
        getRegions({}).then(res => {
            SetRegion(res)
        })
    }

    const getCampignsfromApi = () => {
        getCampaignsByServiceId({ serviceId: isFirst }).then(res => {
            setCampInfo(res);
        });
    };

    const getSubDetailService = () => {
        return serviceInfoAccorUser.filter(element => {
            return element.service_id === isFirst
        })
    }

    const sperator = () => {
        return <View style={styles.seperator}></View>
    }
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


    // uploade Photo Part
    const renderDefualtImg = () => {
        return (
            <View style={styles.imgView}>
                <FontAwesome
                    // style={{ borderWidth: 1 }}
                    name={"photo"}
                    color={'lightgray'}
                    size={150} />
            </View>
        )
    }
    const renderOfferImg = () => {
        return (
            <View style={OfferImageError ? styles.imgViewnotFilled : styles.imgView}>
                {offerImg ? <Image style={styles.offerImg} source={{ uri: offerImg }} />
                    : renderDefualtImg()}

                <Pressable style={styles.editImg} onPress={onAddImgPress}>
                    <MaterialIcons
                        style={{ alignSelf: 'center' }}
                        name={"add-photo-alternate"}
                        color={'#dcdcdc'}
                        size={30} />
                </Pressable>
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
            setOfferImg(source);
        } else {
            console.log('error source isnt legable, source is :', source);
        }
    };


    // Region Part
    const whenSetWorkingRegion = (regionTitle, setSelectedRegion, selectedRegion) => {
        setSelectedRegion(!selectedRegion)
        updateSetRegion(regionTitle, setSelectedRegion)
        setOfferRegionError(!checkRegionIsSelected(OfferWorkingRegion))
    }
    const updateSetRegion = (regionTitle, setSelectedRegion) => {
        OfferWorkingRegion.includes(regionTitle) ? removeRegion(regionTitle, setSelectedRegion) : addRegion(regionTitle, setSelectedRegion);
    }
    const removeRegion = (regionTitle, setSelectedRegion) => {
        const newList = OfferWorkingRegion.filter((item) => item !== regionTitle)
        setSelectedRegion(false)
        setOfferWorkingRegion(newList);
    }
    const addRegion = (regionTitle, setSelectedRegion) => {
        const list = OfferWorkingRegion;
        list.push(regionTitle);
        setSelectedRegion(true)
        setOfferWorkingRegion(list);
    }
    const renderOfferWorkingRegion = () => {
        const cardsArray = Region.regions.map(item => {
            const [selectedRegion, setSelectedRegion] = useState(false);
            return <View style={styles.regionView}>
                <Text style={styles.regionText}>{item.regionName}</Text>
                <Pressable style={styles.regionPressable}
                    onPress={() => whenSetWorkingRegion(item.regionName, setSelectedRegion, selectedRegion)}>
                    {selectedRegion &&
                        <Entypo
                            style={{ alignSelf: 'center' }}
                            name={"check"}
                            color={colors.puprble}
                            size={20} />
                    }
                </Pressable>
            </View>
        });
        return cardsArray;
    }

    // Offer Content Part
    const whenSubDetailPress = (subDetail, setselectedSubDetail, selectedSubDetail) => {
        setselectedSubDetail(!selectedSubDetail)
        updateSubDetail(subDetail, setselectedSubDetail)
        setOfferContentError(!checkContentIsSelected(OfferContent, subDetContent))
    }
    const updateSubDetail = (subDetail, setselectedSubDetail) => {
        subDetContent.includes(subDetail) ? removeSubDetail(subDetail, setselectedSubDetail) : addSubDetail(subDetail, setselectedSubDetail);
    }
    const removeSubDetail = (subDetail, setselectedSubDetail) => {
        const newList = subDetContent.filter((item) => item !== subDetail)
        setselectedSubDetail(false)
        setSubDetContent(newList);
    }
    const addSubDetail = (subDetail, setselectedSubDetail) => {
        const list = subDetContent;
        list.push(subDetail);
        setselectedSubDetail(true)
        setSubDetContent(list);
    }
    const renderSubDetail = () => {
        const data = getSubDetailService()
        const subDetail = data[0].additionalServices
        return subDetail.map(item => {
            return (<View>
                <View style={styles.detailTitleView}>
                    <Text style={styles.Addtxt}>{item.detailTitle}</Text>
                </View>
                {item.subDetailArray.map(element => {
                    const [selectedSubDetail, setselectedSubDetail] = useState(false);
                    return (
                        <View style={styles.item}>
                            <Text style={styles.subtxt}>{element.detailSubtitle}</Text>
                            <Pressable style={styles.regionPressable}
                                onPress={() => whenSubDetailPress(element.id, setselectedSubDetail, selectedSubDetail)}>
                                {selectedSubDetail &&
                                    <Entypo
                                        style={{ alignSelf: 'center' }}
                                        name={"check"}
                                        color={colors.puprble}
                                        size={25} />
                                }
                            </Pressable>
                        </View>
                    )
                })
                }
            </View>)
        })
    }

    const addOfferContent = () => {
        setOfferContent([...OfferContent, { empty: "empty" }])
    }
    const renderContents = () => {
        const fields = OfferContent?.map((val, index) => {
            return (
                <View>
                    <ContentComponent val={val} index={index} />
                </View>
            )
        })
        return fields
    }

    const ContentComponent = (props) => {
        const [ContentDescr, setContentDescr] = useState(null)

        useEffect(() => {
            if (props.val) {
                // console.log(props.val);
                setContentDescr(props?.val?.contentItem)
            }
        }, [])

        return (
            <View style={styles.contentItemView}>
                <Pressable onPress={() => removeOfferContent(ContentDescr)}>
                    <AntDesign name='delete' size={20} color={'gray'} style={styles.deleteIcon} />
                </Pressable>
                <TextInput
                    style={styles.contentinput}
                    keyboardType='default'
                    placeholder='محتوى جديد'
                    value={ContentDescr}
                    onChangeText={val => setContentDescr(val)}
                    onEndEditing={(val) => {
                        const text = val.nativeEvent.text;
                        const data = {
                            contentItem: text
                        }
                        addContent(data, props.index)
                    }}
                />
            </View>)
    }
    const removeOfferContent = (contentToRemove) => {
        var i = OfferContent.findIndex((val) => val.contentItem === contentToRemove)
        if (i === -1) {
            console.log("there is no such Content to remove ");
            return
        } else {
            const updateContent = [...OfferContent];
            updateContent.splice(i, 1);
            setOfferContent(updateContent)
        }
    }
    const addContent = (data, index) => {
        setOfferContent(prevArray => {
            const newArray = [...prevArray];
            newArray[index] = data;
            return newArray;
        });
    }
    const renderOfferContent = () => {
        return (
            <View style={OfferContentError ? styles.ContentViewnotFilled : styles.ContentView}>
                <Text style={styles.regiontxt}>تحديد محتويات العرض من خدماتي</Text>
                {renderSubDetail()}
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.Addtxt}>محتويات اضافية</Text>
                    {renderContents()}
                </View>

                <Pressable style={styles.addContentView} onPress={addOfferContent}>
                    <Text style={styles.Addtxt}>اضافة محتويات اضافية</Text>
                    <View style={styles.IconView}>
                        <Entypo
                            name={"plus"}
                            color={colors.puprble}
                            size={30} />
                    </View>
                </Pressable>
            </View>
        )
    }

    // Expire date part
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();


        if (completeDate < fDate) {
            setOfferExpireDate(fDate);
        } else {
            Alert.alert(
                'تنبية',
                'الرجاء التأكد من ادخال التاريخ بشكل صحيح',
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
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderExpireDate = () => {
        return (
            <View>
                <Pressable onPress={() => showMode('date')} >
                    <View style={OfferExpireDateError ? styles.viewDatenotFilled : styles.viewDate}>
                        <Text style={styles.datetxt}>{OfferExpireDate ? moment(OfferExpireDate).format('l') : "صلاحية العرض"}</Text>
                        <Entypo
                            name='calendar'
                            style={{ fontSize: 30, color: colors.puprble, paddingRight: 20 }}
                        />
                    </View>
                </Pressable>
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='spinner'
                        onChange={onChange}
                    />
                )}
            </View>
        )
    }


    const renderheader = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>اٍنشاء حملة اعلانية</Text>

            </View>
        )
    }
    const renderIsPerPerson = () => {
        return (
            <View style={styles.perPersoneView}>
                <Text style={styles.perPersoneText}>ماذا يشمل هذا السعر ؟</Text>
                <View style={{ alignItems: 'flex-end' }}>
                    <Pressable style={[PerPackage ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Package}>
                        <Text style={styles.perPersoneText}>لكل الحجز</Text>
                    </Pressable>

                    <Pressable style={[PerPerson ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Person}>
                        <Text style={styles.perPersoneText}>حسب الشخص</Text>
                    </Pressable>

                    <Pressable style={[PerTable ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Table}>
                        <Text style={styles.perPersoneText}>حسب الطاولة</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const renderOfferInfo = () => {
        return (
            <View style={styles.infoView}>
                <View style={styles.inputView}>
                    {OfferTitleError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    <TextInput
                        style={OfferTitleError ? styles.inputnotFilled : styles.input}
                        keyboardType='default'
                        placeholder='عنوان العرض'
                        onChangeText={setOfferTitle}
                    />
                </View>
                <View style={styles.inputView}>
                    {OfferExpireDateError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    {renderExpireDate()}
                </View>
                <View style={styles.inputView}>
                    {OfferPriceError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    <TextInput
                        style={OfferPriceError ? styles.inputnotFilled : styles.input}
                        keyboardType='default'
                        placeholder='السعر المقترح'
                        onChangeText={val => {
                            setOfferPrice(val)
                            if (val < 500) {
                                setIsPriceperPersone(true)
                            }
                        }}
                    />
                </View>
                {isPriceperPersone && <View style={OfferPriIncludError ? styles.inputViewnotFilled : styles.inputView}>
                    {renderIsPerPerson()}
                </View>}
                {sperator()}

                <View style={OfferRegionError ? styles.inputViewnotFilled : styles.inputView}>
                    <Text style={styles.regiontxt}>تحديد مناطق ترويج العرض</Text>
                    {renderOfferWorkingRegion()}
                </View>

                {sperator()}
                {renderOfferContent()}
            </View>
        )
    }
    const RenderFooter = () => {
        return <View style={styles.footer}>
            {RenderSaveButton()}
        </View>;
    };
    const RenderSaveButton = () => {
        return (
            <Pressable
                style={styles.createUserNext}
                onPress={checkMissingData}>
                <Text style={styles.createUserNextTxt}>حفظ</Text>
            </Pressable>
        );
    };

    const SaveOffer = () => {
        const addNewOffer = {
            userId: userId,
            serviceId: isFirst,
            campCatType: serviceCat,
            campTitle: OfferTitle,
            campContents: OfferContent,
            contentFromSubDet: subDetContent,
            campCost: OfferPrice,
            campRigon: OfferWorkingRegion,
            campExpirDate: OfferExpireDate,
            priceInclude: priceInclude
        }

        createNewOffer(addNewOffer, offerImg).then(res => {
            let OfferArr = campInfo || [];

            // if (campInfo[0].campTitle !== OfferTitle) {
                if (res.message === 'newCampaign Created') {
                    OfferArr.push({ ...addNewOffer, campImag: res.campImg })
                    setCampInfo([...OfferArr])
                    ToastAndroid.showWithGravity(
                        'تم اٍنشاء العرض بنجاح',
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    props.navigation.navigate(ScreenNames.ProviderProfile);
                } else {
                    ToastAndroid.showWithGravity(
                        'there has been an error' + res.message,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                }
            // } else {
            //     ToastAndroid.showWithGravity(
            //         'لا يمكن انشاء عرض اخر بأسم عرض سابق',
            //         ToastAndroid.SHORT,
            //         ToastAndroid.BOTTOM,
            //     );
            // }

        })
    }



    const checkStrings = val => {
        if (!val) {
            return true;
        } else if (val.trim().length <= 0) {
            return true;
        }
        return false;
    };
    const checkPriceIsNumber = (val) => {
        if (isNaN(val)) {
            return true
        } else {
            return false
        }
    }
    const checkRegionIsSelected = (val) => {
        if (val.length > 0) {
            return true
        } else {
            return false
        }
    }
    const checkContentIsSelected = (subCont, OthCont) => {
        if (subCont.length > 0 || OthCont.length > 0) {
            return true
        } else {
            return false
        }
    }

    const checkMissingData = () => {

        if (checkStrings(offerImg)) {
            showMissingOfferImage()
        } else if (checkStrings(OfferTitle)) {
            showMissingOfferTitle()
        } else if (checkStrings(OfferExpireDate)) {
            showMissingOfferExpire()
        } else if (checkPriceIsNumber(OfferPrice)) {
            showMissingOfferPrice()
        } else if (checkStrings(priceInclude)) {
            showMissingPriceInclude()
        } else if (!checkRegionIsSelected(OfferWorkingRegion)) {
            showMissingRegion()
        } else if (!checkContentIsSelected(OfferContent, subDetContent)) {
            showMissingContents()
        } else {
            SaveOffer()
        }
    };

    const showMissingOfferImage = () => {
        Alert.alert(
            'تنبية',
            '  الرجاء التأكد من تحميل الصورة ',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingOfferTitle = () => {
        Alert.alert(
            'تنبية',
            '  الرجاء التأكد من عنوان العرض',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingOfferPrice = () => {
        Alert.alert(
            'تنبية',
            '  الرجاء التأكد من مدخل السعر',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingOfferExpire = () => {
        Alert.alert(
            'تنبية',
            'الرجاء التأكد من ادخال التاريخ  ',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingPriceInclude = () => {
        Alert.alert(
            'تنبية',
            'الرجاء التاكد من اختيار شمولية السعر',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingRegion = () => {
        Alert.alert(
            'تنبية',
            'الرجاء التاكد من اختيار المناطق ',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };
    const showMissingContents = () => {
        Alert.alert(
            'تنبية',
            'الرجاء التاكد من اختيار محتويات العرض ',
            [
                {
                    text: 'Ok',
                    style: 'cancel',
                },
            ],
            { cancelable: false } // Prevent closing the alert by tapping outside
        );
    };

    useEffect(() => {
        setOfferImageError(checkStrings(offerImg))
        setOfferTitleError(checkStrings(OfferTitle));
        setOOfferPriceError(checkStrings(OfferPrice));
        setOfferExpireDateError(checkStrings(OfferExpireDate));
        setOfferPriIncludError(checkStrings(priceInclude))
        setOfferRegionError(!checkRegionIsSelected(OfferWorkingRegion))
        setOfferContentError(!checkContentIsSelected(OfferContent, subDetContent))
    }, [offerImg, OfferTitle, OfferPrice, OfferExpireDate, priceInclude, OfferWorkingRegion, OfferContent, subDetContent]);

    return (
        <View style={styles.container}>
            {renderheader()}
            <ScrollView>
                {renderOfferImg()}
                {renderOfferInfo()}
                {RenderFooter()}
            </ScrollView>
        </View>
    )
}

export default ProviderCreateOffer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BGScereen
    },
    imgView: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'lightgray'
    },
    imgViewnotFilled: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.darkGold
    },
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10
    },
    headerTxt: {
        fontSize: 20,
        marginRight: 20,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    regionText: {
        fontSize: 15,
        marginRight: 20,
        color: colors.puprble,
        marginTop: 10
    },
    regiontxt: {
        fontSize: 18,
        marginRight: 20,
        color: colors.puprble,
        marginBottom: 10
    },

    infoView: {
        // borderWidth: 1,
        marginTop: 30,
    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderRadius: 10,
        fontSize: 15,
        color: 'black',
        backgroundColor: colors.silver,
    },
    inputnotFilled: {
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderRadius: 10,
        borderColor: colors.darkGold,
        borderWidth: 2,
        fontSize: 15,
        color: 'black',
        backgroundColor: colors.silver,

    },
    regionView: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    regionPressable: {
        width: 35,
        height: 35,
        borderWidth: 2,
        borderColor: colors.silver,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    ContentView: {
        marginVertical: 10,
    },
    ContentViewnotFilled: {
        borderWidth: 2,
        borderColor: colors.darkGold,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 8,
        marginVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20,

    },
    addContentView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginVertical: 20,
        marginRight: 20,

    },
    subSelectView: {

    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,

    },
    detailTitleView: {
        backgroundColor: colors.silver,
        marginVertical: 10, height: 40,
        justifyContent: 'center',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center'
    },
    Addtxt: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20,
        fontWeight: 'bold',

    },
    subtxt: {
        fontSize: 16,
        color: colors.puprble,
        marginRight: 20,
    },
    seperator: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10
    },
    contentItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '90%',
        borderRadius: 10,
        backgroundColor: 'lightgray',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginVertical: 10
    },
    contentinput: {
        textAlign: 'right',
        fontSize: 15,
        color: 'black',
        paddingRight: 10
    },
    deleteIcon: {
        paddingLeft: 10
    },
    footer: {
        width: '100%',
        marginVertical: 20,
        marginRight: 20,
    },
    createUserNext: {
        alignSelf: 'flex-end',
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.puprble,
        margin: 3,
        elevation: 5,
        borderRadius: 8,
        marginRight: 20
    },
    createUserNextTxt: {
        fontSize: 18,
        color: colors.darkGold
    },
    inputView: {
        alignItems: 'flex-end',
        marginVertical: 10,
    },
    inputViewnotFilled: {
        alignItems: 'flex-end',
        borderWidth: 2,
        borderColor: colors.darkGold,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 5,
        borderRadius: 8
    },
    viewDate: {
        flexDirection: 'row',
        height: 50,
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'flex-end',
    },
    viewDatenotFilled: {
        flexDirection: 'row',
        height: 50,
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: colors.silver,
        justifyContent: 'flex-end',
        borderWidth: 2,
        borderColor: colors.darkGold
    },
    datetxt: {
        fontSize: 15,
        marginRight: 90,
        color: colors.puprble,
    },
    textRequired: {
        fontSize: 14,
        marginRight: 40,
        color: 'red',
    },
    offerImg: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.BGScereen,
    },
    editImg: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#dcdcdc',
        position: 'absolute',
        right: 20,
        bottom: -20,
    },
    perPersoneView: {
        //marginTop: 20,
        width: '80%',
        alignSelf: 'center'
    },
    itemPersonView: {
        borderWidth: 2,
        borderColor: '#dcdcdc',
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 5,
        marginTop: 10
    },
    itemPersonViewPressed: {
        borderWidth: 3,
        borderColor: colors.puprble,
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 5,
        marginTop: 10
    },
    perPersoneText: {
        fontSize: 18,
        color: colors.puprble
    }

})
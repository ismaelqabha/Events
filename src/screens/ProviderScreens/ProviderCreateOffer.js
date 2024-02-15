import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import SearchContext from '../../../store/SearchContext';
import { createNewOffer, getRegions } from '../../resources/API';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProviderCreateOffer = (props) => {
    const { isFirst, serviceCat } = props.route?.params || {}
    const { userId, campInfo, setCampInfo } = useContext(SearchContext);
    const [Region, SetRegion] = useState([])
    const [noPerPerson, setNoPerPerson] = useState(false);
    const [yesPerPerson, setYesPerPerson] = useState(false);
    const [isPriceperPersone, setIsPriceperPersone] = useState(false);

    const [OfferTitleError, setOfferTitleError] = useState(false)
    const [OfferPriceError, setOOfferPriceError] = useState(false)
    const [OfferExpireDateError, setOfferExpireDateError] = useState(false)

    const [OfferTitle, setOfferTitle] = useState(null)
    const [OfferPrice, setOfferPrice] = useState(null)
    const [OfferExpireDate, setOfferExpireDate] = useState(null)
    const [OfferContent, setOfferContent] = useState([])
    const [offerImg, setOfferImg] = useState(null)
    const [isPerPerson, setIsPerPerson] = useState(false)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const getRegionsfromApi = () => {
        getRegions({}).then(res => {
            console.log("res", res);
            SetRegion(res)
        })
    }
    useEffect(() => {
        // getRegionsfromApi()
    }, [Region]);

    const sperator = () => {
        return <View style={styles.seperator}></View>
    }
    const yesIsPerson = () => {
        setYesPerPerson(true)
        setNoPerPerson(false)
        setIsPerPerson(true)
    }
    const noIsPerson = () => {
        setYesPerPerson(false)
        setNoPerPerson(true)
        setIsPerPerson(false)
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
            <View style={styles.imgView}>
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
    const renderOfferWorkingRegion = () => {
        const cardsArray = Region.regions.map(item => {
            // const [selectedRegion, setSelectedRegion] = useState(false);
            return <View style={styles.regionView}>
                <Text style={styles.regionText}>{item.regionName}</Text>
                <Pressable style={styles.regionPressable}
                //onPress={() => whenSupDetailPress(item.subDetail_Id, setSelectedSubDetail, selectedSubDetail)}
                >
                    {/* {selectedRegion && */}
                    <Entypo
                        style={{ alignSelf: 'center' }}
                        name={"check"}
                        color={colors.BGScereen}
                        size={30} />
                    {/* } */}
                </Pressable>
            </View>
        });
        return cardsArray;
    }

    // Offer Content Part
    const addOfferContent = () => {
        setOfferContent([...OfferContent, { empty: "empty" }])
    }
    const renderContents = () => {
        const fields = OfferContent?.map((val, index) => {
            return <ContentComponent val={val} index={index} />
        })
        return fields
    }
    const ContentComponent = (props) => {
        const [ContentDescr, setContentDescr] = useState(null)

        useEffect(() => {
            if (props.val) {
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
                    placeholder='الوصف'
                    value={ContentDescr}
                    onChangeText={(val) => setContentDescr(val)}
                    onEndEditing={(val) => {
                        const data = {
                            contentItem: ContentDescr
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
    const updateContentsArray = (data) => {
        var i = OfferContent.findIndex((val) => val.contentItem === data.contentItem)
        console.log("i ", i);
        if (i == -1) {
            var temp = OfferContent.findIndex((val) => val.empty === "empty")
            var newArr = OfferContent
            newArr[temp] = data
            setOfferContent(newArr)
        } else {
            var current = userSpecialDate
            current[i] = data
            setOfferContent(current)
        }
        console.log("updated -> ", OfferContent);
    }
    const renderOfferContent = () => {
        return (
            <View style={styles.ContentView}>
                <Text style={styles.regiontxt}>قائمة المحتويات</Text>
                {renderContents()}
                <Pressable style={styles.item}
                    onPress={addOfferContent}
                >
                    <Text style={styles.Addtxt}>اضافة محتويات العرض</Text>
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
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setOfferExpireDate(fDate);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderExpireDate = () => {
        return (
            <View>
                <Pressable onPress={() => showMode('date')} >
                    <View style={styles.viewDate}>
                        <Text style={styles.datetxt}>{OfferExpireDate || "صلاحية العرض"}</Text>
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
                        display='calendar'
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
                <Text style={styles.perPersoneText}>هل السعر اعتمادا للشخص الواحد ؟</Text>
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
    const renderOfferInfo = () => {
        return (
            <View style={styles.infoView}>
                <View style={styles.inputView}>
                    {OfferTitleError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    <TextInput
                        style={styles.input}
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
                        style={styles.input}
                        keyboardType='default'
                        placeholder='السعر المقترح'
                        onChangeText={ val => {
                            setOfferPrice(val)
                            if(val < 500){
                                setIsPriceperPersone(true)
                            }
                        }}
                    />
                </View>
                {isPriceperPersone &&
                    <View style={styles.inputView}>
                        {renderIsPerPerson()}
                    </View>}

                {sperator()}
                <View style={styles.inputView}>
                    <Text style={styles.regiontxt}>تحديد مناطق ترويج الحملة</Text>
                    {/* {renderOfferWorkingRegion()} */}
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
                onPress={() => onSavePress()}>
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
            campCost: OfferPrice,
            campImag: offerImg,
            campRigon: '',
            campExpirDate: OfferExpireDate,
            isPerPerson: isPerPerson
        }

        createNewOffer(addNewOffer).then(res => {
            let OfferArr = campInfo || [];
            OfferArr.push(addNewOffer);
            setCampInfo([...OfferArr])
            console.log("OfferArr", OfferArr);
        })
    }

    const onSavePress = () => {
        true ? SaveOffer() : missingData();
    };

    const checkStrings = val => {
        if (!val) {
            return false;
        } else if (val.trim().length <= 0) {
            return false;
        }
        return true;
    };

    const missingData = () => {
        checkStrings(OfferTitle) ? showMissingOfferTitle() : null;
        checkStrings(OfferPrice) ? showMissingOfferPrice() : null;
        checkStrings(OfferExpireDate) ? showMissingOfferExpire() : null;
    };

    const showMissingOfferTitle = () => { };

    const showMissingOfferPrice = () => { };

    const showMissingOfferExpire = () => { };

    useEffect(() => {
        setOfferTitleError(!checkStrings(OfferTitle));
        setOOfferPriceError(!checkStrings(OfferPrice));
        setOfferExpireDateError(!checkStrings(OfferExpireDate));
    }, [OfferTitle, OfferPrice, OfferExpireDate]);

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
        // backgroundColor: 'green',
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
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'lightgray',
        // marginVertical: 10
    },
    regionView: {
        // width: '90%',
        // alignSelf: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20
    },
    regionPressable: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: colors.puprble,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ContentView: {
        //borderWidth: 1,
        marginVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
    },
    Addtxt: {
        fontSize: 15,
        color: colors.puprble,
        marginTop: 10
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
    viewDate: {
        flexDirection: 'row',
        height: 50,
        width: '95%',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'lightgray',
        justifyContent: 'flex-end',
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
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        borderRadius: 5,
        marginTop: 20
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
        marginTop: 20
    },
    perPersoneText: {
        fontSize: 18,
        color: colors.puprble
    }

})
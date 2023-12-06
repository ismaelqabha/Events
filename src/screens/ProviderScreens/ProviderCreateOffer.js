import { StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import SearchContext from '../../../store/SearchContext';
import { createNewOffer } from '../../resources/API';

const ProviderCreateOffer = (props) => {
    const { isFirst,serviceCat } = props.route?.params || {}
    const { userId, campInfo, setCampInfo } = useContext(SearchContext);

    const [OfferTitleError, setOfferTitleError] = useState(false)
    const [OfferPriceError, setOOfferPriceError] = useState(false)
    const [OfferExpireDateError, setOfferExpireDateError] = useState(false)

    const [OfferTitle, setOfferTitle] = useState(null)
    const [OfferPrice, setOfferPrice] = useState(null)
    const [OfferExpireDate, setOfferExpireDate] = useState(null)
    const [OfferContent, setOfferContent] = useState([])
    const [ContentDescr, setContentDescr] = useState(null)
    const [offerImg, setOfferImg] = useState(null)


    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const sperator = () => {
        return <View style={styles.seperator}></View>
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
                <Text style={styles.headerTxt}>انشاء عرض ترويجي</Text>

            </View>
        )
    }
    const renderOfferImg = () => {
        return (
            <View style={styles.imgView}>
                <Image style={styles.offerImg} source={offerImg ? { uri: offerImg } : require('../../assets/photos/user.png')} />
                <Pressable style={styles.editImg} onPress={onAddImgPress}>
                    <Entypo
                        name={"camera"}
                        color={colors.puprble}
                        size={25} />
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
    const renderOfferWorkingRegion = () => {
        return (
            <View style={styles.regionView}>
                <Text style={styles.regionText}>تحديد أماكن الترويج</Text>
            </View>
        )
    }
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
        return (
            <View style={styles.contentItemView}>
                <TextInput
                    style={styles.contentinput}
                    keyboardType='default'
                    placeholder='الوصف'
                    onChangeText={setContentDescr}
                    onSubmitEditing={(val) => {
                        const data = {
                            contentItem: ContentDescr
                        }
                        updateContentsArray(data)
                    }}
                />
            </View>)
    }
    const updateContentsArray = (data) => {
        var i = OfferContent.findIndex((val) => val.contentItem === data.contentItem)
        console.log("i ", i);
        if (i == -1) {
            var temp = OfferContent.findIndex((val) => val.empty === "empty")
            var newArr = OfferContent
            newArr[temp] = data
            setUserSpecialDate(newArr)
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
                {renderContents()}
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
                    {OfferPriceError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='السعر المقترح'
                        onChangeText={setOfferPrice}
                    />
                </View>
                <View style={styles.inputView}>
                    {OfferExpireDateError && (
                        <Text style={styles.textRequired}>*</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder='صلاحية العرض'
                        onChangeText={setOfferExpireDate}
                    />
                </View>
                {sperator()}
                {renderOfferWorkingRegion()}
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
            campImag: '',
            campRigon: '',
            campExpirDate: OfferExpireDate
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
        fontSize: 18,
        marginRight: 20,
        color: colors.puprble,
        //  fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    regionText: {
        fontSize: 15,
        marginRight: 20,
        color: colors.puprble,
        marginTop: 10
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
        borderRadius: 30,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'lightgray',
        // marginVertical: 10
    },
    regionView: {
        backgroundColor: 'gray',
        height: 70,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10
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
        //backgroundColor: 'white'
        //marginBottom: 30
    },
    contentinput: {
        alignSelf: 'center',
        textAlign: 'right',
        height: 60,
        width: '90%',
        borderRadius: 10,
        fontSize: 15,
        color: 'black',
        backgroundColor: 'lightgray',
        marginVertical: 10
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
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
        position: 'absolute',
        right: 20,
        bottom: -20,
    },
})
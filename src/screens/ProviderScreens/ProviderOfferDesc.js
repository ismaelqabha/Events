import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../assets/AppColors';
import { uodateCampaignsById } from '../../resources/API';

const ProviderOfferDesc = (props) => {
    const { data } = props.route?.params || {}
    const { campInfo, setCampInfo } = useContext(SearchContext);
    const { } = useContext(ServiceProviderContext);

    const [Title, setTitle] = useState();

    const [editTitle, setEditTitle] = useState(false);

    
    const [editRegionItem, setRditRegionItem] = useState(false);

    const selectedOfferIndex = campInfo?.findIndex(item => item.CampId === data.CampId)
    useEffect(() => {

    }, []);

    const onPressBackHandler = () => {
        props.navigation.goBack();
    };

    const titleEditPress = () => {
        setEditTitle(true)
        // setEditContentItem(false)
    }
    const contentItemEditPress = (setEditContentItem) => {
        setEditContentItem(true)
        setEditTitle(false)
    }
    const otherContentEditPress = (setEditOtherContItem) => {
        setEditTitle(false)
        setEditOtherContItem(true)
    }
    const regionEditPress = () => {
        setEditTitle(false)
        // setEditContentItem(false)
    }
    const editItem = (item, setState, update) => {
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
                        //value={item}
                        placeholder={item || ''}
                        onChangeText={setState}
                    //(val) => {
                    // console.log("val", val);
                    //setState(val)
                    />
                </View>
            </View>)
    }
    
    const updateTitle = () => {
        const newData = {
            CampId: data.CampId,
            campTitle: Title
        }
        uodateCampaignsById(newData).then(res => {
            const data = campInfo || [];
            if (selectedOfferIndex > -1) {
                data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...data])
                setEditTitle(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const updateContentItem = (setEditContentItem) => {
        setEditContentItem(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditContentItem(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }
    const updateOtherContentItem = (setEditOtherContItem) => {
        setEditOtherContItem(false)
        // const newData = {
        //     CampId: data.CampId,
        //     campTitle: Title
        // }
        // uodateCampaignsById(newData).then(res => {
        //     const data = campInfo || [];
        //     if (selectedOfferIndex > -1) {
        //         data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
        //     }
        //     if (res.message === 'Updated Sucessfuly') {
        //         setCampInfo([...data])
        //         setEditContentItem(false)
        //         ToastAndroid.showWithGravity(
        //             'تم التعديل بنجاح',
        //             ToastAndroid.SHORT,
        //             ToastAndroid.BOTTOM,
        //         );
        //     }
        // })
    }

    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressBackHandler}>
                    <AntDesign
                        name={'left'}
                        color={'black'}
                        size={20}
                    />
                </Pressable>
                <Text style={styles.headerTxt}>تفاصيل العرض</Text>
            </View>
        )
    }
    const renderOfferImage = () => {
        return (
            <View>
                <View style={styles.imagView}>
                    <View style={styles.offerImg}>
                        <Image style={styles.img} source={{ uri: data.campImag }} />
                    </View>
                    <Pressable style={styles.editImg}>
                        <Entypo name={'camera'} color={colors.puprble} size={25} />
                    </Pressable>
                </View>
            </View>
        );
    }
    const renderOfferTitle = () => {
        return (<View>
            {editTitle ? editItem(data.campTitle, setTitle, updateTitle) :
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable onPress={titleEditPress}
                        >
                            <Feather
                                style={styles.menuIcon}
                                name={'edit'}
                                color={colors.BGScereen}
                                size={25} />
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{data.campTitle}</Text>
                            <Text style={styles.basicInfoTitle}>عنوان العرض</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <MaterialIcons name={'title'} color={colors.puprble} size={25} />
                    </View>
                </View>}
        </View>
        )
    }
    const renderOfferExDate = () => {
        return (
            <View style={styles.itemOffer}>
                <View style={styles.item}>
                    <Pressable //onPress={titleEditPress}
                    >
                        <Feather
                            style={styles.menuIcon}
                            name={'edit'}
                            color={colors.BGScereen}
                            size={25} />
                    </Pressable>
                    <View>
                        <Text style={styles.Infotxt}>{data.campExpirDate}</Text>
                        <Text style={styles.basicInfoTitle}>تاريخ الصلاحية</Text>
                    </View>
                </View>
                <View style={styles.IconView}>
                    <FontAwesome name={'calendar-check-o'} color={colors.puprble} size={25} />
                </View>
            </View>
        )
    }
    const renderOfferPrice = () => {
        return (
            <View style={styles.itemOffer}>
                <Pressable //onPress={titleEditPress}
                >
                    <Feather
                        style={styles.menuIcon}
                        name={'edit'}
                        color={colors.BGScereen}
                        size={25} />
                </Pressable>
                <View>
                    <View style={styles.Priceitem}>
                        <View>
                            <Text style={styles.Infotxt}>{data.campCost}</Text>
                            <Text style={styles.basicInfoTitle}>السعر</Text>
                        </View>
                        <View style={styles.IconView}>
                            <Ionicons name={'pricetag'} color={colors.puprble} size={25} />
                        </View>
                    </View>
                    <View style={styles.Priceitem}>
                        <View>
                            <Text style={styles.Infotxt}>{data.priceInclude + ' السعر يشمل'}</Text>
                            {/* <Text style={styles.basicInfoTitle}>السعر</Text> */}
                        </View>
                        <View style={styles.IconView}>
                            <Entypo name={'info'} color={colors.puprble} size={25} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const renderOfferContent = () => {
        return data.contentFromSubDet.map(item => {
            const [editContentItem, setEditContentItem] = useState(false);

            return (<View>
                {editContentItem ? editItem(item, setEditContentItem, updateContentItem) :
                    <View style={styles.itemOffer}>
                        <View style={styles.item}>
                            <Pressable onPress={() => contentItemEditPress(setEditContentItem)}
                            >
                                <Feather
                                    style={styles.menuIcon}
                                    name={'more-vertical'}
                                    color={colors.BGScereen}
                                    size={25} />
                            </Pressable>
                            <View>
                                <Text style={styles.Infotxt}>{item}</Text>
                            </View>
                        </View>
                        <View style={styles.IconView}>
                            <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                        </View>
                    </View>}
            </View>
            )
        })
    }
    const renderOfferOtherContent = () => {
        return data.campContents.map(item => {
            const [editOtherContItem, setEditOtherContItem] = useState(false);
            return (<View>
                {editOtherContItem ? editItem(item, setEditOtherContItem, updateOtherContentItem) :
                    <View style={styles.itemOffer}>
                        <View style={styles.item}>
                            <Pressable onPress={() => otherContentEditPress(setEditOtherContItem)}
                            >
                                <Feather
                                    style={styles.menuIcon}
                                    name={'more-vertical'}
                                    color={colors.BGScereen}
                                    size={25} />
                            </Pressable>
                            <View>
                                <Text style={styles.Infotxt}>{item}</Text>
                            </View>
                        </View>
                        <View style={styles.IconView}>
                            <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                        </View>
                    </View>}
            </View>
            )
        })
    }
    const renderOfferRegion = () => {
        return data.campRigon.map(item => {
            return (
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable //onPress={titleEditPress}
                        >
                            <Feather
                                style={styles.menuIcon}
                                name={'more-vertical'}
                                color={colors.BGScereen}
                                size={25} />
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{item}</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                    </View>
                </View>
            )
        })
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderOfferImage()}
                <View style={styles.content}>
                    {renderOfferTitle()}
                    {renderOfferExDate()}
                </View>
                <View style={styles.content}>
                    {renderOfferPrice()}
                </View>
                <Text style={styles.titletxt}>محتويات العرض</Text>
                <View style={styles.content}>
                    {renderOfferContent()}
                    {renderOfferOtherContent()}
                </View>
                <Text style={styles.titletxt}>أماكن العمل</Text>
                <View style={styles.content}>
                    {renderOfferRegion()}
                </View>
                <View style={{ width: '100%', height: 50 }}></View>

            </ScrollView>
        </View>
    )
}

export default ProviderOfferDesc

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 5,
        backgroundColor: 'lightgray',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 15,
        elevation: 5,
        marginVertical: 5
    },
    titletxt: {
        fontSize: 18,
        color: 'black',
        marginRight: 20,
        marginVertical: 10
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
        // fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    imagView: {
        width: '100%',
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        //borderWidth: 1
    },
    offerImg: {
        width: '80%',
        height: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
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
        right: 30,
        bottom: 0,
    },
    itemOffer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        marginVertical: 10,
        // borderWidth: 1
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '85%',
    },
    Priceitem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '96%',
        marginVertical: 5
    },
    IconView: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        marginLeft: 10,
    },
    Infotxt: {
        fontSize: 18,
        color: colors.puprble,
        textAlign: 'right',
    },
    itemView: {
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        //borderWidth: 1
    },
    editTitleView: {
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemFooter: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
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
})
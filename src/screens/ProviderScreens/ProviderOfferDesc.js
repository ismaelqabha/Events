import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, ToastAndroid, Modal } from 'react-native'
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
    const { campInfo, setCampInfo, isFirst } = useContext(SearchContext);
    const { Region, serviceInfoAccorUser } = useContext(ServiceProviderContext);

    const [Title, setTitle] = useState();
    const [subDetContent, setSubDetContent] = useState([])
    const [offerRegions, setOfferRegions] = useState([])
    const [otherContent, setOtherContent] = useState(data.campContents)
    const [otherContentItem, setOtherContentItem] = useState()

    const [editTitle, setEditTitle] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showRegionModal, setShowRegionModal] = useState(false);


    const selectedOfferIndex = campInfo?.findIndex(item => item.CampId === data.CampId)

    useEffect(() => {

    }, []);

    const getServiceForDetail = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
    };
    const onPressBackHandler = () => {
        props.navigation.goBack();
    };
    const closeModalPress = () => {
        setShowContentModal(false)
    }

    const titleEditPress = () => {
        setEditTitle(true)

    }
    const contentItemEditPress = () => {
        setShowContentModal(true)
    }
    const otherContentEditPress = (setEditOtherContItem) => {
        setEditOtherContItem(true)
    }
    const regionEditPress = () => {
        setShowRegionModal(true)
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
                    />
                </View>
            </View>)
    }
    const editOtherContentItem = (item, setEditOtherContItem) => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={() => updateOtherContentItem(item, setEditOtherContItem)} style={styles.itemFooter}>
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
                        onChangeText={setOtherContentItem}
                    />
                </View>
            </View>)
    }

    // Update functions
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
    const updateContentItem = () => {
        const newData = {
            CampId: data.CampId,
            contentFromSubDet: subDetContent
        }
        uodateCampaignsById(newData).then(res => {
            const data = campInfo || [];
            if (selectedOfferIndex > -1) {
                data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...data])
                setShowContentModal(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const updateOfferWorkRegion = () => {
        const newData = {
            CampId: data.CampId,
            campRigon: offerRegions
        }
        uodateCampaignsById(newData).then(res => {
            const data = campInfo || [];
            if (selectedOfferIndex > -1) {
                data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...data])
                setShowRegionModal(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const updateOtherContentItem = (item, setEditOtherContItem) => {
        const itemIndex = otherContent.findIndex(elme => elme === item)
        const content = otherContent
        if (itemIndex > -1) {
            content[itemIndex] = otherContentItem
        }
        setOtherContent(content[itemIndex]);

        const newData = {
            CampId: data.CampId,
            campContents: otherContent
        }
        uodateCampaignsById(newData).then(res => {
            const data = campInfo || [];
            if (selectedOfferIndex > -1) {
                data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...data])
                setEditOtherContItem(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
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
    // Content from sub Detail
    const renderOfferContent = () => {
        return (
            <View>
                <Pressable style={styles.editView} onPress={contentItemEditPress}
                >
                    <Feather
                        name={'edit'}
                        color={colors.BGScereen}
                        size={25} />
                </Pressable>
                {OfferContentItems()}
                {contentModal()}
            </View>
        )
    }
    const OfferContentItems = () => {
        return data.contentFromSubDet.map(item => {
            return (
                <View style={styles.contentItem}>
                    <Text style={styles.Infotxt}>{item}</Text>
                    <View style={styles.IconView}>
                        <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                    </View>
                </View>
            )
        })
    }
    const checkContentPressed = (subTitle, setselectedSubDetail) => {
        data.contentFromSubDet.includes(subTitle) ? setselectedSubDetail(true) : null
    }
    const whenSubDetailPress = (subDetail, setselectedSubDetail, selectedSubDetail) => {
        setselectedSubDetail(!selectedSubDetail)
        updateSubDetail(subDetail, setselectedSubDetail)
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
    const getSerDetailForContent = () => {
        const service = getServiceForDetail()
        return service[0].additionalServices.map(item => {
            return (
                <View>
                    <View style={styles.detailView}>
                        <Text style={styles.headerTxt}>{item.detailTitle}</Text>
                    </View>
                    {item.subDetailArray.map(sub => {
                        //checkContentPressed(sub.detailSubtitle, setselectedSubDetail)
                        const [selectedSubDetail, setselectedSubDetail] = useState(false);
                        return (
                            <View style={styles.subDetView}>
                                <Text style={styles.subTxt}>{sub.detailSubtitle}</Text>
                                <Pressable style={styles.checkView} onPress={() => whenSubDetailPress(sub.detailSubtitle, setselectedSubDetail, selectedSubDetail)}>
                                    {selectedSubDetail &&
                                        <Entypo
                                            style={{ alignSelf: 'center' }}
                                            name={"check"}
                                            color={colors.puprble}
                                            size={25} />}
                                </Pressable>
                            </View>)
                    })}

                </View>)
        })
    }
    const contentModal = () => {
        return (
            <Modal
                transparent
                visible={showContentModal}
                animationType="slide"
                onRequestClose={() => setShowContentModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                            <Feather
                                name={'more-horizontal'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        <ScrollView>
                            {getSerDetailForContent()}
                        </ScrollView>
                        <Pressable style={styles.modalFooter} onPress={updateContentItem}>
                            <Text style={styles.headerTxt}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
    const isOtherContent = () => {
        if (data.campContents !== undefined) {
            return (<View>
                <Text style={styles.titletxt}>محتويات العرض الاضافية</Text>
                <View style={styles.content}>
                    {renderOfferOtherContent()}
                </View>
            </View>
            )
        }
    }

    const renderOfferOtherContent = () => {
        return data.campContents.map(item => {
            const [editOtherContItem, setEditOtherContItem] = useState(false);
            return (<View>
                {editOtherContItem ? editOtherContentItem(item, setEditOtherContItem) :
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

    // working region Part
    const renderOfferRegion = () => {
        return (
            <View>
                <Pressable style={styles.editView} onPress={regionEditPress}>
                    <Feather
                        name={'edit'}
                        color={colors.BGScereen}
                        size={25} />
                </Pressable>
                {OfferRegionItem()}
                {regionModal()}
            </View>
        )
    }
    const OfferRegionItem = () => {
        return data.campRigon.map(item => {
            return (
                <View style={styles.contentItem}>
                    <Text style={styles.Infotxt}>{item}</Text>
                    <View style={styles.IconView}>
                        <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                    </View>
                </View>
            )
        })
    }
    const checkRegionPressed = (subTitle, setselectedSubDetail) => {
        data.contentFromSubDet.includes(subTitle) ? setselectedSubDetail(true) : null
    }
    const whenRegionPress = (reg, setselectedRegion, selectedRegion) => {
        setselectedRegion(!selectedRegion)
        updateSelectedRegion(reg, setselectedRegion)
    }
    const updateSelectedRegion = (reg, setselectedRegion) => {
        offerRegions.includes(reg) ? removeOfferRegion(reg, setselectedRegion) : addofferRegion(reg, setselectedRegion);
    }
    const removeOfferRegion = (reg, setselectedRegion) => {
        const newList = offerRegions.filter((item) => item !== reg)
        setselectedRegion(false)
        setOfferRegions(newList);
    }
    const addofferRegion = (reg, setselectedRegion) => {
        const list = offerRegions;
        list.push(reg);
        setselectedRegion(true)
        setOfferRegions(list);
    }
    const getRegion = () => {
        return Region.regions.map(item => {
            //checkRegionPressed(item.regionName, setselectedRegion)
            const [selectedRegion, setselectedRegion] = useState(false);
            return (
                <View>
                    <View style={styles.subDetView}>
                        <Text style={styles.subTxt}>{item.regionName}</Text>
                        <Pressable style={styles.checkView} onPress={() => whenRegionPress(item.regionName, setselectedRegion, selectedRegion)}>
                            {selectedRegion &&
                                <Entypo
                                    style={{ alignSelf: 'center' }}
                                    name={"check"}
                                    color={colors.puprble}
                                    size={25} />}
                        </Pressable>
                    </View>
                </View>)
        })
    }
    const regionModal = () => {
        return (
            <Modal
                transparent
                visible={showRegionModal}
                animationType="slide"
                onRequestClose={() => setShowRegionModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                            <Feather
                                name={'more-horizontal'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        <ScrollView>
                            {getRegion()}
                        </ScrollView>
                        <Pressable style={styles.modalFooter} onPress={updateOfferWorkRegion}>
                            <Text style={styles.headerTxt}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
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
                <Text style={styles.titletxt}>محتويات العرض من خدماتي</Text>
                <View style={styles.content}>
                    {renderOfferContent()}
                </View>
                {isOtherContent()}
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
    contentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        width: '100%',
        marginVertical: 10,
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
    editView: {
        position: 'absolute',
        top: 0,
    },
    detailModal: {
        width: '100%',
        height: '70%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        //borderWidth: 1,
    },
    modalFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
    },
    detailView: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray'
    },
    subDetView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 5,
        width: '95%',
        alignSelf: 'center'
    },
    subTxt: {
        fontSize: 16,
        color: 'black'
    },
    checkView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        marginLeft: 10,
        borderWidth: 2
    }
})
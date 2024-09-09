import { StyleSheet, Text, View, Image, Pressable, ScrollView, TextInput, ToastAndroid, Modal, Alert } from 'react-native'
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
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';

const ProviderOfferDesc = (props) => {
    const { data } = props.route?.params || {}
    const { campInfo, setCampInfo, isFirst } = useContext(SearchContext);
    const { Region, serviceInfoAccorUser } = useContext(ServiceProviderContext);

    const [Title, setTitle] = useState(data.campTitle);
    const [expirDate, setExpirDate] = useState(data.campExpirDate);
    const [offerPrice, setOfferPrice] = useState(data.campCost);
    const [offerPriceInclude, setOfferPriceInclude] = useState(data.priceInclude);
    const [subDetContent, setSubDetContent] = useState(data.contentFromSubDet)
    const [offerRegions, setOfferRegions] = useState(data.campRigon)

    const [otherContent, setOtherContent] = useState(data.campContents)
    const [otherContentItem, setOtherContentItem] = useState()

    const [offerImg, setOfferImg] = useState()

    const [editTitle, setEditTitle] = useState(false);
    const [editImg, setEditImg] = useState(false);
    const [editExDate, setEditExDate] = useState(false);
    const [editPrice, setEditPrice] = useState(false);
    const [editIncludingPrice, setEditIncludingPrice] = useState(false);
    const [isRenewDate, setIsRenewDate] = useState(false);
    const [showContentModal, setShowContentModal] = useState(false);
    const [showRegionModal, setShowRegionModal] = useState(false);

    const [PerPackage, setPerPackage] = useState(false);
    const [PerPerson, setPerPerson] = useState(false);
    const [PerTable, setPerTable] = useState(false);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const selectedOfferIndex = campInfo?.findIndex(item => item.CampId === data.CampId)
    const today = moment(date, "YYYY-MM-DD")
    let day = today.format('D')
    let month = today.format('M')
    let year = today.format('YYYY')
    let completeDate = year + '-' + month + '-' + day


    const filterServiceInfo = () => {
        return serviceInfoAccorUser.filter(item => {
            return item.service_id === data.serviceId
        })
    }
    const getServiceDetail = (id) => {
        const data = filterServiceInfo()
        const serviceData = data[0].additionalServices.filter(element => {
            return element.subDetailArray.find(itemId => {
                return itemId.id === id
            })
        })
        return serviceData
    }

    const getSerSubDet = (id) => {
        const data = getServiceDetail(id)
        const subDetInfo = data[0].subDetailArray.filter(item => {
            return item.id === id
        })
        return subDetInfo
    }

    useEffect(() => {
        if (completeDate > data.campExpirDate) {
            setIsRenewDate(true)
        }
        priceIncludWhenLoad()
    }, []);

    const priceIncludWhenLoad = () => {
        if (offerPriceInclude === "perRequest") {
            setPerPackage(true)
            setPerPerson(false)
            setPerTable(false)
        }
        if (offerPriceInclude === "perPerson") {
            setPerPackage(false)
            setPerPerson(true)
            setPerTable(false)
        }
        if (offerPriceInclude === "perTable") {
            setPerPackage(false)
            setPerPerson(false)
            setPerTable(true)
        }
    }

    const Package = () => {
        setPerPackage(true)
        setPerPerson(false)
        setPerTable(false)
        setOfferPriceInclude("perRequest")
    }
    const Person = () => {
        setPerPackage(false)
        setPerPerson(true)
        setPerTable(false)
        setOfferPriceInclude("perPerson")
    }
    const Table = () => {
        setPerPackage(false)
        setPerPerson(false)
        setPerTable(true)
        setOfferPriceInclude("perTable")
    }

    const getServiceForDetail = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === isFirst;
        });
    };
    const onPressBackHandler = () => {
        props.navigation.goBack();
    };
    // const closeModalPress = () => {
    //     setShowContentModal(false)
    // }

    const titleEditPress = () => {
        setEditTitle(true)
    }
    const expireDateEditPress = () => {
        setEditExDate(true)
        showMode('date')
    }
    const priceEditPress = () => {
        setEditPrice(true)
    }
    const includePriceEditPress = () => {
        setEditIncludingPrice(true)
    }
    const contentItemEditPress = () => {
        setShowContentModal(true)
    }
    const editOthContPress = (item, setShowOthContModal, setEditOtherContItem) => {

        setOtherContentItem(item)
        setEditOtherContItem(true)
        setShowOthContModal(false)
    }

    const regionEditPress = () => {
        setShowRegionModal(true)
    }
    const checkIsdataFilled = (value, update) => {
        if (value.length > 2) {
            update()
        } else {
            Alert.alert(
                'تنبية',
                '  الرجاء التأكد من تعبئة البيانات',
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

    const editItem = (state, setstate, update) => {
        if (Number.isInteger(state)) {
            state = state.toString()
        }

        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={() => checkIsdataFilled(state, update)} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <TextInput
                        style={state !== '' ? styles.input : styles.inputNotFilled}
                        keyboardType='default'
                        value={state}
                        placeholder={state || ''}
                        onChangeText={val => setstate(val)}
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
                        value={otherContentItem}
                        placeholder={otherContentItem || ''}
                        onChangeText={(text) => setOtherContentItem(text)}
                    />
                </View>
            </View>)
    }
    const editPriceInclude = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={updateWhatPriceInclude} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <View>
                        <View style={{ marginRight: 20 }}>
                            <Text style={styles.Infotxt}>ماذا يشمل هذا السعر ؟</Text>
                            <Pressable style={[PerPackage ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Package}>
                                <Text style={styles.Infotxt}>لكل الحجز</Text>
                            </Pressable>

                            <Pressable style={[PerPerson ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Person}>
                                <Text style={styles.Infotxt}>حسب الشخص</Text>
                            </Pressable>

                            <Pressable style={[PerTable ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={Table}>
                                <Text style={styles.Infotxt}>حسب الطاولة</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>)
    }


    // Update functions
    const updateFunction = (newData, setstate) => {
        const selectedOfferIndex = campInfo?.findIndex(item => item.CampId === data.CampId)
        const campData = campInfo || [];

        uodateCampaignsById(newData).then(res => {

            if (selectedOfferIndex > -1) {
                campData[selectedOfferIndex] = { ...campData[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...campData])
                setstate(false)
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
            CampId: data.CampId,
            campTitle: Title
        }
        updateFunction(newData, setEditTitle)
    }
    const updateEpireDate = () => {
        const newData = {
            CampId: data.CampId,
            campExpirDate: expirDate
        }
        updateFunction(newData, setEditExDate)
    }
    const updatePrice = () => {
        const newData = {
            CampId: data.CampId,
            campCost: offerPrice
        }
        updateFunction(newData, setEditPrice)
    }
    const updateImage = () => {
        const newData = {
            CampId: data.CampId,
            campImag: offerImg
        }
        uodateCampaignsById(newData).then(res => {
            const data = campInfo || [];
            if (selectedOfferIndex > -1) {
                data[selectedOfferIndex] = { ...data[selectedOfferIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setCampInfo([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })
    }
    const updateWhatPriceInclude = () => {
        const newData = {
            CampId: data.CampId,
            priceInclude: offerPriceInclude
        }
        updateFunction(newData, setEditIncludingPrice)
    }
    const updateContentItem = () => {
        const newData = {
            CampId: data.CampId,
            contentFromSubDet: subDetContent
        }
        updateFunction(newData, setShowContentModal)
    }
    const updateOfferWorkRegion = () => {
        const newData = {
            CampId: data.CampId,
            campRigon: offerRegions
        }
        updateFunction(newData, setShowRegionModal)

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
        updateFunction(newData, setEditOtherContItem)
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
    const renderOfferTitle = () => {
        return (<View>
            {editTitle ? editItem(Title, setTitle, updateTitle) :
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable onPress={titleEditPress}>
                            <Feather
                                style={styles.menuIcon}
                                name={'edit'}
                                color={colors.BGScereen}
                                size={25} />
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{Title}</Text>
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
    /// change Photo
    const onAddImgPress = async () => {
        try {
            let options = {
                mediaType: 'photo',
                includeBase64: false,
            };
            launchImageLibrary(options, response => GalleryImageResponse(response));
            setEditImg(true)
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
            //console.log(source);
            updateImage()
        } else {
            console.log('error source isnt legable, source is :', source);
        }
    };
    const renderOfferImage = () => {
        return (
            <View>
                <View style={styles.imagView}>
                    <View style={styles.offerImg}>
                        <Image style={styles.img} source={editImg ? { uri: offerImg } : { uri: data.campImag }} />
                    </View>
                    <Pressable style={styles.editImg} onPress={onAddImgPress}>
                        <Entypo name={'camera'} color={colors.puprble} size={25} />
                    </Pressable>
                </View>
            </View>
        );
    }

    //// Expire Date
    const editEpireDate = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Pressable onPress={updateEpireDate} style={styles.itemFooter}>
                        <Feather
                            name={'save'}
                            color={colors.BGScereen}
                            size={20} />
                    </Pressable>
                    <View style={styles.editExpireDateView}>
                        <Text style={styles.Infotxt}>{moment(expirDate).format('l')}</Text>
                    </View>
                </View>
            </View>)
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();

        if (completeDate < fDate) {
            setExpirDate(fDate);
        } else {
            setExpirDate(expirDate);
        }
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const renderOfferExDate = () => {
        return (<View>
            {editExDate ? editEpireDate() :
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable onPress={expireDateEditPress}>
                            {isRenewDate ? <Text style={{ color: colors.BGScereen }}>تجديد العرض</Text> :
                                <Feather
                                    name={'edit'}
                                    color={colors.BGScereen}
                                    size={25} />}
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{moment(expirDate).format('l')}</Text>
                            <Text style={styles.basicInfoTitle}>تاريخ الصلاحية</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <FontAwesome name={'calendar-check-o'} color={colors.puprble} size={25} />
                    </View>
                </View>
            }
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    display='spinner'
                    onChange={onChange}
                />
            )}
        </View>
        )
    }

    // Price 
    const renderOfferPrice = () => {
        return (<View>
            {editPrice ? editItem(offerPrice, setOfferPrice, updatePrice) :
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable onPress={priceEditPress}>
                            <Feather
                                style={styles.menuIcon}
                                name={'edit'}
                                color={colors.BGScereen}
                                size={25} />
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{offerPrice}</Text>
                            <Text style={styles.basicInfoTitle}>السعر</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <Ionicons name={'pricetag'} color={colors.puprble} size={25} />
                    </View>
                </View>}
        </View>
        )
    }
    const renderOfferPriceInclude = () => {
        let includeLabel = ''
        if (offerPriceInclude === "perPerson") {
            includeLabel = "للشخص الواحد"
        } else if (offerPriceInclude === "perTable") {
            includeLabel = "للطاولة"
        } else {
            includeLabel = "لكل الحجز"
        }
        return (<View>
            {editIncludingPrice ? editPriceInclude() :
                <View style={styles.itemOffer}>
                    <View style={styles.item}>
                        <Pressable onPress={includePriceEditPress}>
                            <Feather
                                style={styles.menuIcon}
                                name={'edit'}
                                color={colors.BGScereen}
                                size={25} />
                        </Pressable>
                        <View>
                            <Text style={styles.Infotxt}>{' السعر يشمل' + ' ' + includeLabel}</Text>
                        </View>
                    </View>
                    <View style={styles.IconView}>
                        <Entypo name={'info'} color={colors.puprble} size={25} />
                    </View>
                </View>}
        </View >
        )
    }


    // Content from sub Detail
    const renderOfferContent = () => {
        return (
            <View>
                <Pressable style={styles.editView} onPress={contentItemEditPress}>
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
        return subDetContent.map(itemID => {
            const titleInfo = getSerSubDet(itemID)
            return (
                <View style={styles.contentItem}>
                    <Text style={styles.Infotxt}>{titleInfo[0].detailSubtitle}</Text>
                    <View style={styles.IconView}>
                        <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
                    </View>
                </View>
            )
        })
    }
    const checkContentPressed = (id) => {
        if (subDetContent.includes(id)) {
            return true
        } else {
            return false
        }
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
                        const [selectedSubDetail, setselectedSubDetail] = useState(checkContentPressed(sub.id));
                        return (
                            <View style={styles.subDetView}>
                                <Text style={styles.subTxt}>{sub.detailSubtitle}</Text>
                                <Pressable style={styles.checkView} onPress={() => whenSubDetailPress(sub.id, setselectedSubDetail, selectedSubDetail)}>
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
                        <View style={styles.modalHeader}>
                            <Pressable style={styles.modalSave} onPress={updateContentItem}>
                                <Text style={styles.headerTxt}>حفظ</Text>
                            </Pressable>

                            <Text style={styles.headerTxt}>القائمة</Text>
                        </View>
                        <ScrollView>
                            {getSerDetailForContent()}
                        </ScrollView>

                    </View>
                </View>
            </Modal>
        )
    }

    /// Other content offer
    const isOtherContent = () => {
        if (otherContent !== undefined) {
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
        return otherContent?.map(item => {
            const [editOtherContItem, setEditOtherContItem] = useState(false);
            const [showOthContModal, setShowOthContModal] = useState(false);
            return (<View>
                {editOtherContItem ? editOtherContentItem(item, setEditOtherContItem) :
                    <View style={styles.itemOffer}>
                        <View style={styles.item}>
                            <Pressable onPress={() => setShowOthContModal(true)}>
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
                {renderOtherContentModal(item, setEditOtherContItem, showOthContModal, setShowOthContModal)}
            </View>
            )
        })
    }
    const closeModal = (setShowOthContModal) => {
        setShowOthContModal(false)
    }
    const renderOtherContentModal = (item, setEditOtherContItem, showOthContModal, setShowOthContModal) => {

        return (
            <Modal
                transparent
                visible={showOthContModal}
                animationType='fade'
                onRequestClose={() => setShowOthContModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View>
                            <Pressable onPress={() => closeModal(setShowOthContModal)} style={styles.modalHeader}>
                                <Feather
                                    style={styles.menuIcon}
                                    name={'more-horizontal'}
                                    color={colors.puprble}
                                    size={25} />
                            </Pressable>
                        </View>
                        <View style={{ justifyContent: 'flex-end', height: '100%' }}>
                            <View style={styles.modalMenu}>
                                <Pressable style={styles.modalItem} onPress={() => editOthContPress(item, setShowOthContModal, setEditOtherContItem)}>
                                    <Feather
                                        name={'edit'}
                                        color={colors.gray}
                                        size={25} />
                                    <Text style={styles.modalHeaderTxt}>تعديل</Text>
                                </Pressable>
                                <Pressable style={styles.modalItem} //onPress={() => deleteDescItemPress(item, setShowDescModal)}
                                >
                                    <AntDesign
                                        name={'delete'}
                                        color={colors.gray}
                                        size={25} />
                                    <Text style={styles.modalHeaderTxt}>حذف</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
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
        return offerRegions.map(item => {
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
    const checkRegionPressed = (regionName) => {
        if (offerRegions.includes(regionName)) {
            return true
        } else {
            return false
        }
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
            const [selectedRegion, setselectedRegion] = useState(checkRegionPressed(item.regionName));
            return (
                <View>
                    <Pressable style={[styles.selectBoxView, selectedRegion ? styles.selectBoxPressed : styles.selectBoxView]}
                        onPress={() => whenRegionPress(item.regionName, setselectedRegion, selectedRegion)}>
                        <Text style={styles.regionTxt}>{item.regionName}</Text>
                    </Pressable>
                </View>)
        })
    }
    const checkIsWorRegFilled = () => {
        if (offerRegions.length < 1) {
            Alert.alert(
                'تنبية',
                '  الرجاء التأكد من اختيار مناطق ترويج العرض',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                { cancelable: false } // Prevent closing the alert by tapping outside
            );
        } else {
            updateOfferWorkRegion()
        }

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
                        <View style={styles.modalHeader}>
                            <Pressable style={styles.modalSave} onPress={checkIsWorRegFilled}>
                                <Text style={styles.headerTxt}>حفظ</Text>
                            </Pressable>

                            <Text style={styles.headerTxt}>المناطق</Text>
                        </View>

                        <ScrollView>
                            {getRegion()}
                        </ScrollView>

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
                    {renderOfferPriceInclude()}
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
        fontWeight: 'bold'
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
    // Priceitem: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     width: '96%',
    //     marginVertical: 5,
    // },
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
    inputNotFilled: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: 'white',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5
    },
    editExpireDateView: {
        height: 50,
        width: '90%',
        borderWidth: 0.6,
        borderRadius: 8,
        borderColor: 'white',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editView: {
        position: 'absolute',
        top: 0,
    },
    detailModal: {
        width: '90%',
        height: '90%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalRHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        //borderWidth: 1,
    },
    modalSave: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        width: '20%',
        height: 40,
        borderRadius: 8,
        borderColor: colors.puprble
    },
    detailView: {
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        borderRadius: 10
    },
    subDetView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 5,
        width: '90%',
        alignSelf: 'center',
        paddingHorizontal: 5,
    },
    subTxt: {
        fontSize: 16,
        color: colors.puprble
    },
    regionTxt: {
        fontSize: 20,
        color: colors.puprble
    },
    checkView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 35,
        height: 35,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: colors.silver,
        borderRadius: 10,
    },
    selectBoxView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 50,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: colors.silver,
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 5
    },
    selectBoxPressed: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 50,
        marginLeft: 10,
        borderWidth: 3,
        borderColor: colors.puprble,
        borderRadius: 10,
    },
    itemPersonView: {
        borderWidth: 2,
        borderColor: '#dcdcdc',
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    itemPersonViewPressed: {
        borderWidth: 3,
        borderColor: colors.puprble,
        width: '90%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10
    },
    // detailModal: {
    //     width: '100%',
    //     height: '15%',
    //     backgroundColor: '#ffffff',
    //     borderTopLeftRadius: 20,
    //     borderTopRightRadius: 20
    // },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10
        // alignItems: 'center',
        // justifyContent: 'center',
        // height: 50,
        // borderWidth: 1
        // marginBottom: 30,
        // position: 'absolute',
        // top: 0
    },
    modalMenu: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    modalItem: {
        alignItems: 'center'
    },
    modalHeaderTxt: {
        fontSize: 18
    },
})
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal,TextInput,ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colors } from "../assets/AppColors"
import { ScreenNames } from '../../route/ScreenNames';
import UsersContext from '../../store/UsersContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateUserData } from '../resources/API';

const ClientProfile = (props) => {
    const { userInfo, setUserInfo, userId } = useContext(UsersContext);
    const userData = userInfo.user
    

    const [spcialEvents, setSpcialEvents] = useState(userData[0].SpecialDates)

    const clientReview = true
    const selectedUserIndex = userData?.findIndex(item => item.USER_ID === userId)

    const [showSpecialDMoodal, setShowSpecialDMoodal] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState(null);
    const [eventdate, setEventDate] = useState();

    const backPress = () => {
        props.navigation.goBack();
    }

    const seprator = () => {
        return (
            <View style={styles.seprater}></View>
        )
    }
    const closeModalPress = () => {
        setShowSpecialDMoodal(false)
    }
// add new specail dates
    const onChange = (event, selectedDate) => {
        setShow(false)
        const currentDate = selectedDate || date;
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getDate() ;

        setEventDate(fDate);
        onSetEventDate(eventTitle, fDate)
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const onSetEventDate = (evTitle, evDate) => {
        const data = {
            eventName: evTitle,
            eventDate: evDate,
        }
        addSpecialDateProcess(data)
    }
    const specialDatesItem = () => {
        return userData[0].SpecialDates.map(item => {
            return (
                <View style={styles.item}>
                    <View><Text style={styles.basicInfo}>{item.eventDate}</Text>
                        <Text style={styles.basicInfoTitle}>{item.eventName}</Text>
                    </View>
                    <View style={styles.IconView}>
                        <MaterialIcons
                            name={"event-note"}
                            color={colors.puprble}
                            size={25} />
                    </View>
                </View>
            )
        })
    }
    const renderSpecialEvents = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => setShowSpecialDMoodal(true)}>
                <Text style={styles.basicInfo}>اضافة</Text>
                <View style={styles.IconView}>
                    <Entypo
                        name={"add-to-list"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
            {specialDatesItem()}
            <Pressable style={styles.more} onPress={() => props.navigation.navigate(ScreenNames.ClientSpecialDates)}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
            {renderSpecialDModal()}
        </View>)
    }
    const renderSpecialDModal = () => {
        return (
            <Modal
                transparent
                visible={showSpecialDMoodal}
                animationType="slide"
                onRequestClose={() => setShowSpecialDMoodal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                            <Feather
                                style={styles.menuIcon}
                                name={'more-horizontal'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        <View>
                            {addNewSpecialDate()}
                        </View>
                        <Pressable style={styles.modalFooter} onPress={updateUserSDates}>
                            <Text>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
    const addSpecialDateProcess = (data) => {
        let newSDIndex = spcialEvents.length - 1
        setSpcialEvents(prevArray => {
            const newArray = [...prevArray];
            newArray[newSDIndex + 1] = data;
            return newArray;
        });
    };
    const updateUserSDates = () =>{
        const selectedUserIndex = userData?.findIndex(item => item.USER_ID === userId)
        const newData = {
            USER_ID: userId,
            SpecialDates: spcialEvents
        }
        updateUserData(newData).then(res => {
            const data = userInfo || [];
            if (selectedUserIndex > -1) {
                data[selectedUserIndex] = { ...data[selectedUserIndex], ...newData };
            }
            if (res.message === 'Updated Sucessfuly') {
                setUserInfo([...data])
                setShowSpecialDMoodal(false)
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }

        })
    }
    const addNewSpecialDate = () => {
        return (
            <View style={{ width: '90%', alignSelf: 'center',marginTop: 50 }}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='أسم المناسبة '
                    value={eventTitle}
                    onChangeText={(val) => setEventTitle(val)}
                    onSubmitEditing={(val) => {
                        const data = {
                            eventName: eventTitle,
                            eventDate: eventdate,
                        }
                         addSpecialDateProcess(data)
                    }}
                />
                <Pressable onPress={() => showMode('date')}>
                    <View style={styles.Bdate}>
                        <Text >{eventdate}</Text>
                        <Entypo
                            style={styles.logoDate}
                            name={"calendar"}
                            color={"black"}
                            size={30} />
                    </View>
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
                </Pressable>
            </View>
        )
    }

    ///
    const renderRelations = () => {
        return (<View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>اضافة علاقة</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"add-to-list"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>فادي</Text>
                    <Text style={styles.basicInfoTitle}>صديق</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"adduser"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <View style={styles.item}>
                <Pressable>
                    <Text style={styles.basicInfo}>أحمد</Text>
                    <Text style={styles.basicInfoTitle}>أخ</Text>
                </Pressable>
                <View style={styles.IconView}>
                    <AntDesign
                        style={styles.icon}
                        name={"adduser"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </View>
            <Pressable style={styles.more} onPress={() => props.navigation.navigate(ScreenNames.ClientRelations)}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderReservation = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View><Text style={styles.basicInfo}>عيد ميلاد أحمد</Text>
                    <Text style={styles.basicInfoTitle}>عيد ميلاد</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"cake"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
            <Pressable style={styles.item}>
                <View><Text style={styles.basicInfo}>ذكرى زواجنا</Text>
                    <Text style={styles.basicInfoTitle}>عيد زواج</Text>
                </View>
                <View style={styles.IconView}>
                    <Entypo
                        style={styles.icon}
                        name={"cake"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
            <Pressable style={styles.more}>
                <Text style={styles.moreTxt}>المزيد...</Text>
            </Pressable>
        </View>)
    }
    const renderFavorite = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.FileFavorites)}>
                <View>
                    <Text style={styles.basicInfo}> المفضلة</Text>
                </View>
                <View style={styles.IconView}>
                    <Fontisto
                        style={styles.icon}
                        name={"favorite"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderFeedBack = () => {
        return (<View>
            <Pressable style={styles.item} onPress={() => props.navigation.navigate(ScreenNames.ReviewsScreen, { clientReview })}>
                <View>
                    <Text style={styles.basicInfo}>التغذية الراجعة (2)</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"notes"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const renderPayments = () => {
        return (<View>
            <Pressable style={styles.item}>
                <View>
                    <Text style={styles.basicInfo}>دفعاتي</Text>
                </View>
                <View style={styles.IconView}>
                    <MaterialIcons
                        style={styles.icon}
                        name={"payments"}
                        color={colors.puprble}
                        size={25} />
                </View>
            </Pressable>
        </View>)
    }
    const header = () => {
        return (
            <View style={styles.title}>
                <Pressable onPress={backPress}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={25} />
                </Pressable>
                <Text style={styles.titleTxt}>البروفايل</Text>
            </View>)
    }
    const renderUserNameImag = () => {
        return (
            <View style={styles.imgView}>
                <Pressable onPress={() => props.navigation.navigate(ScreenNames.UserProfile)}>
                    <Text style={styles.userName}>{userData[0].User_name}</Text>
                </Pressable>
                <Image style={styles.profilImg} source={userData[0].UserPhoto ? { uri: userData[0].UserPhoto } : require('../assets/photos/user.png')} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderUserNameImag()}
                {seprator()}

                <Text style={styles.txt}>العمليات</Text>
                <View style={styles.viewSet}>
                    {/* {renderFavorite()} */}
                    {renderPayments()}
                    {renderFeedBack()}
                </View>

                <Text style={styles.txt}>مناسبات خاصة</Text>
                <View style={styles.viewSet}>
                    {renderSpecialEvents()}
                </View>

                <Text style={styles.txt}>العلاقات (2)</Text>
                <View style={styles.viewSet}>
                    {renderRelations()}
                </View>

                <Text style={styles.txt}>المناسبات السابقة</Text>
                <View style={styles.viewSet}>
                    {renderReservation()}
                </View>
                <View style={{ height: 110 }}></View>
            </ScrollView>
        </View>
    )
}

export default ClientProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BGScereen,
        marginBottom: 70
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    titleTxt: {
        fontSize: 18,
        color: colors.puprble,
    },
    seprater: {
        borderColor: colors.puprble,
        borderWidth: 0.2,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    imgView: {
        width: "95%",
        // height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // elevation: 5,
        // shadowColor: colors.puprble,
        // backgroundColor: 'white',
        alignSelf: 'center',
        margin: 5
    },
    profilImg: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: colors.BGScereen,
        borderWidth: 3,
        borderColor: colors.puprble,
    },
    userName: {
        fontSize: 20,
        color: colors.puprble,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    content: {
        marginRight: 20,
    },
    viewSet: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
        fontWeight: 'bold',
        marginVertical: 10,
        marginRight: 20
    },
    basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
    },
    basicInfoTitle: {
        fontSize: 12,
        textAlign: 'right'
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
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10
    },
    more: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    moreTxt: {
        fontSize: 15
    },
    detailModal: {
        width: '90%',
        height: '35%',
        backgroundColor: '#ffffff',
        borderRadius: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    modalHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        position: 'absolute',
        top: 0
    },
    modalFooter: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,

    },
    input: {
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 20,
        color: 'black',
        backgroundColor: 'lightgray',
      },
      Bdate: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderColor: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'black',
        backgroundColor: 'lightgray',
      },
      logoDate: {
        marginHorizontal: 30,
        marginLeft: 20
      },
})
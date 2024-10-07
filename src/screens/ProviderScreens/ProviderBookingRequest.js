import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import SearchContext from '../../../store/SearchContext';
import { showMessage } from '../../resources/Functions';
import { addNewbookingDate, updatebookingDate } from '../../resources/API';
import { TouchableOpacity } from 'react-native';
import { ScreenNames } from '../../../route/ScreenNames';

const ProviderBookingRequest = (props) => {
  const { fulDate, mutibleReservation, filterdRequestAccUser, setBookingDates, bookingDates } = props.route?.params || {}
  const { requestInfoByService, isFirst } = useContext(SearchContext);

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(true);
  const [datesArray, setDatesArray] = useState();
  const [fromReservationScreen, setfromReservationScreen] = useState(true)
  const selectedDate = moment(fulDate).format('L')

var srselectedDate
  if (fulDate) {
    var requestDate = new Date(fulDate)
    srselectedDate = requestDate.toISOString()
  }


  var todayDate = new Date();
  var dayStutes
  todayDate.setHours(0);
  todayDate.setMinutes(0);
  todayDate.setSeconds(0);
  todayDate.setMilliseconds(0);


  const manageArrayDates = []

  const onPressHandler = () => {
    props.navigation.goBack();
  }

  const header = () => {
    return (
      <View style={styles.title}>
        <TouchableOpacity onPress={onPressHandler}
        >
          <Ionicons
            style={styles.iconback}
            name={"arrow-back"}
            color={"black"}
            size={25} />
        </TouchableOpacity>
        {/* this a place that check the data   */}
        {requestDate > todayDate && <TouchableOpacity onPress={moreModalPress} style={styles.morePress}
        >
          <Fontisto
            style={styles.iconmore}
            name={"more-v"}
            color={"black"}
            size={20} />
        </TouchableOpacity>}
      </View>
    )
  }

  /// desplay more modal
  const moreModal = () => {
    return (
      <Modal
        transparent
        visible={showMoreModal}
        animationType='slide'
        onRequestClose={() => setShowMoreModal(false)}>
        <View style={styles.centeredMoreView}>
          <View style={styles.moreModal}>

            <Pressable style={styles.modalHeader} onPress={() => setShowMoreModal(false)}>
              <Text style={styles.modalHeaderTxt}>...</Text>
            </Pressable>

            <View style={styles.modalbody}>
              {moreOperation()}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
  const moreModalPress = () => {
    setShowMoreModal(true)
  }

  const filterBookingDates = () => {
    var time
    return bookingDates[0].dates.filter(item => {
      time = new Date(item.time)
      const srTime = time.toISOString()
      return srTime == srselectedDate
    })
  }
  const changeDateStatus = (dateStatus) => {
    const result = filterBookingDates()
    if (result.length >= 1) {
      //// Update
      updateRecordDate(dateStatus)
    } else {
      //// Add
      addNewRecordDate(dateStatus)
    }
  }
  const addNewRecordDate = (dateStatus) => {
    const dateInfo = {
      time: fulDate,
      status: dateStatus
    }
    const RecordInfo = {
      serviceID: isFirst,
      datesToAdd: dateInfo
    }
    addNewbookingDate(RecordInfo).then((res) => {
      if (res.message === 'Dates have been added') {
        // setBookingDates(res)
        showMessage("success")

      } else {
        showMessage("failed to create request")
      }
    }).catch((E) => {
      console.error("error creating request E:", E);
    })

  }
  const updateRecordDate = (dateStatus) => {
    const dateInfo = {
      time: fulDate,
      status: dateStatus
    }
    const RecordInfo = {
      serviceID: isFirst,
      datesToUpdate: dateInfo
    }
    updatebookingDate(RecordInfo).then((res) => {
      if (res.message === 'Dates updated successfully') {
        // setBookingDates(res)
        showMessage("updated")

      } else {
        showMessage("failed to create request")
      }
    }).catch((E) => {
      console.error("error creating request E:", E);
    })

  }

  const deleteRecordDate = () => {
    const datesArray = bookingDates[0].dates.filter(item => item.time !== fulDate)
    const RecordInfo = {
      serviceID: isFirst,
      datesToUpdate: datesArray
    }
    updatebookingDate(RecordInfo).then((res) => {
      if (res.message === 'Dates updated successfully') {
        // setBookingDates(res)
        showMessage("updated")

      } else {
        showMessage("failed to create request")
      }
    }).catch((E) => {
      console.error("error creating request E:", E);
    })

  }
  const vacationDayPress = () => {
    changeDateStatus('holiday')
    setShowMoreModal(false)
  }
  const closeDayPress = () => {
    changeDateStatus('full')
    setShowMoreModal(false)
  }
  const openDayPress = () => {
    deleteRecordDate()
    setShowMoreModal(false)
  }

  useEffect(() => {
    if (fulDate) {
      dayStutes = filterBookingDates()

      if (dayStutes.length > 0) {
        if (requestDate > todayDate) {
          if (dayStutes[0].status === 'full' || dayStutes[0].status === 'holiday') {
            setIsDateOpen(false)
          }
        } else {
          setIsDateOpen(false)
        }
      } else {
        if (requestDate < todayDate) {
          setIsDateOpen(false)
        }
      }
    }
  }, [])

  const moreOperation = () => {
    return (
      <View style={styles.moreChoice}>
        <TouchableOpacity style={styles.moreItem} onPress={vacationDayPress}>
          <Text style={styles.moreTxt}>تعيين كيوم عطلة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreItem} onPress={closeDayPress}>
          <Text style={styles.moreTxt}>اغلاق باب الحجز</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.moreItem} onPress={openDayPress}>
          <Text style={styles.moreTxt}>فتح باب الحجز</Text>
        </TouchableOpacity>
      </View>
    )
  }

  ///// searching according spacific data

  const getBookingInfo = () => {
    var resDate
    if (requestInfoByService.message !== "no Request") {
      const reqInfo = requestInfoByService.filter(item => {
        const requstStatus = item.requestInfo.ReqStatus === 'partially paid' || item.requestInfo.ReqStatus === 'paid all' ||
          item.requestInfo.ReqStatus === 'completed'

        return item.requestInfo.reservationDetail.find(dat => {
          resDate = new Date(dat.reservationDate)
          const srResDate = resDate.toISOString()
          return requstStatus && srResDate == srselectedDate
        })
      })
      return reqInfo
    } else {
      return []
    }
  }

  const renderBookingCard = () => {
    const data = getBookingInfo()
    return data.map(item => {
      return (
        <ProviderReservationCard fromReservationScreen={fromReservationScreen} {...item} />
      )
    })
  }
  const renderSelectedDate = () => {
    return (
      <View>
        {renderDayStutes()}
        {isDateOpen && renderCreateRequest()}
        <View style={styles.dateView}>
          <Text style={styles.txt}>{moment(fulDate).format('dddd')}</Text>
          <Text style={styles.txt}>{selectedDate}</Text>
        </View>
        {renderBookingCard()}
      </View>
    )
  }

  const renderDayStutes = () => {
    dayStutes = filterBookingDates()
    var label
    if (requestDate > todayDate) {
      if (dayStutes.length > 0) {
        if (dayStutes[0].status === 'full') {
          label = 'الحجز مغلق'
        } else {
          label = 'يوم عطلة'
        }
      } else {
        label = 'الحجز مفتوح'
      }
    } else {
      label = 'يوم سابق'
    }

    return (
      <View style={styles.operationView}>
        <Text style={styles.txt}>{label}</Text>
      </View>
    )
  }
  const renderCreateRequest = () => {
    return (
      <TouchableOpacity style={styles.operationView} onPress={() => props.navigation.navigate(ScreenNames.ProviderSetNewBooking)}>
        <Text style={styles.txt}>انشاء حجز</Text>
      </TouchableOpacity>
    )
  }

  //////// Searching by Client Name

  const manageDatesusingSearchbyName = () => {
    let requestBookingDate = ''
    const data = filterdRequestAccUser

    return data.map(item => {
      const respons = item.requestInfo.reservationDetail.map(multiItem => {
        requestBookingDate = multiItem.reservationDate
        if (!(manageArrayDates.includes(requestBookingDate))) {
          manageArrayDates.push(requestBookingDate)
        }
      })
      manageArrayDates.sort();
      return respons
    })
  }
  const filterReqAccUserId = (resDate) => {
    const data = filterdRequestAccUser
    const reqInfo = data.filter(item => {
      return item.requestInfo.reservationDetail.find(multiItem => {
        return multiItem.reservationDate === resDate
      })
    })
    return reqInfo
  }
  const renderBookingCardforSearch = (resDate) => {
    const data = filterReqAccUserId(resDate)
    return data.map(item => {
      return (
        <ProviderReservationCard fromReservationScreen={fromReservationScreen}  {...item} resDate={resDate} />
      )
    })
  }
  const renderRequestAccUserName = () => {
    manageDatesusingSearchbyName()
    return manageArrayDates.map(item => {
      return (
        <View>
          <View style={styles.dateView}>
            <Text style={styles.txt}>{moment(item).format('dddd')}</Text>
            <Text style={styles.txt}>{moment(item).format('L')}</Text>
          </View>
          {renderBookingCardforSearch(item)}
        </View>
      )
    })
  }


  return (
    <View style={styles.container}>
      {header()}
      {mutibleReservation ? renderRequestAccUserName() : renderSelectedDate()}
      {moreModal()}
    </View>
  )
}


export default ProviderBookingRequest

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
  },
  iconback: {
    //alignSelf: 'flex-start',
    marginLeft: 10,
  },
  iconmore: {
    //alignSelf: 'flex-start',
    marginRight: 10,
  },
  txt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 20,
    color: colors.puprble
  },
  dateView: {
    backgroundColor: colors.silver,
    height: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    marginVertical: 5
  },
  operationView: {
    backgroundColor: colors.silver,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginVertical: 5
  },
  modalbody: {
    paddingHorizontal: 5
  },
  moreModal: {
    width: '95%',
    height: '30%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centeredMoreView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
  },
  modalHeaderTxt: {
    fontSize: 18
  },
  moreItem: {
    alignSelf: 'center',
    marginVertical: 2,
    alignItems: 'center',
    borderColor: colors.silver,
    borderRadius: 20,
    borderWidth: 1,
    width: '100%',
    height: '20%'
  },
  moreChoice: {

  },
  moreTxt: {
    fontSize: 18,
    color: colors.puprble
  },
  morePress: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
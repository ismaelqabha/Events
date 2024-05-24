import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import ProviderReservationCard from '../../components/ProviderComponents/ProviderReservationCard';
import { colors } from '../../assets/AppColors';
import moment from "moment";
import SearchContext from '../../../store/SearchContext';
import { showMessage } from '../../resources/Functions';
import { addNewbookingDate, updatebookingDate } from '../../resources/API';

const ProviderBookingRequest = (props) => {
  const { fulDate, mutibleReservation, filterdRequestAccUser, setBookingDates, bookingDates } = props.route?.params || {}
  const { requestInfoByService, isFirst } = useContext(SearchContext);

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [datesArray, setDatesArray] = useState();
  const [fromReservationScreen, setfromReservationScreen] = useState(true)
  const selectedDate = moment(fulDate).format('L')

  const today = moment(new Date(), "YYYY-MM-DD")
  const day = today.format('D')
  const month = today.format('M')
  const year = today.format('YYYY')
  const todayDate = year + '-' + month + '-' + day
  const fullDateObj = new Date(fulDate); // Assuming fullDate is coming as a string in 'YYYY-MM-DD' format
  const todayDateObj = new Date(todayDate);


  const manageArrayDates = []

  const onPressHandler = () => {
    props.navigation.goBack();
  }

  const header = () => {
    return (
      <View style={styles.title}>
        <Pressable onPress={onPressHandler}
        >
          <Ionicons
            style={styles.iconback}
            name={"arrow-back"}
            color={"black"}
            size={25} />
        </Pressable>
        <Text style={styles.txt}>الحجوزات</Text>
         {/* this a place that check the data   */}
        {fullDateObj > todayDateObj && <Pressable onPress={moreModalPress}
        >
          <Fontisto
            style={styles.iconmore}
            name={"more-v"}
            color={"black"}
            size={20} />
        </Pressable>}
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
    return bookingDates[0].dates.filter(item => {
      return item.time == fulDate
    })
  }
  const changeDateStatus = (dateStatus) => {
    const result = filterBookingDates()
    console.log("result", result, result.length);
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
    //console.log("datesArray", datesArray);
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
  const moreOperation = () => {
    return (
      <View style={styles.moreChoice}>
        <Pressable style={styles.moreItem} onPress={vacationDayPress}>
          <Text style={styles.moreTxt}>تعيين كيوم عطلة</Text>
        </Pressable>

        <Pressable style={styles.moreItem} onPress={closeDayPress}>
          <Text style={styles.moreTxt}>اغلاق باب الحجز</Text>
        </Pressable>

        <Pressable style={styles.moreItem} onPress={openDayPress}>
          <Text style={styles.moreTxt}>فتح باب الحجز</Text>
        </Pressable>
      </View>
    )
  }

  ///// searching according spacific data

  const getBookingInfo = () => {
    const reqInfo = requestInfoByService.filter(item => {
      return item.requestInfo.ReqStatus === 'partally paid' && item.requestInfo.reservationDetail[0].reservationDate === fulDate
    })
    return reqInfo
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
        <View style={styles.dateView}>
          <Text style={styles.txt}>{moment(fulDate).format('dddd')}</Text>
          <Text style={styles.txt}>{selectedDate}</Text>
        </View>
        {renderBookingCard()}
      </View>
    )
  }

  //////// Searching by Client Name

  const manageDatesusingSearchbyName = () => {
    let requestBookingDate = ''
    const data = filterdRequestAccUser

    return data.map(item => {

      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.map(multiItem => {
          requestBookingDate = multiItem.reservationDate

          if (!(manageArrayDates.includes(requestBookingDate))) {
            manageArrayDates.push(requestBookingDate)
          }
        })
      } else {
        requestBookingDate = item.requestInfo.reservationDetail[0].reservationDate

        if (!(manageArrayDates.includes(requestBookingDate))) {
          manageArrayDates.push(requestBookingDate)
        }
      }
      manageArrayDates.sort();
    })
  }
  const filterReqAccUserId = (resDate) => {
    const data = filterdRequestAccUser

    const reqInfo = data.filter(item => {
      if (item.requestInfo.reservationDetail.length > 1) {
        return item.requestInfo.reservationDetail.find(multiItem => {
          return multiItem.reservationDate === resDate
        })
      } else {
        return item.requestInfo.reservationDetail[0].reservationDate === resDate
      }

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
    color: 'black'
  },
  dateView: {
    backgroundColor: colors.silver,
    height: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalbody: {
    paddingHorizontal: 5
  },
  moreModal: {
    width: '95%',
    height: 150,
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
    marginVertical: 5,
    alignItems: 'center'
  },
  moreChoice: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1
  },
  moreTxt: {
    fontSize: 18
  },
})
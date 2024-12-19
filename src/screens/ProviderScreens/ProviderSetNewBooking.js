import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Platform, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../assets/AppColors';
import ProviderSetClientForBooking from '../../components/ProviderComponents/ProviderSetClientForBooking';
import SearchContext from '../../../store/SearchContext';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import ProviderSetPaymentForClient from '../../components/ProviderComponents/ProviderSetPaymentForClient';
import ProviderSetClientInfo from './ProviderSetClientInfo';
import { AppStyles } from '../../assets/res/AppStyles';
import { showMessage } from '../../resources/Functions';
import { addUser, checkUserExists, addNewRequest, createNewPayment, getEventsInfo, createNewEvent, updateService } from '../../resources/API';
import { images } from '../../assets/photos/images';
import { ScreenNames } from '../../../route/ScreenNames';
import { SelectList } from 'react-native-dropdown-select-list'; 

const ProviderSetNewBooking = (props) => {
  const { fulDate } = props.route?.params || {};
  const { isFirst } = useContext(SearchContext);
  const { serviceInfoAccorUser } = useContext(ServiceProviderContext);

  const [clientStatus, setClientStatus] = useState(true);
  const [bookStatus, setBookStatus] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const [client, setClient] = useState(true);
  const [booking, setBooking] = useState(false);
  const [payment, setPayment] = useState(false);
  const [userId, setUserId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [resDetail, setResDetail] = useState([
    {
      reservationDate: fulDate,
      startingTime: null,
      EndTime: null,
      numOfInviters: null,
      subDetailId: [],
      offerId: [],
    },
  ]);

  const [inputValues, setInputValues] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    userId: null
  });

  const [openModal, setOpenModal] = useState(false);
  const [eventTypeName, setEventTypeName] = useState([]); 
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [paymentDataArray, setPaymentDataArray] = useState([]);
  const [paymentPolicy, setPaymentPolicy] = useState(null);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  const handleClientInfoChange = (newValues) => {
    if (newValues.userId) {
      setUserId(newValues.userId);
      console.log('Updated userId:', newValues.userId);
    }
    setInputValues(newValues);
  };

  const onPressHandler = () => {
    props.navigation.goBack();
  };

  const findProviderInfo = () => {
    const data = serviceInfoAccorUser.filter(item => {
      return item.service_id === isFirst;
    });
    return data;
  };

  useEffect(() => {
    const data = findProviderInfo();
    if (data && data[0]) {
      setPaymentPolicy(data[0].paymentPolicy);
    }
  }, []);

  const fetchUserEvents = async () => {
    try {
      const body = { userId: inputValues.userId };
      const eventsResponse = await getEventsInfo(body);
      console.log("eventsResponse ", eventsResponse);

      if (eventsResponse && eventsResponse.events) {
        const mappedData = eventsResponse.events.map(event => ({
          key: event._id,
          value: event.title,
        }));
        setEventTypeName(mappedData);
      } else {
        console.log("No events found or error in fetching events");
        setEventTypeName([]);
      }
    } catch (error) {
      console.error("Error fetching user events: ", error);
      setEventTypeName([]);
    }
  };

  const ensureUserIsClient = async () => {
    // Ensure that the userId is in the service's clients list
    const serviceData = findProviderInfo()?.[0];
    if (!serviceData || !serviceData.service_id || !userId) return;

    const isAlreadyClient = serviceData.clients && serviceData.clients.includes(userId);
    if (!isAlreadyClient) {
      // Add userId to clients
      const updatedClients = [...serviceData.clients, userId];
      const updateBody = {
        service_id: serviceData.service_id,
        clients: updatedClients
      };
      const updateResponse = await updateService(updateBody);
      if (updateResponse && updateResponse.message === 'Updated Sucessfuly') {
        showMessage('تم إضافة المستخدم كزبون للخدمة بنجاح.');
      } else {
        console.error('Failed to update service with new client');
      }
    }
  };

  const header = () => (
    <View style={styles.title}>
      <TouchableOpacity onPress={onPressHandler}>
        <AntDesign style={styles.iconback} name={"left"} color={"black"} size={25} />
      </TouchableOpacity>
      <Text style={styles.titletxt}>اٍنشاء حجز</Text>
    </View>
  );

  const renderHeadLines = () => (
    <View style={styles.head}>
      <View style={styles.headShape}>
        <View style={[styles.circle, paymentStatus ? styles.circlePassed : styles.circle]}>
          <Text style={[styles.numberTxt, paymentStatus ? styles.numberTxtPassed : styles.numberTxt]}>3</Text>
        </View>

        <View style={[styles.line, paymentStatus ? styles.linePassed : styles.line]}></View>
        <View style={[styles.circle, bookStatus ? styles.circlePassed : styles.circle]}>
          <Text style={[styles.numberTxt, bookStatus ? styles.numberTxtPassed : styles.numberTxt]}>2</Text>
        </View>

        <View style={[styles.line, bookStatus ? styles.linePassed : styles.line]}></View>
        <View style={[styles.circle, clientStatus ? styles.circlePassed : styles.circle]}>
          <Text style={[styles.numberTxt, clientStatus ? styles.numberTxtPassed : styles.numberTxt]}>1</Text>
        </View>
      </View>
      <View style={styles.headTitle}>
        <View style={styles.headItem}>
          <Text style={[styles.headTxt, paymentStatus ? styles.headTxtSelected : styles.headTxt]}>الدفع</Text>
        </View>
        <View style={styles.headItem}>
          <Text style={[styles.headTxt, bookStatus ? styles.headTxtSelected : styles.headTxt]}>تفاصيل الحجز</Text>
        </View>
        <View style={styles.headItem}>
          <Text style={[styles.headTxt, clientStatus ? styles.headTxtSelected : styles.headTxt]}>معلومات الزبون</Text>
        </View>
      </View>
    </View>
  );

  const screenBody = () => (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.bodyTitle}>
          {client && <Text style={styles.nextText}>معلومات الزبون</Text>}
          {booking && <Text style={styles.nextText}>تفاصيل الحجز</Text>}
          {payment && <Text style={styles.nextText}>معلومات الدفع</Text>}
        </View>
        <View style={styles.bodyTaps}>
          {client && renderClientInfo()}
          {booking && renderBookingInfo()}
          {payment && renderPaymentDetail()}
        </View>
      </ScrollView>
    </View>
  );

  const renderClientInfo = () => {
    const data = findProviderInfo();
    const providerClients = data[0].clients;
    return (
      <View>
        <ProviderSetClientInfo
          providerClients={providerClients}
          onInputChange={handleClientInfoChange}
          inputValuesParent={inputValues}
        />
      </View>
    );
  };

  const renderBookingInfo = () => {
    const serviceData = findProviderInfo();
    return (
      <ProviderSetClientForBooking
        serviceData={serviceData}
        fulDate={fulDate}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        resDetail={resDetail}
        setResDetail={setResDetail}
      />
    );
  };

  const handlePaymentDataChange = (paymentData, isValid) => {
    setPaymentDataArray(paymentData);
    setIsPaymentValid(isValid);
  };

  const renderPaymentDetail = () => {
    const serviceData = findProviderInfo();
    return (
      <View>
        <ProviderSetPaymentForClient
          paymentPolicy={serviceData?.[0]?.paymentPolicy}
          serviceId={serviceData?.[0]?.service_id}
          userId={userId}
          totalPrice={totalPrice}
          date={fulDate}
          resDetails={resDetail}
          onPaymentDataChange={handlePaymentDataChange}
        />
      </View>
    );
  };

  const checkAllDetails = () => {
    const serviceData = findProviderInfo()?.[0];

    if (typeof totalPrice !== 'number' || totalPrice <= 0) {
      showMessage('Please choose proper services.');
      return false;
    }

    if (!serviceData || !serviceData._id) {
      showMessage('Invalid service data.');
      return false;
    }

    if (!Array.isArray(resDetail) || resDetail.length === 0) {
      showMessage('Please provide reservation details.');
      return false;
    }

    for (const detail of resDetail) {
      if (!detail.reservationDate || !detail.startingTime || !detail.EndTime ||
        detail.numOfInviters === null || !Array.isArray(detail.subDetailId) ||
        !Array.isArray(detail.offerId) || (detail.subDetailId.length === 0 && detail.offerId.length === 0)) {
        showMessage('Please fill all reservation details.');
        return false;
      }
    }
    return true;
  };

  const nextPress = async () => {
    if (client) {
      await checkIfNew();
    } else if (booking) {
      if (checkAllDetails()) {
        proceedToNextStep();
      } else {
        showMessage('Please fill in all required booking details.');
      }
    } else if (payment) {
      await finalizeReservation();
    } else {
      proceedToNextStep();
    }
  };

  const finalizeReservation = async () => {
    if (!isPaymentValid && paymentPolicy !== 'post') {
      showMessage('الدفعات غير مكتملة أو لم يتم الدفع بشكل صحيح.');
      return;
    }

    // Ensure user is client of the service
    await ensureUserIsClient();

    // Fetch user events first to decide if we need to show modal or skip
    await fetchUserEvents();

    // Decide based on eventTypeName
    if (!eventTypeName || eventTypeName.length === 0) {
      // No events, create public and proceed directly
      await createReservation();
    } else if (eventTypeName.length === 1 && eventTypeName[0].value === 'public event') {
      // Only public event, use it and proceed directly
      await createReservation(); 
    } else {
      // Multiple events or different event(s) available, show modal
      setOpenModal(true);
    }
  };
  
  const ensurePublicEvent = async () => {
    const eventBody = {
      eventName: "public event",
      createdBy: inputValues.userId || 'unknown',
    };
    const eventResponse = await createNewEvent(eventBody);
    console.log("eventResponse ",eventResponse);
    
    if (eventResponse && eventResponse.message === 'Event Created' ) {
      return eventResponse.savedEvent._id;
    } else {
      console.error('Failed to create public event');
      showMessage('حدث خطأ أثناء إنشاء الحدث العام. الرجاء المحاولة مرة أخرى.');
      return null;
    }
  };

  const ensureEventAndGetId = async () => {
    if (!eventTypeName || eventTypeName.length === 0) {
      return await ensurePublicEvent();
    }

    if (eventTypeName.length === 1 && eventTypeName[0].value === 'public event') {
      return eventTypeName[0].key; 
    }

    if (selectedEvent) {
      const chosen = eventTypeName.find(e => e.key === selectedEvent);
      if (chosen) {
        return chosen.key;
      }
    }

    const publicEvent = eventTypeName.find(e => e.value === 'public event');
    if (publicEvent) {
      return publicEvent.key;
    } else {
      return await ensurePublicEvent();
    }
  };
  
  const createReservation = async () => {
    try {
      const serviceData = findProviderInfo()?.[0];
      const firstPaymentStatus = paymentDataArray[0]?.paymentStutes || 'not paid';
      const reqStatus = firstPaymentStatus === 'paid' ? 'partially paid' : 'waiting pay';

      const chosenEventId = await ensureEventAndGetId();
      if (!chosenEventId) {
        return; 
      }

      const requestBody = {
        ReqServId: serviceData?.service_id,
        ReqUserId: inputValues.userId || 'unknown',
        ReqStatus: reqStatus,
        ReqDate: new Date().toISOString(),
        Cost: totalPrice,
        reservationDetail: resDetail,
        paymentInfo: paymentDataArray,
        ReqEventId: chosenEventId,
      };

      const requestResponse = await addNewRequest(requestBody);

      if (requestResponse?.message === 'Request Created') {
        showMessage('تم إنشاء الطلب بنجاح!');
        const createdRequestId = requestResponse?.savedRequest?._id;

        for (const installment of paymentDataArray) {
          if (installment.paymentStutes === 'paid') {
            const paymentToCreate = {
              ReqId: createdRequestId,
              PaymentAmount: installment.amount,
              PaymentDate: new Date().toISOString(),
              userPay: inputValues.userId,
              PaymentMethod: installment.paymentMethod || 'Cash',
              discountPercentage: 0,
              cardHolderName: '',
              cardHolderId: '',
              creditCardNum: '',
              verfiyCode: '',
              expirMonth: '',
              expirYear: '',
            };

            const paymentResponse = await createNewPayment(paymentToCreate);
            if (paymentResponse?.message === 'Payment Created') {
              showMessage(`دفعة بمبلغ ${installment.amount} سجلت بنجاح!`);
            } else {
              showMessage('حدث خطأ أثناء تسجيل الدفع.');
            }
          }
        }

        props.navigation.navigate(ScreenNames.ClientHomeAds);
      } else {
        showMessage('حدث خطأ أثناء إنشاء الطلب. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error during finalizing reservation:', error);
      showMessage('حدث خطأ أثناء معالجة الطلب. الرجاء المحاولة مرة أخرى.');
    }
    finally {
      setOpenModal(false);
    }
  };
  

  const checkIfNew = async () => {
    const { name, phone, email, location } = inputValues;

    if (!name || !phone || !email || !location) {
      showMessage('Please fill in all fields before proceeding.');
      return;
    }

    try {
      const userExistsResponse = await checkUserExists({ phone, email });

      if (userExistsResponse) {
        const existingUserId = userExistsResponse?.user?.USER_ID;
        setUserId(existingUserId);
        proceedToNextStep();
      } else {
        const newUser = await createNewUser(inputValues);
        if (newUser?.userId) {
          setUserId(newUser.userId);
          proceedToNextStep();
        } else {
          showMessage('User creation failed. Proceeding with unknown user.');
          proceedToNextStep();
        }
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      showMessage('Error checking user existence. Please try again.');
    }
  };

  const generateRandomPassword = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  const createNewUser = async (userData) => {
    try {
      const pass = generateRandomPassword();
      const AddNewUser = {
        User_name: inputValues.name,
        UserPhone: inputValues.phone,
        Email: inputValues.email,
        UserCity: inputValues.location,
        Password: pass,
        PasswordConfirmation: pass,
      };
      const newUser = await addUser(AddNewUser, images.profileMalePicture);
      if (newUser && newUser?.userId) {
        showMessage('User created successfully!');
        return newUser;
      }
    } catch (error) {
      showMessage('Error creating user. Please try again.');
      console.error('User creation error:', error);
    }
  };

  const proceedToNextStep = () => {
    if (bookStatus) {
      setPaymentStatus(true);
      setClient(false);
      setBooking(false);
      setPayment(true);
    } else {
      setBookStatus(true);
      setClient(false);
      setBooking(true);
      setPayment(false);
    }
  };

  const backPress = () => {
    if (paymentStatus) {
      setPaymentStatus(false);
      setClient(false);
      setBooking(true);
      setPayment(false);
    } else {
      if (bookStatus) {
        setBookStatus(false);
        setClient(true);
        setBooking(false);
        setPayment(false);
      }
    }
  };

  const footer = () => (
    <View style={styles.btnView}>
      {!payment && (
        <TouchableOpacity style={AppStyles.next} onPress={nextPress}>
          <Text style={AppStyles.nextText}>التالي</Text>
        </TouchableOpacity>
      )}
      {payment && (
        <TouchableOpacity style={AppStyles.next} onPress={nextPress}>
          <Text style={AppStyles.nextText}>حجز</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={AppStyles.back} onPress={backPress}>
        <Text style={AppStyles.backText}>رجوع</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModal = () => (
    <Modal
      transparent
      visible={openModal}
      animationType="fade"
      onRequestClose={() => setOpenModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Event</Text>
          <SelectList
            data={eventTypeName}
            setSelected={val => setSelectedEvent(val)}
            placeholder="Select event"
            boxStyles={styles.dropdown}
            inputStyles={styles.droptext}
            dropdownTextStyles={styles.dropstyle}
          />

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => createReservation()}>
            <Text style={styles.modalButtonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, {backgroundColor: 'grey'}]}
            onPress={() => {
              setOpenModal(false);
              // If user cancels, we won't proceed
            }}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container, Platform.OS === 'ios' ? {marginTop:40} : null]}>
      {header()}
      {renderHeadLines()}
      {screenBody()}
      {footer()}
      {renderModal()}
    </View>
  );
};

export default ProviderSetNewBooking;

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  titletxt: {
    fontSize: 20,
    color: colors.puprble,
  },
  headTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '50%',
  },
  headShape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  head: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.puprble,
  },
  body: {
    width: '100%',
    height: 600,
    alignSelf: 'center',
  },
  bodyTitle: {
    width: '50%',
    height: 50,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    marginRight: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyTaps: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  headItem: {
    alignItems: 'center',
    width: '20%',
  },
  circle: {
    borderWidth: 2,
    width: '12%',
    height: '85%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.silver,
  },
  circlePassed: {
    width: '12%',
    height: '85%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BGScereen,
  },
  line: {
    borderWidth: 1,
    width: "22%",
    borderColor: colors.silver
  },
  linePassed: {
    borderWidth: 2,
    width: "22%",
    borderColor: colors.BGScereen
  },
  headTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.silver
  },
  headTxtSelected: {
    fontSize: 15,
    color: colors.BGScereen,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberTxt: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.silver
  },
  numberTxtPassed: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.puprble,
    fontWeight: 'bold',
  },
  btnView: {
    width: '90%',
    height: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
  },
  nextText: {
    fontSize: 18,
    color: colors.puprble
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.puprble,
  },
  modalButton: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: colors.puprble,
    alignItems: 'center',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dropdown: {
    borderColor: colors.silver,
  },
  dropstyle: {
    color: 'black',
    fontSize: 15,
  },
  droptext: {
    fontSize: 18,
    color: 'black',
  },
});

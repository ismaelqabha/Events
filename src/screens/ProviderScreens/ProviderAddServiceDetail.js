import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import ProviderShowServDetailComp from '../../components/ProviderComponents/ProviderShowServDetailComp';
import Entypo from 'react-native-vector-icons/Entypo';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import ScreenBack from '../../components/ProviderComponents/ScreenBack';
import ScreenNext from '../../components/ProviderComponents/ScreenNext';
import { colors } from '../../assets/AppColors';
import SearchContext from '../../../store/SearchContext';
import { hallDetailOptions, mandoteryOptions } from '../../resources/data';
import { SelectList } from 'react-native-dropdown-select-list';
import { showMessage } from '../../resources/Functions';
import { addService, addServiceImages } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';

const ProviderAddServiceDetail = props => {
  const [showModal, setShowModal] = useState(false);
  const [Dtitle, setDTitle] = useState('');
  const [nec, setNec] = useState();
  const [additionType, setAdditionType] = useState(null);
  const [numberPerTable, setNumberPerTable] = useState('')
  const [isMan, setIsMan] = useState(false);
  const [isOpt, setIsOpt] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [other, setOther] = useState(false);
  const [editedDetailId, setEditedDetailId] = useState('');

  const {
    serviceAddress,
    price,
    serviceRegion,
    title,
    SuTitle,
    description,
    selectServiceType,
    additionalServices,
    setAdditionalServices,
    photoArray,
    socialMediaArray,
    hallCapacity,
    hallType,
    phoneNumer,
    email,
  } = useContext(ServiceProviderContext);
  const { userId } = useContext(UsersContext);
  const language = strings.arabic.ProviderScreens.ProviderAddServiceDetail;


  useEffect(() => {
    var man = filterData(additionalServices, "Mandatory")
    man && man.length ? setIsMan(true) : setIsMan(false)
    var opt = filterData(additionalServices, "Optional")
    opt && opt.length ? setIsOpt(true) : setIsOpt(false)
  }, [additionalServices])

  let Did = uuidv4();

  const params = {
    ScreenHeader: {
      HeaderStyle: styles.header,
      HeaderTextStyle: styles.headText,
      Text: language.Header,
    },
    ScreenBack: {
      backStyle: styles.back,
      backTextStyle: styles.backText,
      Text: language.Back,
      onPress: () => onBackPress(),
    },
    ScreenNext: {
      nextStyle: styles.next,
      nextTextStyle: styles.nextText,
      Text: language.Next,
      onPress: () => onPublishPress(),
    },
  };


  const onPublishPress = async () => {
    let emptyIndexes = [];

    additionalServices.forEach((service, index) => {
      if (service.subDetailArray.length === 0) {
        emptyIndexes.push(index);
      }
    });

    if (emptyIndexes.length > 0) {
      const message = `Sub detail ${emptyIndexes.map(index => additionalServices[index].detailTitle).join(', ')} are empty`; showMessage(message)
      return;
    }
    const body = {
      userID: userId,
      servType: selectServiceType,
      title: title,
      subTitle: SuTitle,
      desc: description,
      region: serviceRegion,
      address: serviceAddress,
      servicePrice: price,
      additionalServices: additionalServices,
      socialMedia: socialMediaArray,
      maxCapasity: hallCapacity,
      hallType: hallType,
      servicePhone: phoneNumer,
      serviceEmail: email,
    };
    await addService(body)
      .then(async res => {
        //console.log(' service res ->', res.serviceID);
        await addServiceImages(photoArray, res?.serviceID).then((res) => {
          // console.log("images res -> ", res);
          // showMessage("تم حفظ البيانات")
        })
      })
      .catch(e => {
        console.log('create new event error : ', e);
      });

  };

  const modalSavePress = () => {
    if (Dtitle.trim().length > 0 && doesntExists()) {
      const AddNewDetail = {
        detail_Id: Did,
        detailTitle: Dtitle,
        necessity: nec,
        additionType: additionType,
        numberPerTable: numberPerTable,
        subDetailArray: []
      };
      setAdditionalServices([...additionalServices, AddNewDetail]);
      setDTitle('');
      setAdditionType(null)
      setNumberPerTable('')
      setNec("Mandatory")
      setShowModal(false);
    }
  };
  const doesntExists = () => {
    let exists = additionalServices.findIndex(
      val => val?.detailTitle.toLowerCase() === Dtitle.toLowerCase(),
    );
    return exists == -1 ? true : false;
  };
  const modalDeletePress = () => {
    setDTitle('');
    setAdditionType(null)
    setNumberPerTable('')
    setNec("Mandatory");
    setShowModal(false);
  };
  const onStartPress = () => {
    setIsEdit(false)
    setShowModal(true);
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };

  const filterData = (data, filter) => {
    const filterArray = data?.filter(service => {
      if (service.necessity === filter) {
        return service
      }
    })
    return filterArray
  }
  const deleteItem = (detail_Id) => {
    // Show an alert to confirm the delete
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            // If user confirms, proceed with delete
            const updatedServices = additionalServices.filter(service => service.detail_Id !== detail_Id);
            setAdditionalServices(updatedServices);
            setDTitle('');
            setAdditionType(null)
            setNumberPerTable('')
            setNec("Mandatory");
          }
        }
      ],
      { cancelable: false }
    );
  };
  const openEdit = (allData) => {
    setEditedDetailId(allData.detail_Id)
    setDTitle(allData.detailTitle);
    setAdditionType(allData.additionType);
    setNumberPerTable(allData.numberPerTable)
    setNec(allData.necessity);
    setIsEdit(true)
    setShowModal(true)
  };
  const renderMandatoryServices = () => {
    const filterArray = filterData(additionalServices, "Mandatory")
    const cardsArray = filterArray?.map(card => {
      return <ProviderShowServDetailComp key={card.detail_Id} {...card} openEdit={openEdit} deleteItem={deleteItem} />;
    });
    return cardsArray;
  };

  const renderOptionalServices = () => {
    const filterArray = filterData(additionalServices, "Optional")
    const cardsArray = filterArray.map(card => {
      return <ProviderShowServDetailComp key={card.detail_Id} {...card} openEdit={openEdit} deleteItem={deleteItem} />;
    });
    return cardsArray;
  };

  const RenderCreateButton = () => {
    return (
      <TouchableOpacity style={styles.AddButton} onPress={onStartPress}>
        <View style={styles.textView}>
          <Text style={styles.footText}>{language.CreateButton}</Text>
        </View>
        <View style={styles.iconView}>
          <Entypo
            name="plus"
            color={colors.puprble}
            size={30}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const RenderModal = () => {
    return (
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.detailModal}>
            {RenderHeaderText()}
            {RenderTitleBox()}
            {RenderButtons()}
          </View>
        </View>
      </Modal>
    );
  };
  const RenderHeaderText = () => {
    return (
      <View style={styles.Motitle}>
        <Text style={styles.text}>{language.Title}</Text>
      </View>
    );
  };
  const RenderTitleBox = () => {
    return (
      <View style={styles.listView}>
        <View style={styles.list}>
          <SelectList
            data={hallDetailOptions}
            setSelected={val => {
              if (hallDetailOptions[val].value === 'أخرى') {
                setOther(true)
              } else {
                setDTitle(hallDetailOptions[val].value)
                setOther(false)
              }
            }}
            placeholder={'اختيار وصف الخدمة'}
            boxStyles={styles.dropdown}
            inputStyles={styles.droptext}
            dropdownTextStyles={styles.dropstyle}
          />
        </View>
        {other &&
          <TextInput
            style={styles.titleInput}
            keyboardType="default"
            maxLength={60}
            onChangeText={value => {
              setDTitle(value);
            }}
            value={Dtitle}
          />}

        <View style={styles.list}>
          <SelectList
            data={mandoteryOptions}
            setSelected={val => { setNec(mandoteryOptions[val].alt) }}
            placeholder={isEdit ? nec === 'Mandatory' ? mandoteryOptions[0].value : mandoteryOptions[1].value : language.dropdownText}
            boxStyles={styles.dropdown}
            inputStyles={styles.droptext}
            dropdownTextStyles={styles.dropstyle}

          />
        </View>
        {renderIsPerPerson()}
      </View>
    );
  };

  const setType = (type) => {
    setAdditionType(type)
  }

  const renderIsPerPerson = () => {
    return (
      <View style={styles.perPersoneView}>
        <Text style={styles.perPersoneText}>ما هو نوع تحديد السعر لهذة الخدمة ؟</Text>
        <View style={{ alignItems: 'flex-end' }}>

          <Pressable style={[additionType === 'perTable' ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={() => setType('perTable')}>
            <Text style={styles.perPersoneText}>حسب الطاولة</Text>
          </Pressable>


          <Pressable style={[additionType === 'perPerson' ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={() => setType('perPerson')}>
            <Text style={styles.perPersoneText}>حسب الشخص</Text>
          </Pressable>

          <Pressable style={[additionType === 'perRequest' ? styles.itemPersonViewPressed : styles.itemPersonView]} onPress={() => setType('perRequest')}>
            <Text style={styles.perPersoneText}>شامل لكل الحجز</Text>
          </Pressable>
        </View>
        <View style={{ alignItems: 'center' }}>
          {additionType === 'perTable' &&
            <TextInput
              style={styles.numTableInput}
              keyboardType="default"
              maxLength={60}
              placeholder='عدد الاشخاص للطاولة'
              onChangeText={(text) => {
                setNumberPerTable(text)
              }}
              value={numberPerTable}
            />}
        </View>
      </View>
    )
  }
  const RenderButtons = () => {
    return (
      <View style={styles.Modalbtn}>
        {RenderCancelButton()}
        {RenderSaveButton()}
      </View>
    );
  };
  const RenderCancelButton = () => {
    return (
      <Pressable onPress={() => modalDeletePress()}>
        <Text style={styles.text}>{language.Cancel}</Text>
      </Pressable>
    );
  };
  const RenderSaveButton = () => {
    return (
      <Pressable onPress={() => isEdit ? saveEdited() : modalSavePress()}>
        <Text style={styles.text}>{isEdit ? language.editSave : language.Save}</Text>
      </Pressable>
    );
  };
  const saveEdited = () => {
    if (Dtitle.trim().length > 0 && editedDetailId) {
      const updatedServices = additionalServices.map(service => {
        if (service.detail_Id === editedDetailId) {
          return {
            ...service,
            detailTitle: Dtitle,
            necessity: nec,
            additionType: additionType,
          };
        }
        return service;
      });
      setAdditionalServices(updatedServices);
      setDTitle('');
      setAdditionType(null)
      setNec("Mandatory");
      setShowModal(false);
    }
  };
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>{language.Header}</Text>
      </View>
    )
  }
  const renderBody = () => {
    return (
      <View style={styles.Mbody}>
        {RenderCreateButton()}
        {renderList()}
      </View>
    )
  }
  const renderMandatory = () => {
    if (isMan) {
      return (
        <View style={styles.MandatoryView}>
          <Text style={styles.mandotryText}>{language.mandotryText}</Text>
          {renderMandatoryServices()}
        </View>
      )
    } else {
      return null
    }

  }

  const renderOptional = () => {
    if (isOpt) {
      return (
        <View style={styles.MandatoryView}>
          <Text style={styles.mandotryText}>{language.optionalText}</Text>
          {renderOptionalServices()}
        </View>
      )
    } else {
      return null
    }


  }

  const renderList = () => {
    return (
      <ScrollView contentContainerStyle={styles.home}>
        {renderMandatory()}
        {renderOptional()}
      </ScrollView>
    )
  }
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ScreenBack ScreenBack={params.ScreenBack} />
        <ScreenNext ScreenNext={params.ScreenNext} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
      {RenderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BGScereen
  },
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 40,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  next: {
    width: 130,
    height: 40,
    backgroundColor: colors.puprble,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 80
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  nextText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.darkGold
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  Mbody: {
    height: '75%',
    marginTop: 30,
    //alignItems: 'stretch',
  },

  AddButton: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    width: '90%',
    borderRadius: 25,
    marginBottom: 20,
    alignSelf: 'center'
  },
  footText: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  mandotryText: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold',
    marginRight: 20
  },
  iconView: {
    borderRadius: 10,
    elevation: 5,
    margin: 3,
    backgroundColor: 'white',
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textView: {
    borderRadius: 10,
    elevation: 5,
    margin: 3,
    backgroundColor: 'white',
    width: '80%',
    justifyContent: 'center'
  },
  // footer: {
  //   marginTop: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginRight: 20,
  //   marginLeft: 20,
  // },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  detailModal: {
    width: '100%',
    height: 550,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  Motitle: {

    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.puprble,
  },
  Modalbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: '80%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    fontSize: 18,
    backgroundColor: 'white',
    marginTop: 20
  },
  numTableInput: {
    textAlign: 'center',
    height: 40,
    width: '60%',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    fontSize: 18,
    backgroundColor: 'white',
    marginTop: 10
  },

  MandatoryView: {

  },
  dropdown: {
    height: 50,
    minWidth: '60%',
    fontSize: 17,
    borderColor: '#dcdcdc',
    borderWidth: 2,
    borderRadius: 10
  },
  dropstyle: {
    textAlign: 'center',
    color: colors.puprble,
    // fontWeight: 'bold',
    fontSize: 20,
  },
  droptext: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.puprble,
    textAlign: 'right'
  },
  listView: {
    alignItems: 'center',

  },
  list: {
    width: '80%',
    marginTop: 20
  },
  perPersoneView: {
    marginTop: 20,
    width: '80%',
  },
  itemPersonView: {
    borderWidth: 4,
    borderColor: '#dcdcdc',
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,

  },
  itemPersonViewPressed: {
    borderWidth: 4,
    borderColor: colors.puprble,
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  perPersoneText: {
    fontSize: 18,
    color: colors.puprble,

  }

});

export default ProviderAddServiceDetail;

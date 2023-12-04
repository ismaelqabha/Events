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
import { mandoteryOptions } from '../../resources/data';
import { SelectList } from 'react-native-dropdown-select-list';
import { showMessage } from '../../resources/Functions';
import { addServiceImages } from '../../resources/API';

const ProviderAddServiceDetail = props => {
  const [showModal, setShowModal] = useState(false);
  const [Dtitle, setDTitle] = useState('');
  const [nec, setNec] = useState("Mandatory");
  const [isMan, setIsMan] = useState(false);
  const [isOpt, setIsOpt] = useState(false);
  const {
    serviceAddress,
    price,
    serviceRegion,
    title,
    SuTitle,
    description,
    selectServiceType,
    workAreas,
    additionalServices,
    setAdditionalServices,
    photoArray
  } = useContext(ServiceProviderContext);
  const { userId } = useContext(SearchContext);
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
    const body = {
      userID: userId,
      servType: selectServiceType,
      title: title,
      subTitle: SuTitle,
      desc: description,
      region: serviceRegion,
      address: serviceAddress,
      servicePrice: price,
      workingRegion: workAreas,
      additionalServices: additionalServices,
    };
    await addService(body)
      .then(async res => {
        console.log(' service res ->', res);
        await addServiceImages(photoArray).then((res)=>{
          console.log("images res -> ",res );
          showMessage("تم حفظ البيانات")
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
        subDetailArray: []
      };
      setAdditionalServices([...additionalServices, AddNewDetail]);
      setDTitle('');
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
    setShowModal(false);
  };
  const onStartPress = () => {
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

  const renderMandatoryServices = () => {
    const filterArray = filterData(additionalServices, "Mandatory")
    const cardsArray = filterArray?.map(card => {
      return <ProviderShowServDetailComp {...card} />;
    });
    return cardsArray;
  };
  const renderOptionalServices = () => {
    const filterArray = filterData(additionalServices, "Optional")
    const cardsArray = filterArray.map(card => {
      return <ProviderShowServDetailComp {...card} />;
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
        <TextInput
          style={styles.titleInput}
          keyboardType="default"
          maxLength={60}
          onChangeText={value => {
            setDTitle(value);
          }}
        />
        <View style={styles.list}>
          <SelectList
            data={mandoteryOptions}
            setSelected={val => { setNec(mandoteryOptions[val].alt) }}
            placeholder={language.dropdownText}
            boxStyles={styles.dropdown}
            inputStyles={styles.droptext}
            dropdownTextStyles={styles.dropstyle}
          />
        </View>
      </View>
    );
  };
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
      <Pressable onPress={() => modalSavePress()}>
        <Text style={styles.text}>{language.Save}</Text>
      </Pressable>
    );
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
    height: 300,
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
    height: 50,
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
    marginTop: 50,
  },
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: 315,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    fontSize: 18,
    // color: 'black',
    backgroundColor: 'white',
  },
  MandatoryView: {

  },
  dropdown: {
    height: 50,
    // maxWidth: '60%',
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
    alignItems: 'center'
  },
  list: {
    width: '70%',
    marginTop: 5
  }
});

export default ProviderAddServiceDetail;

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
  Image,
  Alert
} from 'react-native';
import SearchContext from '../../../store/SearchContext';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProviderSubDetailComp from '../../components/ProviderComponents/ProviderSubDetailComp';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import strings from '../../assets/res/strings';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { colors } from '../../assets/AppColors';

const ProviderAddSubDetail = props => {
  const { data } = props?.route.params;
  const [showModal, setShowModal] = useState(false);
  const [SDtitle, setSDTitle] = useState('');
  const [SPricetitle, setSPricetitle] = useState('');
  const [subDetailImg, setSubDetailImg] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [editedSubDetailId, setEditedSubDetailId] = useState('');
  const { additionalServices, setAdditionalServices } = useContext(
    ServiceProviderContext,
  );
  const langauge = strings.arabic.ProviderScreens.ProviderSubDetail;

  let SubDid = uuidv4();
  const saveEdited = () => {
    if (SDtitle.trim().length > 0 && SPricetitle.trim().length > 0) {
      const editedSubDetail = {
        subDetail_Id: editedSubDetailId, // Assuming you have this state variable to track the edited subDetail_Id
        detailSubtitle: SDtitle,
        detailSubtitleCost: SPricetitle,
        subDetailPhoto: subDetailImg
      };

      const updatedServices = additionalServices.map(service => {
        if (service.detail_Id === data.detail_Id) {
          const updatedSubDetailArray = service.subDetailArray.map(item => {
            if (item.subDetail_Id === editedSubDetailId) {
              return editedSubDetail;
            }
            return item;
          });
          return { ...service, subDetailArray: updatedSubDetailArray };
        }
        return service;
      });

      setAdditionalServices(updatedServices);
      setSDTitle('');
      setSPricetitle('');
      setSubDetailImg(null);
      setShowModal(false);
    }
  };
  const modalSavePress = () => {
    if (SDtitle.trim().length > 0 && SPricetitle.trim().length > 0) {
      if (doesntExists()) {
        const AddNewSubDetail = {
          subDetail_Id: data.detail_Id,
          id: SubDid,
          detailSubtitle: SDtitle,
          detailSubtitleCost: SPricetitle,
          subDetailPhoto: subDetailImg
        };
        const temp = additionalServices;
        let index = temp.findIndex(val => val.detail_Id === data.detail_Id);
        temp[index].subDetailArray.push(AddNewSubDetail)
        setAdditionalServices(temp);
        setSDTitle('');
        setSPricetitle('');
      }
    }
    setSubDetailImg()
    setSDTitle('')
    setSPricetitle('')
    setShowModal(false);
  };

  const doesntExists = () => {
    const index = data?.subDetailArray?.findIndex(
      val => val?.detailSubtitle === SDtitle,
    );
    return index == -1 ? true : false;
  };
  const modalDeletePress = () => {
    setShowModal(false);
  };
  const onStartPress = () => {
    setIsEdit(false)
    setShowModal(true);
  };
  const onBackPress = () => {
    props.navigation.goBack();
  };
  const deleteItem = (subDetail_Id) => {
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
            const updatedServices = additionalServices.map(service => {
              if (service.detail_Id === data.detail_Id) {
                const updatedSubDetailArray = service.subDetailArray.filter(item => item.subDetail_Id !== subDetail_Id);
                return { ...service, subDetailArray: updatedSubDetailArray };
              }
              return service;
            });
            setAdditionalServices(updatedServices);
          }
        }
      ],
      { cancelable: false }
    );
  };
  const openEdit = (allData) => {
    setEditedSubDetailId(allData.subDetail_Id)
    setSDTitle(allData.detailSubtitle)
    setSPricetitle(allData.detailSubtitleCost)
    setSubDetailImg(allData.subDetailPhoto)
    setIsEdit(true)
    setShowModal(true);
  }
  const renderService = () => {
    let index = additionalServices.findIndex(val => val.detail_Id === data.detail_Id);
    const additions = additionalServices[index].subDetailArray;
    const cardsArray = additions.map(card => {
      return <ProviderSubDetailComp key={card.subDetail_Id} {...card} openEdit={openEdit} deleteItem={deleteItem} />;
    });
    return cardsArray;
  };

  const RenderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>{langauge.Header}</Text>
      </View>
    );
  };
  const RenderCreateNew = () => {
    return (
      <TouchableOpacity style={styles.AddButton} onPress={onStartPress}>
        <View style={styles.textView}>
          <Text style={styles.footText}>{langauge.CreateNew}</Text>
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

  const RenderBackButton = () => {
    return (
      <Pressable style={styles.back} onPress={onBackPress}>
        <Text style={styles.backText}>{langauge.Back}</Text>
      </Pressable>
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
            {RenderModalHeader()}
            {RenderInputDetailes()}
            {RenderButtons()}
          </View>
        </View>
      </Modal>
    );
  };
  const RenderModalHeader = () => {
    return (
      <View style={styles.Motitle}>
        <Text style={styles.text}>{langauge.ModalHeader}</Text>
      </View>
    );
  };
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
      const newImage = {
        imgId: uuidv4(),
        uri: source,
      };
      setSubDetailImg(newImage);
    } else {
      console.log('Error: Source is not valid.');
    }
  };
  const RenderInputDetailes = () => {
    return (
      <View style={styles.body}>
        <View style={styles.subImg}>
          <Pressable style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: '100%' }} onPress={onAddImgPress}>
            {subDetailImg ?
              <Image
                source={subDetailImg}
                style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'stretch', borderRadius: 10 }}
              />
              :
              <MaterialIcons
                style={{ alignSelf: 'center' }}
                name={"add-photo-alternate"}
                color={'#dcdcdc'}
                size={100} />}
          </Pressable>
        </View>
        <TextInput
          style={styles.titleInput}
          placeholder={langauge.ServDetailes}
          keyboardType="default"
          maxLength={60}
          onChangeText={value => {
            setSDTitle(value);
          }}
          value={SDtitle}
        />
        <TextInput
          style={styles.titleInput}
          placeholder={langauge.Price}
          keyboardType="numeric"
          onChangeText={value => {
            setSPricetitle(value);
          }}
          value={SPricetitle}
        />
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
        <Text style={styles.text}>{langauge.Cancel}</Text>
      </Pressable>
    );
  };
  const RenderSaveButton = () => {
    return (
      <Pressable onPress={() => isEdit ? saveEdited() : modalSavePress()}>
        <Text style={styles.text}>{isEdit ? langauge.editSave : langauge.Save}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {RenderHeader()}
      <View style={styles.Mbody}>
        {RenderCreateNew()}
        <ScrollView contentContainerStyle={styles.home}>
          {renderService()}
        </ScrollView>
      </View>

      <View style={styles.footer}>{RenderBackButton()}</View>
      {RenderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  Mbody: {
    height: '75%',
    marginTop: 20,
    alignItems: 'center',
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
  footText: {
    fontSize: 18,
    color: colors.puprble,
    alignSelf: 'center',
    marginLeft: 130,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
  },
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
    height: 450,
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
    color: 'black',
  },
  Modalbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%'
    //marginTop: 60,
  },
  titleInput: {
    textAlign: 'right',
    height: 50,
    width: '80%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  subImg: {
    borderWidth: 1,
    borderColor: '#dcdcdc',
    width: '60%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // aspectRatio:1
  },

});

export default ProviderAddSubDetail;

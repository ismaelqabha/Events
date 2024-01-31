import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  Dimensions,
  Image
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenNames } from '../../../route/ScreenNames';
import ProviderAddPhotoComp from '../../components/ProviderComponents/ProviderAddPhotoComp';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import strings from '../../assets/res/strings';
import { PERMISSIONS, request } from 'react-native-permissions';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { servicesCategory } from '../../resources/data';
import { Button } from 'react-native-elements';

const ProviderSetPhotos = props => {
  const { selectServiceType, photoArray, setPhotoArray, isDeleteMode, setIsDeleteMode } = useContext(ServiceProviderContext);
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const language = strings.arabic.ProviderScreens.ProviderSetPhotos;


  const onNextPress = () => {
    // photoArray.length <5 ? showMessage() :
    checkServiceType()
  };

  useEffect(() => {
    console.log("photoArray -> ", photoArray);
  }, [photoArray])

  const checkServiceType = () => {
    selectServiceType === servicesCategory[0].titleCategory ?
      props.navigation.navigate(ScreenNames.ProviderSocialMediaScreen, {
        data: { ...props },
        data: { ...props },
      })
      :
      props.navigation.navigate(ScreenNames.ProviderSetWorkingRegion, {
        data: { ...props },
        data: { ...props },
      });
  }
  const openAppSettings = () => {
    Platform.OS === 'ios' ?
      Linking.openURL('app-settings:') :
      Linking.openSettings()
  }

  const showRequestDeniedAlert = () => {
    Alert.alert(
      'Permission Denied',
      'To use this feature, please enable Camera access in app settings.',
      [
        { text: 'Go to Settings', onPress: () => openAppSettings() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  const onAddImgPress = async () => {
    try {
      let options = {
        mediaType: 'photo',
        includeBase64: false,
        selectionLimit: 0,
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
      if (Array.isArray(response.assets)) {
        SaveImg(response.assets);
      }
      else if (response.uri) {
        SaveImg(response.uri);
      }
    }
  };

  const SaveImg = sources => {
    if (Array.isArray(sources)) {
      const newImages = sources.map((photo, i) => ({
        imgId: uuidv4(),
        uri: photo.uri,
        logo: photoArray.length === 0 && i === 0 ? true : false,
      }));
      setPhotoArray(prevArray => [...prevArray, ...newImages]);
    } else if (sources) {
      const AddNewImg = {
        imgId: uuidv4(),
        uri: sources,
        logo: photoArray.length === 0 ? true : false,
      };
      setPhotoArray(prevArray => [...prevArray, AddNewImg]);
    } else {
      console.log('Error: Source is not valid.');
    }
  };

  const onPickImgPress = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );
      if (result === 'granted') {
        LaunchCamera();
      } else {
        showRequestDeniedAlert()
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LaunchCamera = () => {
    try {
      let options = {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      };
      launchCamera(options, response => CameraImageResponse(response));
    } catch (error) {
      console.log('launch Camera Error -> ', error);
    }
  };

  const CameraImageResponse = response => {
    if (response.didCancel) {
      console.log('User Cancelled');
    } else if (response.error) {
      console.log('Camera Error : ', response.error);
    } else if (response.customButton) {
      console.log('Usser tapped custom Button ', response.customButton);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      SaveImg(imageUri);
    }
  };

  const renderServiceImg = ({ item }) => {
    const providerAddPhotoProps = {
      uri: item?.uri,
      selectedPhotos: selectedPhotos,
      setSelectedPhotos: setSelectedPhotos,
      isModalVisible: isModalVisible,
      setIsModalVisible: setIsModalVisible,
    };
    return <ProviderAddPhotoComp {...providerAddPhotoProps} />;
  };

  const RenderMainHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headText}>{language.Header}</Text>
        <Text style={styles.subHeadText}>{language.SubHeader}</Text>
      </View>
    );
  };

  const RenderAddPhoto = () => {
    return (
      <View style={[styles.card]}>
        <TouchableOpacity style={styles.touch} onPress={onAddImgPress}>
          <View>
            <Text style={styles.cardTitle}> {language.CardTitle}</Text>
          </View>
          <View style={styles.IconView}>
            <AntDesign name="plus" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderCapturePhoto = () => {
    return (
      <View style={[styles.card]}>
        <TouchableOpacity style={styles.touch} onPress={onPickImgPress}>
          <View>
            <Text style={styles.cardTitle}>
              {language.CapturePhoto}
            </Text>
          </View>
          <View style={styles.IconView}>
            <Feather name="camera" style={styles.icon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderSelectedImages = () => {
    return (
      <View style={[styles.flatListContainer]}>
        <FlatList
          data={photoArray}
          renderItem={renderServiceImg}
          style={styles.flatList}
          numColumns={2}
          keyExtractor={item => `${item.imgId}`}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const RenderModal = () => {

    const setAsLogo = (uri) => {
      setPhotoArray((prevPhotoArray) => {
        return prevPhotoArray.map((photo) => {
          if (photo.uri === uri) {
            return { ...photo, logo: true };
          } else if (photo.logo) {
            return { ...photo, logo: false };
          }
          return photo;
        });
      });
    };

    const renderPhoto = (photo, index) => {
      const providerAddPhotoProps = {
        uri: photo?.uri,
        selectedPhotos: selectedPhotos,
        setSelectedPhotos: setSelectedPhotos,
        isFromModal: true
      };
      return (
        <View key={index}>
          <Pressable onPress={() => setAsLogo(photo.uri)} disabled={isDeleteMode}>
            <ProviderAddPhotoComp {...providerAddPhotoProps} />
          </Pressable>
        </View>

      );
    };

    return (
      <Modal
        animationType='fade'
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={{ width: '100%', paddingHorizontal: 10 }}>
              {photoArray.map((photo, index) => (
                <View key={index}>
                  {renderPhoto(photo, index)}
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={[styles.footer, isDeleteMode ?
            { justifyContent: 'space-between' } :
            { justifyContent: 'flex-end' }]}>
            {isDeleteMode && renderCancelButton()}
            {RenderNextButton(true)}
          </View>
        </View>

      </Modal>
    );
  };


  const showMessage = () => {
    Platform.OS === 'android'
      ? ToastAndroid.show(language.showDeleteMessage, ToastAndroid.SHORT)
      : Alert.IOS.alert(language.showDeleteMessage);
  };

  const onConfirmDelete = () => {
    selectedPhotos.length < 1 ? showMessage() : deletePhotos()
  }

  const deletePhotos = () => {
    try {
      const newArray = photoArray.filter((photo) => {
        return !selectedPhotos.includes(photo.uri)
      })
      setPhotoArray(newArray);
      setIsDeleteMode(false)
    } catch (error) {
      console.log("delete phtots error ->", error);
    }
  }
  const cancelDeleteMode = () => {
    setIsDeleteMode(false)
    setSelectedPhotos([])
  }

  const renderCancelButton = () => {
    return (
      <Pressable style={AppStyles.next} onPress={cancelDeleteMode}>
        <Text style={AppStyles.nextText}>{language.cancel}</Text>
      </Pressable>
    )
  }

  const RenderNextButton = (isFromModal = false) => {
    return (
      !isDeleteMode ? <Pressable style={AppStyles.next} onPress={() => {
        if (isFromModal) {
          setIsModalVisible(false);
        } else {
          onNextPress();
        }
      }}>
        <Text style={AppStyles.nextText}>{language.Next}</Text>
      </Pressable> :
        <Pressable style={AppStyles.next} onPress={onConfirmDelete}>
          <Text style={AppStyles.nextText}>{language.ConfirmDelete}</Text>
        </Pressable>
    );
  };
  return (
    <View style={AppStyles.container}>
      <HeaderComp />
      {RenderMainHeader()}
      <View style={styles.body}>
        {RenderAddPhoto()}
        {RenderCapturePhoto()}
        {RenderSelectedImages()}
      </View>
      {RenderModal()}
      <View style={[styles.footer, isDeleteMode ?
        { justifyContent: 'space-between' } :
        { justifyContent: 'flex-end' }]}>
        {isDeleteMode && renderCancelButton()}
        {RenderNextButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  headText: {
    fontSize: 20,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  subHeadText: {
    fontSize: 14,
    color: colors.puprble,

  },
  body: {
    height: '80%',
    alignItems: 'center',

    // borderWidth:1
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 50,
    paddingHorizontal: '10%',
    position: 'absolute',
    bottom: 0

  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  card: {
    width: '80%',
    height: 50,
    marginTop: 5,
  },
  IconView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 30,
    marginLeft: 15
  },
  cardTitle: {
    fontSize: 20,
    color: colors.puprble,
  },
  icon: {
    fontSize: 25,
    color: colors.puprble
  },
  flatList: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 5,
    padding: 5
  },
  flatListContainer: {
    flex: 1,
    marginTop: 10,
    width: '90%',
    // borderWidth: 0.3,
    //backgroundColor: colors.BGScereen,
    // borderColor: colors.darkGold,
    borderRadius: 5
  }
})


export default ProviderSetPhotos;

import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import {ScreenNames} from '../../../route/ScreenNames';
import ProviderAddPhotoComp from '../../components/ProviderComponents/ProviderAddPhotoComp';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import strings from '../../assets/res/strings';
import { PERMISSIONS, request} from 'react-native-permissions';
import HeaderComp from '../../components/ProviderComponents/HeaderComp';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';

const ProviderSetPhotos = props => {
  const {photoArray, setPhotoArray} = useContext(ServiceProviderContext);
  const language = strings.arabic.ProviderScreens.ProviderSetPhotos;
  const onNextPress = () => {
    // photoArray.length <5 ? showMessage() :
    props.navigation.navigate(ScreenNames.ProviderSetWorkingRegion, {
      data: {...props},
    });
  };

  const onAddImgPress = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      if (result === 'granted') {
        let options = {
          mediaType: 'photo',
          includeBase64: false,
        };

        launchImageLibrary(options, response => GalleryImageResponse(response));
      } else {
      }
    } catch (error) {
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
      const AddNewImg = {
        imgId: uuidv4(),
        image: source,
        coverPhoto: true,
      };
      setPhotoArray([AddNewImg, ...photoArray]);
    } else {
      console.log('error source isnt legable, source is :', source);
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

  const renderServiceImg = ({item}) => {
    return <ProviderAddPhotoComp uri={item?.image} />;
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
      <View style={[styles.card, AppStyles.shadow]}>
        <TouchableOpacity style={styles.touch} onPress={onAddImgPress}>
          <Card.Title style={styles.cardTitle}>
            {language.CardTitle}
          </Card.Title>
          <AntDesign name="plus" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderCapturePhoto = () => {
    return (
      <View style={[styles.card, AppStyles.shadow]}>
        <TouchableOpacity style={styles.touch} onPress={onPickImgPress}>
          <Card.Title style={styles.cardTitle}>
            {language.CapturePhoto}
          </Card.Title>
          <Feather name="camera" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  const RenderSelectedImages = () => {
    return (
      <View style={[styles.flatListContainer,AppStyles.shadow]}>
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

  const RenderNextButton = () => {
    return (
      <Pressable style={AppStyles.next} onPress={onNextPress}>
        <Text style={AppStyles.nextText}>{language.Next}</Text>
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
      <View style={styles.footer}>
        {/* {RenderBackButton()} */}
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
    height: '70%',
    alignItems: 'center',
    // borderWidth:1
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  backText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 300,
    height: 40,
    borderRadius: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    height: 50,
    marginTop: 10,
    alignSelf: 'center',
    borderColor: colors.darkGold,
    borderWidth: 1
  },
  cardTitle: {
    fontSize: 20,
    marginRight: 20,
    color: colors.puprble
  },
  icon: {
    fontSize: 25, color: colors.puprble
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
    borderWidth: 1.5,
    backgroundColor: colors.BGScereen,
    borderColor: colors.darkGold,
    borderRadius: 5
  }
})


export default ProviderSetPhotos;

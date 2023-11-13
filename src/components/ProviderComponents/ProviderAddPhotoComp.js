import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import strings from '../../assets/res/strings'
import {Alert} from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';

const ProviderAddPhotoComp = props => {
  const language = strings.arabic.ProviderScreens.ProviderSetPhotos;

  const {photoArray, setPhotoArray} = useContext(ServiceProviderContext);

  const removeSelectedPhoto = () => {
    let newArray = photoArray.filter(Imageobj => Imageobj.image !== props.uri);
    setPhotoArray(newArray);
  };

  //   confirmation popup for removing the selected photo
  const ShowImagePopUp = () => {
    let warningButtons = [
      {
        text: language.cancelButton,
        onPress: () => null,
      },
      {
        text: language.confirmButton,
        onPress: () => removeSelectedPhoto(),
      },
    ];
    return Alert.alert(language.warning, language.backWarning, warningButtons);
  };

  try {
    return (
      <TouchableOpacity
        onPress={() => ShowImagePopUp()}
        style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{uri: props.uri}}
        />
      </TouchableOpacity>
    );
  } catch (error) {
    console.log('presenting photo error -> ', error);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 200,
    marginTop: 5,
    marginLeft: 5,
    borderWidth: 2,
    alignSelf:'center'
  },
  image: {
    flex: 1,
  },
});

export default ProviderAddPhotoComp;

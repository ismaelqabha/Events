import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Dimensions, Text } from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import IonIcons from 'react-native-vector-icons/Ionicons'

const ProviderAddPhotoComp = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const { selectedPhotos, setSelectedPhotos, isFromModal, setIsModalVisible, setOptionsModalVisible, logo } = props;
  const showImagesModal = () => {
    setIsModalVisible(true);
  };

  const showModal = () => {
    addToSelected();
    setOptionsModalVisible(true);
  };

  const setSelected = () => {
    selectedPhotos.includes(props.uri) ? removeFromSelected() : addToSelected();
  };

  const removeFromSelected = () => {
    const newSelected = selectedPhotos.filter((selected) => {
      return selected.image === props.uri;
    });
    setSelectedPhotos(newSelected);
    setIsSelected(false);
  };

  const addToSelected = () => {
    selectedPhotos.length < 1
      ? setSelectedPhotos([props.uri])
      : setSelectedPhotos([...selectedPhotos, props.uri]);
    setIsSelected(true);
  };

  try {
    return (
      <View
        style={[isFromModal ? styles.modalContainer : styles.container, AppStyles.shadow]}
      >
        <View style={{ flex: 1 }}>
          <Image resizeMode={isFromModal ? 'center' : 'cover'} style={styles.image} source={{ uri: props.uri }} />
          <View>
            {logo && <Text>Cover Photo</Text>}
          </View>

          <TouchableOpacity onPress={showModal} style={isFromModal ? styles.modalCircule : styles.circule}>
            <IonIcons name="ellipsis-horizontal" style={styles.tick} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    );
  } catch (error) {
    console.log('presenting photo error -> ', error);
    return null; // Render null or a placeholder component in case of an error
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 200,
    height: 190,
    marginVertical: 5,
    marginHorizontal: 5,
    // borderWidth: 1,
    alignSelf: 'center',
    borderColor: colors.darkGold,
    backgroundColor: colors.BGScereen,
  },
  modalContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.95,
    marginVertical: 5,
    marginHorizontal: 5,
    // borderWidth: 1,
    alignSelf: 'center',
    borderColor: colors.darkGold,
    backgroundColor: colors.BGScereen,
  },
  modalDeleteContainer: {
    flex: 1,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.95,
    marginVertical: 5,
    marginHorizontal: 5,
    // borderWidth: 1,
    alignSelf: 'center',
    borderColor: colors.darkGold,
    // backgroundColor: colors.BGScereen,
  },
  image: {
    flex: 1,
  },
  circule: {
    position: 'absolute',
    right: 10,
    top: 10,
    // borderWidth: 2,
    height: 20,
    width: 20,
    // backgroundColor: 'red',
    borderRadius: 50,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.BGScereen
  },
  modalCircule: {
    position: 'absolute',
    right: 10,
    top: Dimensions.get('window').height * 0.15,
    // borderWidth: 2,
    height: 20,
    width: 20,
    // backgroundColor: 'red',
    borderRadius: 50,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.BGScereen
  },
  tick: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    // backgroundColor:'red',
    paddingLeft: 4,
    paddingTop: 2
  }
})



export default ProviderAddPhotoComp;

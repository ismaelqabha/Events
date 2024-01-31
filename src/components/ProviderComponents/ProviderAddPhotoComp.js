import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { AppStyles } from '../../assets/res/AppStyles';
import { colors } from '../../assets/AppColors';
import LottieView from 'lottie-react-native';

const ProviderAddPhotoComp = props => {
  const [isSelected, setIsSelected] = useState(false)
  const { isDeleteMode, setIsDeleteMode } = useContext(ServiceProviderContext)
  const tickRef = useRef(null)
  const { selectedPhotos, setSelectedPhotos } = props

  const ShowImagePopUp = () => {
    setIsDeleteMode(true)
  };

  useEffect(() => {
    isSelected ? tickRef.current?.play(10,50) : tickRef.current?.play(50, 10)
  }, [isSelected])

  const showImagesModal = () => {
   
  }
  const setSelected = () => {
    selectedPhotos.includes(props.uri) ? removeFromSelected() : addToSelected();
  }

  const removeFromSelected = () => {
    const newSelected = selectedPhotos.filter((selected) => {
      return selected.image === props.uri
    })
    setSelectedPhotos(newSelected)
    setIsSelected(false)
  }
  const addToSelected = () => {
    selectedPhotos.length < 1 ?
      setSelectedPhotos([props.uri]) :
      setSelectedPhotos([...selectedPhotos, props.uri])
    setIsSelected(true)

  }
  try {
    return (
      <TouchableOpacity
        onPress={() => showImagesModal()}
        onLongPress={() => ShowImagePopUp()}
        style={[styles.container, AppStyles.shadow]}
        disabled={isDeleteMode}
      >

        {isDeleteMode ? <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelected()}>

          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: props.uri }}
          />
          <View style={styles.circule}>
            <LottieView
              speed={1.5}
              ref={tickRef}
              loop={false}
              style={styles.tick} source={require('../../LottieFiles/tick.json')} />
          </View>
        </TouchableOpacity>
          :
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: props.uri }}
          />
        }
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
    height: 190,
    marginVertical: 5,
    marginHorizontal: 5,
    // borderWidth: 1,
    alignSelf: 'center',
    borderColor: colors.darkGold,
    backgroundColor: colors.BGScereen,
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
  tick: {
    width: 25,
    height: 25,
    alignSelf: 'center'
  }
})



export default ProviderAddPhotoComp;

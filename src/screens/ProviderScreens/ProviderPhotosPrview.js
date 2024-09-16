import { StyleSheet, Text, View, Pressable, Image, ScrollView,Modal } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { invetationBackground } from '../../resources/data';
import { FlatList } from 'react-native-gesture-handler';
import SIZES from '../../resources/sizes';
import { colors } from '../../assets/AppColors';

const height = SIZES.screenWidth * 0.5;
const width = SIZES.screenWidth - 265;

const ProviderPhotosPrview = (props) => {

    const [showImagModal, setShowImagModal] = useState(false);

    const onPressHandler = () => {
        props.navigation.goBack();
    };

    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <AntDesign
                        style={styles.icon}س
                        name={'left'}
                        color={'black'}
                        size={20}
                    />
                </Pressable>
                <Text style={styles.headerTxt}>الصور</Text>
            </View>
        )
    }

    const whenImagePress = () => {
        setShowImagModal(true)
    }

    const showPhotoModal = () => {
        return (
            <Modal
              transparent
              visible={showImagModal}
              animationType='fade'
              onRequestClose={() => setShowImagModal(false)}>
              <View style={styles.centeredView}>
                <View style={styles.detailModal}>
                <Image style={styles.imge}  source={require('../../assets/photos/ameer.png')}/>
                </View>
              </View>
            </Modal>
          )
    }

    const query = () => {
        return invetationBackground || [];
    }
    const renderCard = ({ item }) => {
        return <View>
            <Image style={styles.img} source={item.value} />
        </View>

    };

    const renderImage = () => {
        return (
            <View>
                <View style={styles.row}>
                    <Pressable style={styles.imgItem} onPress={whenImagePress}>
                        <Image style={styles.img}  source={require('../../assets/photos/ameer.png')}/>
                    </Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}></Pressable>
                    <Pressable style={styles.imgItem}>
                        <MaterialIcons
                            name={'add-photo-alternate'}
                            color={colors.silver}
                            size={60}
                        />
                    </Pressable>
                </View>
            </View>

        )
    }

    return (
        <View style={styles.container}>
            {header()}
            <ScrollView>
                {renderImage()}
            </ScrollView>

            {/* <FlatList
                data={query()}
                renderItem={renderCard}
                numColumns={2}
                refreshing={isRefreshing}
            /> */}
            {showPhotoModal()}
        </View>
    )
}

export default ProviderPhotosPrview

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    img: {
        width: "100%",
        height: "100%",
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgItem: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1
    },
    detailModal: {
        width: '95%',
        height: '95%',
        backgroundColor: '#ffffff',
        borderRadius: 20
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
      },
      imge:{
        width: "100%",
        height: "100%",
        borderRadius: 20,
        resizeMode: 'stretch'
      }
})
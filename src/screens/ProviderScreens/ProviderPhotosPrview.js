import { StyleSheet, Text, View, Pressable, Image, ScrollView, Modal, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import SIZES from '../../resources/sizes';
import { colors } from '../../assets/AppColors';
import { addServiceImages } from '../../resources/API';
import { showMessage } from '../../resources/Functions';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ProviderPhotosPrview = (props) => {
    const { serviceImages, serviceID, logoArray } = props.route.params;
    const filteredImages = serviceImages.filter((_, index) => !logoArray[index]);
    const [allImages, setAllImages] = useState(filteredImages || []);
    const [showImagModal, setShowImagModal] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState(0)


    const onPressHandler = () => {
        props.navigation.goBack();
    };

    const whenImagePress = (index) => {
        setModalImageIndex(index);
        setShowImagModal(true);
    };

    const openGalleryForMultipleSelection = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            includeBase64: false,
            selectionLimit: 0,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const newImages = response.assets.map((asset) => ({
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName,
                }));

                addServiceImages(newImages, serviceID)
                    .then((resJson) => {
                        if (resJson.message === 'Images saved' || resJson.message === "Images saved and updated") {
                            showMessage("Images uploaded successfully!");
                            console.log("resJson", resJson);

                            setAllImages((prevImages) => [...prevImages, ...resJson?.images]);
                            set
                        } else {
                            showMessage("Failed to upload images.");
                        }
                    })
                    .catch((error) => {
                        console.log('Error uploading images:', error);
                        showMessage("Error uploading images");
                    });
            }
        });
    };

    const showPhotoModal = () => {
        return (
            <Modal
                transparent
                visible={showImagModal}
                animationType="fade"
                onRequestClose={() => setShowImagModal(false)}>
                <View style={styles.centeredView}>
                    <FlatList
                        data={allImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        initialScrollIndex={modalImageIndex}
                        getItemLayout={(data, index) => ({
                            length: screenWidth,
                            offset: screenWidth * index,
                            index
                        })}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.detailModal}
                                onPress={() => setShowImagModal(false)}
                            >
                                <Image resizeMode='contain' style={styles.imge} source={{ uri: item.uri || item || 'https://via.placeholder.com/150' }} />
                            </Pressable>
                        )}
                    />
                </View>
            </Modal>
        );
    };

    const renderImages = () => {
        return allImages.map((image, index) => {
            return (
                <Pressable key={index} style={styles.imgItem} onPress={() => whenImagePress(index)}>
                    <Image resizeMode='contain' style={styles.img} source={{ uri: image.uri || image }} />
                </Pressable>
            );
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}>
                    <View>
                        <AntDesign name={'left'} color={'black'} size={20} />
                    </View>
                </Pressable>
                <Text style={styles.headerTxt}>الصور</Text>
            </View>
            <ScrollView contentContainerStyle={styles.grid}>
                {renderImages()}
                <Pressable style={styles.imgItem} onPress={openGalleryForMultipleSelection}>
                    <MaterialIcons name={'add-photo-alternate'} color={colors.silver} size={60} />
                </Pressable>
            </ScrollView>
            {showPhotoModal()}
        </View>
    );
};

export default ProviderPhotosPrview;


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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    img: {
        width: "100%",
        height: "100%",
        borderWidth: 1
    },
    imgItem: {
        width: (SIZES.screenWidth / 3) - 15,
        height: (SIZES.screenHeight / 4) - 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0.1,
        shadowColor: "black",
        elevation: 1
    },
    detailModal: {
        width: screenWidth * 0.95,
        height: screenHeight * 0.95,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: screenHeight * 0.025,
        marginHorizontal: screenWidth * 0.025
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    imge: {
        flex: 1,
        borderRadius: 20,
    },

});

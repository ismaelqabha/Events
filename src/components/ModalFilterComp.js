import React,{useContext} from 'react';
import {View, StyleSheet, Modal , Pressable, Text } from 'react-native';
import SearchContext from '../../store/SearchContext';

const ModalFilterComp = () => {
    const [showModal, setShowModal] = useContext(SearchContext);

     const modalPress = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);;
    }
    return (
        <View>
            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.AllModal}>
                    <View style={styles.dModal}>
                        <View style={styles.Modaltitle}>
                            <Text style={styles.text}>...</Text>
                        </View>
                        <View style={styles.body}>
                            <Text>Hi</Text>
                        </View>
                        <Pressable onPress={() => closeModal()}>
                            <Text>Close</Text>
                        </Pressable>

                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dModal: {
        width: "100%",
        height: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    AllModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Modaltitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        height: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
})

export default ModalFilterComp;

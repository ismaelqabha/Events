import { StyleSheet, Text, View,Pressable,Modal } from 'react-native'
import React,{useState} from 'react'
import { colors } from '../../assets/AppColors';
import AntDesign from "react-native-vector-icons/AntDesign";

const ProviderClientRequestShow = (props) => {
    const {requests} =  props.route?.params 
    const [showModal, setShowModal] = useState(false);
    

    const onPressHandler = () => {
        props.navigation.goBack();
    }
    const header = () => {
        return (
            <View style={styles.header}>
                <Pressable onPress={onPressHandler}
                >
                    <AntDesign
                        style={styles.icon}
                        name={"left"}
                        color={"black"}
                        size={20} />

                </Pressable>
                <Text style={styles.headerTxt}>قائمة الحجوزات</Text>
            </View>
        )
    }

    const renderRequest = () => {
        return requests.map(item => {
            console.log(item.clientPayment);
            return(
                <View style={styles.req}>
                    <Text>{item.clientRequest.Cost}</Text>
                    {item.clientRequest.reservationDetail.map(element => {
                        return <Text>{element.reservationDate}</Text>
                    })}
                    <Text>{item.clientRequest.ReqStatus}</Text>
                    <Text>الدفعات</Text>
                </View>
            )
        })
    }

    const renderDetailModal = () => {
        return (
            <Modal
                transparent
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}>
                <View style={styles.servDetailModal}>
                    <View style={styles.bodyModal}>

                        <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                            <Feather
                                style={styles.menuIcon}
                                name={'more-horizontal'}
                                color={colors.puprble}
                                size={25} />
                        </Pressable>
                        {renderEditServiceDetailInfo()}
                    </View>
                </View>
            </Modal>
        )
    }
  return (
    <View style={styles.container}>
      {header()}
      {renderRequest()}
    </View>
  )
}

export default ProviderClientRequestShow

const styles = StyleSheet.create({
    container: {

    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    headerTxt: {
        fontSize: 18,
        color: colors.puprble,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    req:{
        width: '90%',
        height: 110,
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: colors.silver,
        borderRadius: 10,
        marginVertical: 5,
        padding: 10
    }
})
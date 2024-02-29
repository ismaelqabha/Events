import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { colors } from '../../assets/AppColors';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ProviderSubDetailComp = (props) => {


    const renderCard = () => {
        return (
            <View style={styles.cardHeader}>

                <View style={styles.imgView}>
                    <Image source={props.subDetailPhoto} style={styles.img} />
                </View>
                <View style={styles.txtView}>
                    <Text style={styles.textTitle}>{props.detailSubtitle}</Text>
                    <Text style={styles.textTitle}>₪{props.detailSubtitleCost}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable style={{ margin: 10 }} onPress={() => { props.deleteItem(props.subDetail_Id) }}>
                            <AntDesign name='delete' size={20} />
                        </Pressable>
                        <Pressable style={{ margin: 10 }} onPress={() => { props.openEdit(props) }}>
                            <Feather name='edit' size={20} />
                        </Pressable>
                    </View>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            {renderCard()}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        height: 150,
        elevation: 3,
        marginBottom: 20,
        backgroundColor: 'white',
        width: 350,
        borderRadius: 5,
        justifyContent: 'space-between',
        //alignItems: 'center',
        margin: 5,
        alignSelf: 'center'
    },
    txtView: {
        alignItems: 'flex-end',
        margin: 10,
        width: "55%",
        justifyContent: 'space-between'
    },
    textTitle: {
        fontSize: 18,
        color: colors.puprble,
    },
    img: {
        height: '100%',
        width: '100%',
        flex: 1,
        resizeMode: 'stretch'

    },
    imgView: {
        height: 120,
        width: '30%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        margin: 10
    }
})

export default ProviderSubDetailComp;

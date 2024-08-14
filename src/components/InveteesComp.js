import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React from 'react'
import { colors } from '../assets/AppColors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { images } from '../assets/photos/images';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const InveteesComp = (props) => {
const {inviteesList} = props

    const RnderSearchBar = () => {
        return (
            <View style={styles.SearchView}>
                <TextInput
                    style={styles.Input}
                    placeholder='بحث'
                />
                <AntDesign
                    style={styles.icon}
                    name={"search1"}
                    size={20}
                />
            </View>
        )
    } 

    const RnderInveteesItem = () => {
        return inviteesList.map(item => {
            return (
                <View style={styles.ItemView}>
                    <View style={styles.Invetation}>
                        <Text style={styles.txt}> {item.recivedConfirmation}</Text>
                    </View>
                    <View style={styles.NameView}>
                        <Text style={styles.txt}>{item.recivedName}</Text>
                        <Image style={styles.img} source={item.recivedPhoto} />
                    </View>
                </View>
            )
        })
        


    }

    return (
        <View>
            {RnderSearchBar()}
            {RnderInveteesItem()}
        </View>
    )
}

export default InveteesComp

const styles = StyleSheet.create({

    SearchView: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: colors.silver,
        alignSelf: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,

    },
    icon: {
        marginHorizontal: 10,
    },
    ItemView: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    NameView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 30,
        marginLeft: 20,
    },
    txt: {
        fontSize: 18,
        color: colors.puprble,
    },

})
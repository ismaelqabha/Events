import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../assets/AppColors'
import SearchContext from '../../../store/SearchContext'
import { Views } from '../../resources/data'

const ProviderUsersView = (props) => {

    const { isFirst } = useContext(SearchContext);

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
                <Text style={styles.headerTxt}>زيارات المستخدمين</Text>
            </View>
        )
    }

    const filterViews = () => {
       return Views[0].accessPoint.filter(item => {
        return item.fieldType === 'view'
       })
    }

    const filterCall = () => {
        return Views[0].accessPoint.filter(item => {
         return item.fieldType === 'call'
        })
     }

     const filterFacebook = () => {
        return Views[0].accessPoint.filter(item => {
         return item.fieldType === 'faceBook'
        })
     }

   

    const renderDataCard = () => {
        const data = filterViews()
            return (
                <View style={styles.card}>
                    <View style={styles.info}>
                        <Text style={styles.txt}>{data.length}</Text>
                        <Text style={styles.txt}>{data[0].fieldType}</Text>
                    </View>
                </View>
            )
    }
    const renderDataCall = () => {
        const data = filterCall()
            return (
                <View style={styles.card}>
                    <View style={styles.info}>
                        <Text style={styles.txt}>{data.length}</Text>
                        <Text style={styles.txt}>{data[0].fieldType}</Text>
                    </View>
                </View>
            )
    }
    const renderDataFacebook = () => {
        const data = filterFacebook()
            return (
                <View style={styles.card}>
                    <View style={styles.info}>
                        <Text style={styles.txt}>{data.length}</Text>
                        <Text style={styles.txt}>{data[0].fieldType}</Text>
                    </View>
                </View>
            )
    }
    return (
        <View style={styles.container}>
            {header()}
            {renderDataCard()}
            {renderDataCall()}
            {renderDataFacebook()}
        </View>
    )
}

export default ProviderUsersView

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
    card: {
        width: '90%',
        height: 90,
        borderWidth: 2,
        borderColor: colors.silver,
        alignSelf: 'center',
        marginVertical: 10,
        justifyContent: 'center'
    },
    info: {
        flexDirection: 'row',
        alignItem: 'center',
        justifyContent: 'space-around'
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
    }
})
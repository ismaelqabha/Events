import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from '../../assets/AppColors'
import SearchContext from '../../../store/SearchContext'
import { Views } from '../../resources/data'
import ServiceProviderContext from '../../../store/ServiceProviderContext'

const ProviderUsersView = (props) => {

    const { isFirst } = useContext(SearchContext);
    const { visits, setVisits } = useContext(ServiceProviderContext);

    // console.log(">><><>",visits[0].accessPoint);
    const visitTypes = visits[0].accessPoint


    

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

    useEffect(() => {
        
    }, [])

    const filterViews = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'view'
        })
    }

    const filterCall = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'call'
        })
    }

    const filterFacebook = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'facebook'
        })
    }
    const filterInstegram = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'instegram'
        })
    }
    const filterYoutube = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'youtube'
        })
    }
    const filterX = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'X'
        })
    }
    const filterTiktok = () => {
        return visitTypes.filter(item => {
            return item.fieldType === 'tiktok'
        })
    }


    const renderDataCard = (data) => {
        var label = ''
        if (data[0].fieldType === 'view'){
            label = 'زيارات البروفايل'
        }
        if (data[0].fieldType === 'facebook'){
            label = 'زيارات facebook'
        }
        if (data[0].fieldType === 'call'){
            label = 'الاتصال بالهاتف'
        }
        if (data[0].fieldType === 'instegram'){
            label = 'زيارات Instegram'
        }
        if (data[0].fieldType === 'youtube'){
            label = 'زيارات Youtube'
        }
        if (data[0].fieldType === 'tiktok'){
            label = 'زيارات TikTok'
        }
        if (data[0].fieldType === 'X'){
            label = 'زيارات X'
        }
        return (
            <View style={styles.card}>
                <View style={styles.info}>
                    <View style={styles.viewsNumber}>
                        <Text style={styles.txt}>{data.length}</Text>
                    </View>
                    <View style={styles.viewsType}>
                        <Text style={styles.txt}>{label}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderVisits = () => {
        const data = filterViews()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }

    const renderDataCall = () => {
        const data = filterCall()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }
    const renderDataFacebook = () => {
        const data = filterFacebook()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }

    }

    const renderDataInstegram = () => {
        const data = filterInstegram()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }
    const renderDataYoutube = () => {
        const data = filterYoutube()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }
    const renderDataX = () => {
        const data = filterX()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }
    const renderDataTiktok = () => {
        const data = filterTiktok()
        if (data.length > 0) {
            return <View>{renderDataCard(data)}</View>
        }
    }
    return (
        <View style={styles.container}>
            {header()}
            {renderVisits()}
            {renderDataCall()}
            {renderDataFacebook()}
            {renderDataInstegram()}
            {renderDataYoutube()}
            {renderDataX()}
            {renderDataTiktok()}
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
        height: '100%'
    },
    txt: {
        fontSize: 20,
        color: colors.puprble,
    },
    viewsNumber: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    viewsType: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    }
})
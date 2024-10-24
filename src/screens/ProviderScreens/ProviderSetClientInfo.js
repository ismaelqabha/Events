import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { colors } from '../../assets/AppColors';
import { getRegions } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';
import { showMessage } from '../../resources/Functions';
import SearchContext from '../../../store/SearchContext';

const ProviderSetClientInfo = (props) => {
    const { providerClients } = props
    const { setUserCity, setCreateUserRegion } = useContext(UsersContext);
    const { isFirst } = useContext(SearchContext);
    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)

    useEffect(() => {
        getRegionsfromApi()

    }, [])

    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            res?.message ? showMessage(res.message) : updateData(res?.regions)
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })

    }

    const updateData = (regions) => {
        setRegions(regions)
        const allData = []
        regions?.forEach(region => {
            allData.push(...region?.regionCities)
        });
        allData.sort()
        setRegionData(allData)
    }

    const searchRegion = (val) => {
        if (!regions) {
            return;
        } else {
            regions.forEach((region) => {
                var index = region?.regionCities?.findIndex(city => {
                    return city === val
                })
                if (!(index === -1)) {
                    setCreateUserRegion(region?.regionName)
                }
            })
        }
    }

    const renderClientAddress = () => {
        return (

            <View style={styles.addressView}>
                <SelectList
                    data={regionData}
                    setSelected={val => {
                        setUserCity(val);
                        searchRegion(val)
                    }}
                    placeholder={"أختر العنوان"}
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}
                />
            </View>

        )
    }
    const renderClientInfo = () => {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='رقم الهاتف'
                    value={{}}
                    onChangeText={{}} />

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='البريد الالكتروني'
                    value={{}}
                    onChangeText={{}} />
            </View>)
    }

    const renderClientName = () => {
        return (
            <View style={styles.input}>
                <TextInput
                    keyboardType='default'
                    placeholder='اسم الزبون'
                    value={{}}
                    onChangeText={{}}
                />
            </View>
        )
    }

    return (
        <View>
            {renderClientName()}
            {renderClientInfo()}
            {renderClientAddress()}
        </View>
    )
}

export default ProviderSetClientInfo

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1.5,
        borderColor: colors.silver,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    addressView: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    dropdown: {
        // height: 50,
        // maxWidth: '80%',
        // minWidth: '80%',
        // alignSelf: 'center',
        // backgroundColor: 'lightgray',
        // borderRadius: 10,
        textAlign: 'right',
        borderWidth: 1.5,
        borderColor: colors.silver,
    },
    dropstyle: {
        color: 'black',
        fontSize: 15,

    },
    droptext: {
        fontSize: 18,
        color: 'black',
    },
})
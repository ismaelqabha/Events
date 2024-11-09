import { StyleSheet, Text, View, TextInput, FlatList, I18nManager, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { SelectList } from 'react-native-dropdown-select-list';
import { colors } from '../../assets/AppColors';
import { getRegions, searchUsersAPI } from '../../resources/API';
import UsersContext from '../../../store/UsersContext';
import { showMessage } from '../../resources/Functions';
import SearchContext from '../../../store/SearchContext';
import { TouchableOpacity } from 'react-native';

const ProviderSetClientInfo = (props) => {
    const { providerClients, onInputChange, inputValuesParent } = props
    const { setUserCity, setCreateUserRegion } = useContext(UsersContext);
    const { isFirst } = useContext(SearchContext);
    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [searchResults, setSearchResults] = useState([]);
    const [inputValues, setInputValues] = useState({ ...inputValuesParent });
    const [selectedUser, setSelectedUser] = useState(null);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        getRegionsfromApi()

    }, [])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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

    const handleInputChange = async (field, value) => {
        setInputValues(prev => ({ ...prev, [field]: value }));
        onInputChange({ ...inputValues, [field]: value });

        if (value) {
            try {
                const results = await searchUsersAPI({ query: value, field });
                setSearchResults(results || []);
            } catch (error) {
                console.log("Error fetching search results:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectUser = (user) => {
        setInputValues({
            name: user.userInfo.User_name,
            phone: user.userInfo.UserPhone.toString(),
            email: user.userInfo.Email,
        });
        setSelectedUser(user);
        setSearchResults([]);
    };

    const renderClientAddress = () => {
        return (

            <View style={styles.addressView}>
                <SelectList
                    data={regionData}
                    setSelected={val => {
                        setUserCity(val);
                        searchRegion(val)
                        handleInputChange('location', val)
                    }}
                    placeholder={"أختر العنوان"}
                    boxStyles={styles.dropdown}
                    inputStyles={styles.droptext}
                    dropdownTextStyles={styles.dropstyle}
                />
            </View>

        )
    }
    const renderClientInfo = () => (
        <View>
            <TextInput
                style={[styles.input, styles.phoneInput]}
                keyboardType='phone-pad'
                placeholder='رقم الهاتف'
                value={inputValues.phone}
                onFocus={() => setActiveField('phone')}
                onChangeText={(value) => handleInputChange('phone', value)}
            />
            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='البريد الالكتروني'
                value={inputValues.email}
                onFocus={() => setActiveField('email')}
                onChangeText={(value) => handleInputChange('email', value)}
            />
        </View>
    );

    const renderClientName = () => (
        <TextInput
            style={styles.input}
            keyboardType='default'
            placeholder='اسم الزبون'
            value={inputValues.name}
            onFocus={() => setActiveField('name')}
            onChangeText={(value) => handleInputChange('name', value)}
        />
    );

    const renderSearchResults = () => (
        <FlatList
            data={searchResults}
            keyExtractor={(item) => item.userInfo.USER_ID}
            style={[
                styles.searchResultsContainer,
                isKeyboardVisible ? { position: 'absolute', bottom: activeField === 'name' ? '40%' : activeField === 'phone' ? '75%' : '50%' } : { position: 'relative' }
            ]}
            renderItem={({ item }) => {
                const isClient = providerClients.some(client => client === item.userInfo.USER_ID);
                return (
                    <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => handleSelectUser(item)}
                        activeOpacity={1} // Keeps the touchable fully active
                    >
                        <Text style={styles.resultText}>{item.userInfo.User_name}</Text>
                        <Text style={styles.resultText}>Phone: {item.userInfo.UserPhone}</Text>
                        <Text style={styles.resultText}>Email: {item.userInfo.Email}</Text>
                        <Text style={[styles.statusText, isClient ? styles.client : styles.generalUser]}>
                            {isClient ? 'Client' : 'User'}
                        </Text>
                    </TouchableOpacity>
                );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled" // Prevents keyboard from dismissing on touch
        />
    );

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={{ flex: 1 }}>
                {renderClientName()}
                {renderClientInfo()}
                {renderClientAddress()}
                {searchResults.length > 0 && renderSearchResults()}
            </View>
        </KeyboardAvoidingView>
    );
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
    phoneInput: {
        textAlign: I18nManager.isRTL ? 'right' : 'left', // Ensure the placeholder is aligned correctly
        textAlignVertical: 'center',
    },
    addressView: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        zIndex: 1
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
    resultItem: {
        backgroundColor: colors.silver,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: 300,
        marginHorizontal: 5,
        zIndex: 1,
    },
    resultText: {
        color: 'black',
        fontSize: 15,
    },
    searchResultsContainer: {
        maxHeight: 200,
        alignSelf: 'center',
        width: '90%',
        zIndex: 2,
    },
    statusText: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
    },
    client: {
        color: 'green',
    },
    generalUser: {
        color: 'gray',
    },
})
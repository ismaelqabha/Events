import { StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { colors } from '../../assets/AppColors';
import { Pressable } from 'react-native';
import { getRegions, updateService } from '../../resources/API';
import { SelectList } from 'react-native-dropdown-select-list';

const EditServiceInfo = (props) => {
    const { editTitle, serviceID, editSubTitle, editHallcapasity, editphone, editEmail, editprice, editNumofRequest,editCity } = props
    const { serviceInfoAccorUser, setServiceInfoAccorUser } = useContext(ServiceProviderContext);

    const selectedServiceIndex = serviceInfoAccorUser?.findIndex(item => item.service_id === serviceID)
    const getServiceInfo = () => {
        return serviceInfoAccorUser?.filter(item => {
            return item.service_id === serviceID;
        });
    };
    const serviceData = getServiceInfo()

    const [serviceTitle, setServiceTitle] = useState();
    const [serviceSubTitle, setServiceSubTitle] = useState();
    const [serviceHallCapasity, setServiceHallCapasity] = useState();
    const [servicePhone, setServicePhone] = useState();
    const [serviceEmail, setServiceEmail] = useState();
    const [servicePrice, setServicePrice] = useState();
    const [maxRequest, setMaxRequest] = useState();
    const [serviceRegion, setserviceRegion] = useState();
    const [serviceAddress, setserviceAddress] = useState();

    const [regionData, setRegionData] = useState([])
    const [regions, setRegions] = useState(null)
    const [address, setAddress] = useState(null)


    const editBasicInfoPress = (label, itemInfo, setState, update) => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editTitleView}>
                    <Text style={styles.itemText}>{label}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        placeholder={itemInfo}
                        onChangeText={setState}
                    />
                    <View style={styles.itemFooter}>
                        <Pressable onPress={update}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>)
    }
    const getRegionsfromApi = async () => {
        getRegions().then((res) => {
            res?.message ? showMessage(res.message) : updateData(res?.regions)
        }).catch((e) => {
            console.log("error fetching -> ", e);
        })

    }
    // region part
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
                    setAddress(region?.regionName)
                    setserviceRegion(region?.regionName)
                }
            })
        }
    }

    useEffect(() => {
        getRegionsfromApi()
      }, [])
    const editAddressPress = () => {
        return (
            <View style={styles.itemView}>
                <View style={styles.editAddressView}>
                    <View style={styles.region}>
                        <Text> {address || serviceData[0].region}</Text>
                    </View>
                    <SelectList
                        data={regionData}
                        setSelected={val => {
                            setserviceAddress(val)
                            searchRegion(val)
                        }}
                        placeholder={serviceAddress || serviceData[0].address}
                        boxStyles={styles.dropdown}
                        inputstyles={styles.droptext}
                        dropdownTextstyles={styles.dropstyle}
                    />
                    <View style={styles.itemFooter}>
                        <Pressable onPress={updateAddress}>
                            <Text style={styles.itemText}>حفظ</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    // Update functions
    const updateTitle = () => {
        const newData = {
            service_id: serviceID,
            title: serviceTitle
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateSubTitle = () => {
        const newData = {
            service_id: serviceID,
            subTitle: serviceSubTitle
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateHallCapasity = () => {
        const newData = {
            service_id: serviceID,
            maxCapasity: serviceHallCapasity
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updatePhone = () => {
        const newData = {
            service_id: serviceID,
            servicePhone: servicePhone
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateEmail = () => {
        const newData = {
            service_id: serviceID,
            serviceEmail: serviceEmail
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updatePrice = () => {
        const newData = {
            service_id: serviceID,
            servicePrice: servicePrice
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateMaxRequest = () => {
        const newData = {
            service_id: serviceID,
            numRecivedRequest: maxRequest
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }
    const updateAddress = () => {
        const newData = {
            service_id: serviceID,
            region: serviceRegion,
            address: serviceAddress
        }
        updateService(newData).then(res => {
            const data = serviceInfoAccorUser || [];
            if (selectedServiceIndex > -1) {
                data[selectedServiceIndex] = newData;
            }
            if (res.message === 'Updated Sucessfuly') {
                setServiceInfoAccorUser([...data])
                ToastAndroid.showWithGravity(
                    'تم التعديل بنجاح',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                );
            }
        })

    }


    const renderSelectedEdit = () => {
        if (editTitle) {
            let label = 'اسم المصلحة'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].title, setServiceTitle, updateTitle)}</View>
            )
        }
        if (editSubTitle) {
            let label = 'العنوان الترويجي'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].subTitle, setServiceSubTitle, updateSubTitle)}</View>
            )
        }
        if (editphone) {
            let label = 'رقم الهاتف'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].servicePhone, setServicePhone, updatePhone)}</View>
            )
        }
        if (editEmail) {
            let label = 'البريد الالكتروني'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].serviceEmail, setServiceEmail, updateEmail)}</View>
            )
        }
        if (editprice) {
            let label = 'السعر'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].servicePrice, setServicePrice, updatePrice)}</View>
            )
        }
        if (editNumofRequest) {
            let label = 'الحد الاقصى للحجوزات'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].numRecivedRequest, setMaxRequest, updateMaxRequest)}</View>
            )
        }
        if (editHallcapasity) {
            let label = 'سعة القاعة'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].maxCapasity, setServiceHallCapasity, updateHallCapasity)}</View>
            )
        }
        if (editprice) {
            let label = 'السعر'
            return (
                <View>{editBasicInfoPress(label, serviceData[0].servicePrice, setServicePrice, updatePrice)}</View>
            )
        }
        if (editCity) {
            return (
                <View>{editAddressPress()}</View>
            )
        }

    }

    return (
        <View style={styles.container}>
            {renderSelectedEdit()}
        </View>
    )
}

export default EditServiceInfo

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        textAlign: 'center',
        height: 50,
        width: '90%',
        borderWidth: 0.6,
        borderRadius: 8,
        borderColor: 'white',
        fontSize: 15,
        color: 'black',
        alignSelf: 'center',
        marginVertical: 5
    },
    itemView: {
        // borderWidth: 1,
        width: '100%',
        height: '90%',
        marginTop: 50,
        justifyContent: 'center'
    },
    itemText: {
        fontSize: 18,
        color: colors.puprble,
        marginRight: 20
    },
    itemFooter: {
        //borderWidth: 1,
        height: '20%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    editTitleView: {
        //borderWidth: 1,
        height: '30%',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        elevation: 5,
        margin: 5
    },
    editAddressView:{
        height: '60%',
        backgroundColor: 'lightgray',
        elevation: 5,
        margin: 5,
        alignItems: 'center'
    },
    region: {
        textAlign: 'right',
        height: 50,
        width: '70%',
        fontSize: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown: {
        height: 50,
        maxWidth: '70%',
        minWidth: '70%',
        fontSize: 17,
        borderColor: 'white'
    },
    dropstyle: {
        textAlign: 'left',
        //color: colors.darkGold,
        fontWeight: 'bold',
        fontSize: 20,
    },
    droptext: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.darkGold,
        textAlign: 'right'
    },
})
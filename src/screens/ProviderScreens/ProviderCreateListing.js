import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';
import SearchContext from '../../../store/SearchContext';
import PoviderServiceListCard from '../../components/PoviderServiceListCard';
import { ScreenNames } from '../../../route/ScreenNames';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';


const ProviderCreateListing = (props) => {
    const [supmeted, setSupmeted] = useState(false)
    const { userId, ServiceDataInfo, setServiceDataInfo, setServId, ServId } = useContext(SearchContext);

    let SId = uuidv4();

    const onPressHandler = () => {
        setSupmeted(!supmeted);
    }
    const chickIfChecked = () => {
        const isChecked = ServiceDataInfo.find(item => item.service_id === SId)
        return !!isChecked;
    }

    const onStartPress = () => {
        setServId(SId)
        console.log("chickIfChecked", chickIfChecked());
        const AddNewService = {
            service_id: SId,
            UserId: userId,
            workingRegion: [],
        }

        let ServiceArr = ServiceDataInfo;
        if (!chickIfChecked()) {
            ServiceArr.push(AddNewService);
            setServiceDataInfo([...ServiceArr])
        } else {
            ServiceArr = ServiceArr.filter(ser => ser.service_id != SId)
            setServiceDataInfo([...ServiceArr])
        }
        
        console.log(ServiceDataInfo);
        props.navigation.navigate(ScreenNames.ProviderChooseService, { data: { ...props }, isFromChooseServiceClick: true });
    }

    const query = () => {
        return ServiceDataInfo.filter(id => {
            return id.UserId == userId;
        })
    }
    const renderService = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <PoviderServiceListCard  {...card} />;
        });
        return cardsArray;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>أهلا وسهلا, اسماعيل</Text>
            </View>
            <View style={styles.body}>
                {renderService()}
            </View>
            <Text style={styles.line}>____________________________________________________</Text>
            <View style={styles.footer}>
                <Text style={styles.footerText}>ابدأ بخدمة جديده</Text>
                <TouchableOpacity style={styles.AddButton} onPress={onStartPress}
                //activeOpacity={0.2} underlayColor={supmeted ? 'white' : 'gray'}
                >
                    <AntDesign
                        name='plussquareo'
                        style={{ fontSize: 30, alignSelf: 'center', marginRight: 30 }}
                    />
                    <Text style={styles.footText}>انشاء خدمة جديده</Text>
                    <FontAwesome5
                        name='less-than'
                        style={{ fontSize: 20, alignSelf: 'center', marginLeft: 30 }}
                    />
                </TouchableOpacity>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
    },
    body: {
        height: '40%',
        marginTop: 20,
    },
    footer: {
        //alignItems: 'flex-end',
        marginTop: 20,

    },
    AddButton: {
        flexDirection: 'row-reverse',
        width: '100%',
        height: 60,
        justifyContent: 'space-between'
    },
    headText: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    footerText: {
        fontSize: 18,
        color: 'black',
        marginRight: 30,
        marginBottom: 10,
    },
    footText: {
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 130,
    },
    line: {
        textAlign: 'center',
        color: '#d3d3d3'
    },

})

export default ProviderCreateListing;

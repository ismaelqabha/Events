import React, { useContext,useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, TouchableOpacity,Modal,TextInput } from 'react-native';
import SearchContext from '../../../store/SearchContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProviderSubDetailComp from '../../components/ProviderComponents/ProviderSubDetailComp';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const ProviderAddSubDetail = (props) => {
    const { data } = props?.route.params;
    const { serviceSubDetail , setserviceSubDetail } = useContext(SearchContext)
    const [showModal, setShowModal] = useState(false);
    const [SDtitle, setSDTitle] = useState();
    const [SPricetitle, setSPricetitle] = useState();

    let SubDid = uuidv4();
    
    const chickIfExist = () => {
        const isChecked = serviceSubDetail.find(item => item.id === SubDid && item.subDetail_Id === data.detail_Id)
        return !!isChecked;
    }
    const modalSavePress = () => {
        const AddNewSubDetail = {
            subDetail_Id: data.detail_Id,
            id:SubDid,
            detailSubtitle: SDtitle,
            detailSubtitleCost: SPricetitle,
            imgSrc:''
        }

        let SubDetailArr = serviceSubDetail;
        if (!chickIfExist()) {
            SubDetailArr.push(AddNewSubDetail);
            setserviceSubDetail([...SubDetailArr])
        }
        console.log(serviceSubDetail);
        setShowModal(false);
    }

    const modalDeletePress = () => {
        setShowModal(false);
    }
    const onStartPress = () => {
        setShowModal(true);
    }
    const onBackPress = () => {
        props.navigation.goBack();
    }
    const query = () => {
        return serviceSubDetail.filter(id => {
            return id.subDetail_Id == data.detail_Id;
        })
    }
    const renderService = () => {
        const data = query();
        const cardsArray = data.map(card => {
            return <ProviderSubDetailComp  {...card} />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headText}>ما هي تفاصيل الخدمات التي تقدمها ؟</Text>
            </View>
            <View style={styles.Mbody}>
                <TouchableOpacity style={styles.AddButton}
                onPress={onStartPress}
                >
                    <AntDesign
                        name='plussquareo'
                        style={{ fontSize: 30, alignSelf: 'center', marginRight: 30 }}
                    />
                    <Text style={styles.footText}>انشاء جديد</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.home}>
                {renderService()}
                    
                </ScrollView>
            </View>

            <View style={styles.footer}>
                <Pressable style={styles.back} onPress={onBackPress}>
                    <Text style={styles.backText}>رجوع</Text>
                </Pressable>
            </View >
            <Modal
                transparent
                visible={showModal}
                animationType='slide'
                onRequestClose={() =>
                    setShowModal(false)
                }
            >
                <View style={styles.centeredView}>
                    <View style={styles.detailModal}>
                        <View style={styles.Motitle}>
                            <Text style={styles.text}>أدخل تفاصيل الخدمة</Text>
                        </View>
                        <View style={styles.body}>
                            <TextInput
                                style={styles.titleInput}
                                placeholder= 'تفاصيل الخدمة'
                                keyboardType='default'
                                maxLength={60}
                                onChangeText={(value) => { setSDTitle(value) }}
                            />
                            <TextInput
                                style={styles.titleInput}
                                placeholder= 'السعر المقترح'
                                keyboardType='numeric'
                                onChangeText={(value) => { setSPricetitle(value) }}
                            />
                        </View>
                        <View style={styles.Modalbtn}>
                            <Pressable onPress={() => modalDeletePress()} >
                                <Text style={styles.text}>الغاء</Text>
                            </Pressable>
                            <Pressable onPress={() => modalSavePress()} >
                                <Text style={styles.text}>حفظ</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>

            </Modal>
        </View>
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
    headText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Cairo-VariableFont_slnt,wght',
    },
    Mbody: {
        height: '75%',
        marginTop: 20,
        alignItems: 'center'
    },
    AddButton: {
        flexDirection: 'row-reverse',
        height: 60,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 25,
        marginBottom: 20,
    },
    footText: {
        fontSize: 18,
        color: 'black',
        alignSelf: 'center',
        marginLeft: 130,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
        marginLeft: 20,
    },
    back: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    detailModal: {
        width: "100%",
        height: 300,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#00000099',
    },
    Motitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    Modalbtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 60,
    },
    titleInput: {
        textAlign: 'right',
        height: 50,
        width: 315,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#dcdcdc',
        fontSize: 18,
        color: 'black',
        backgroundColor: 'white',
        marginBottom:20
    },
})

export default ProviderAddSubDetail;

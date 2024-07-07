import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text, Animated, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchContext from '../../../store/SearchContext';
import { colors } from '../../assets/AppColors';
import { ScreenNames } from '../../../route/ScreenNames';

const SearchServcies = (props) => {

    const { ServiceDataInfo } = useContext(SearchContext);
    const [searched, setSearched] = useState('')
    const slideInAnimation = useRef(new Animated.Value(0)).current;

    //const servicesInfo = 

    const onPressHandler = () => {
        props.navigation.goBack();
    }

    //console.log("ServiceDataInfo", ServiceDataInfo[0].serviceImages);

    const goToserviceDescr = (serInfo) => {
        props.navigation.navigate(ScreenNames.ServiceDescr, { data: serInfo });
    }

    const header = () => {
        return (
            <View style={styles.title}>
                <Pressable onPress={onPressHandler}
                >
                    <Ionicons
                        style={styles.icon}
                        name={"arrow-back"}
                        color={"black"}
                        size={25} />
                </Pressable>
            </View>
        )
    }
    const renderSearchBar = () => {
        return (
            <View style={styles.textIn}>
                <TextInput
                    style={styles.searchinput}
                    keyboardType="default"
                    placeholder='بحث الخدمات'
                    onChangeText={(value) => setSearched(value)}
                />
                <AntDesign
                    name={"search1"}
                    color={colors.silver}
                    size={25} />
            </View>
        )
    }
    const ResultsComp = ({data, index = 0}) => {
        const translateX = slideInAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        });

        const imageIndex = data.serviceImages[0].logoArray?.findIndex((val) => val === true)
        const image = data.serviceImages[0]?.serviceImages[imageIndex]
    
        useEffect(() => {
          Animated.timing(slideInAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, []);
    
        return (
          <Animated.View key={index} style={{ ...styles.item, opacity: slideInAnimation, transform: [{ translateX }] }}>
            <Pressable onPress={() => goToserviceDescr(data)}
            >
              <Text style={styles.basicInfo}>{data.serviceData?.title}</Text>
              <Text style={styles.basicInfoTitle}>{data.serviceData?.address}</Text>
            </Pressable>
            <Image source={{uri : image}} style={styles.ImageView} />
          </Animated.View>
        )
      }
    const renderResults = () => {
        if (searched.trim().length > 0) {
            const filteredServices = ServiceDataInfo.filter(item => item.serviceData.title.toLowerCase().includes(searched.toLowerCase()));
           
            const filteredServicesCount = filteredServices.length;
      
            if (filteredServicesCount === 0) {
              return (
                <View style={{ alignSelf: "center" }}>
                  <Text style={styles.relationLabelText}>لا يوجد نتائج </Text>
                </View>
              );
            }
      
            return (
              <View>
                {filteredServicesCount > 0 && (
                  <View>
                    <View style={styles.relationLabelView}>
                      <Text style={styles.relationLabelText}>نتائح البحث</Text>
                    </View>
                    {results(filteredServices, true)}
                  </View>
                )}
              </View >
            );
          }
        //    else {
        //     return relations && relations.length > 0 ? friends(relations, false) : noFriends();
        //   }
    }

    const results = (serData, isSearch = false) => {
        if (serData && Array.isArray(serData)) {
          if (serData.length > 0) {
            const relationJSX = serData.map((data, index) => {
              return <ResultsComp data={data} index={index} />;
            });
            return relationJSX;
          }
        }
      };

    return (
        <View style={styles.container} >
            {header()}
            {renderSearchBar()}
            {/* <View style={styles.recentsView}><Text style={styles.recentText}>عمليات البحث الأخيرة</Text></View> */}
            {renderResults()}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingRight: 20,
        paddingLeft: 20
    },
    searchinput: {
        textAlign: 'right',
        width: '80%',
        fontSize: 17,
    },

    textIn: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.silver,
        height: 50,
        width: '100%',
        borderRadius: 8,
        marginTop: 30,
        alignItems: 'center',
        paddingRight: 10
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 7,
        alignSelf: 'center'
    },

    title: {
        flexDirection: 'row',
        marginTop: 20,
    },
    icon: {
        alignSelf: 'flex-start',
    },
    recentsView: {
        marginTop: 30
    },
    recentText: {
        fontSize: 18,
    },
    ImageView: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 15
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20,
      },
      basicInfo: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
      },
      basicInfoTitle: {
        fontSize: 12,
        textAlign: 'right'
      },
      relationLabelView: {
        height: 40,
        justifyContent: 'center',
        marginVertical: 20,
        // backgroundColor: colors.gold,
        // paddingRight: 10,
        // width: '98%',
        // alignSelf: 'center'
      },
      relationLabelText: {
        fontSize: 18,
        color: colors.puprble,
        fontWeight: 'bold'
      }
})

export default SearchServcies;

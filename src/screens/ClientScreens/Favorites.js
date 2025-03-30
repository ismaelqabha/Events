import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchContext from '../../../store/SearchContext';
import HomeCards from '../../components/HomeCards';
import moment from 'moment';

const Favorites = (props) => {
    const context = useContext(SearchContext);
    const { allServicesFavorites, favorites } = context;
    const { fileName, fileId } = props?.route.params;

    const [date, setDate] = useState(new Date());
    const [currentDate, setcurrentDate] = useState(date.getDate() + 1)
    const [currentMonth, setcurrentMonth] = useState(date.getMonth() + 1)
    const [currentYear, setcurrentYear] = useState(date.getFullYear())


    const onPressHandler = () => {
        props.navigation.goBack();
    }

    useEffect(() => {

    }, [])

    const countAllRequestDates = (allRequests, dataforReservation) => {
        var countAllDates = 0
        allRequests.forEach(item => {
            item.reservationDetail.forEach(element => {
                if (element.reservationDate == dataforReservation) {
                    countAllDates += 1
                }
            });
        })
        return countAllDates
    }
    const checkDate = (dataforReservation, source, allRequests, maxNumOfReq) => {
        //console.log("allRequests", allRequests);
        const countAllDates = countAllRequestDates(allRequests, dataforReservation)
        const servicedate = source
        console.log(countAllDates, maxNumOfReq);
        if (countAllDates < maxNumOfReq) {

            const DateFiltered = servicedate[0].dates?.find(dat => {
                if (servicedate[0].dates.length > 1) {
                    return dat.time === dataforReservation && (dat.status === 'full' || dat.status === 'holiday')
                } else {
                    return dataforReservation
                }
            });

            return !!DateFiltered

        } else {
            return true
        }
    }
    const findFirstDateAvailable = (serviceDates, allRequests, maxNumOfReq) => {

        var daysInMonth = moment(currentYear + '-' + currentMonth).daysInMonth()
        let completeDate = ''

        if (currentDate > daysInMonth) {
            if ((currentMonth + 1) > 12) {
                daysInMonth = moment((currentYear + 1) + '-' + (currentMonth - 11)).daysInMonth()
                for (var day = 1; day <= daysInMonth; day++) {
                    completeDate = currentYear + '-' + (currentMonth + 1) + '-' + day
                    if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
                        break
                    }
                }
            } else {

                daysInMonth = moment(currentYear + '-' + (currentMonth + 1)).daysInMonth()
                for (var day = 1; day <= daysInMonth; day++) {
                    completeDate = currentYear + '-' + (currentMonth + 1) + '-' + day
                    if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
                        break
                    }
                }
            }
        } else {
            for (var day = currentDate; day <= daysInMonth; day++) {
                completeDate = currentYear + '-' + currentMonth + '-' + day
                if (!checkDate(completeDate, serviceDates, allRequests, maxNumOfReq)) {
                    break
                }
            }
        }

        return completeDate
    };

    const filterservices = () => {
        return allServicesFavorites.filter(item => {
            return item.serInfo !== null && item.serImages.length > 0
        })
    }

    const filterFavoFiles = () => {
        return favorites.filter(item => {
            return item.fileId === fileId
        })
    }


    const getServiceDetail = () => {
        const serviceData = filterservices()
        const fileData = filterFavoFiles()

        return serviceData.filter(item => {
            return fileData[0].favoListServiceId.find(element => {
                return element === item.serInfo.service_id
            });

        })
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerImg}>
                <View style={styles.viewIcon}>
                    <Pressable onPress={onPressHandler}>
                        <Ionicons
                            style={styles.icon}
                            name={"arrow-back"}
                            color={"black"}
                            size={25} />
                    </Pressable>
                </View>
                <View style={styles.viewtitle}>
                    <Text style={styles.title}>{fileName}</Text>
                </View>
            </View>
        )
    }

    const renderCard = () => {
        const data = getServiceDetail()
        const cardsArray = data?.map(card => {
            const firstDate = findFirstDateAvailable(card.serviceDates, card.serviceRequests, card.serInfo.maxNumberOFRequest)
            return <HomeCards  {...card.serInfo}
                images={card?.serImages}
                dates={card?.serviceDates}
                relatedCamp={card?.serviceCamp}
                serviceRequests={card?.serviceRequests}
                availableDates={firstDate}
            />;
        });
        return cardsArray;
    };
    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                    {renderCard()}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        marginTop: 20,
    },
    viewtitle: {
        justifyContent: 'center',
        height: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginRight: 30,
    },
    headerImg: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 10,
    },
    contentContainerStyle: {
        paddingBottom: 100,
    }
})

export default Favorites;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../../assets/AppColors';
import { images } from '../../assets/photos/images';
import { filterSubDetails } from '../../resources/Functions';


/**
 * Renders the receipt component.
 * 
 * @param totalPrice - The total price of the receipt.
 * @param requestedDate - The requested date of the reservation.
 * @param resDetail - Details of the reservation.
 * @param showDetailRecipt - Boolean state indicating whether to show the receipt details.
 * @param setShowDetailRecipt - state function to change the value of showDetailRecipt.
 * @param data - Additional data used in rendering the receipt.
 * @returns The rendered receipt component.
 */
const Recipt = ({
    totalPrice,          // The total price of the receipt
    requestedDate,       // The requested date of the reservation
    resDetail,           // Details of the reservation
    showDetailRecipt,    // Boolean indicating whether to show the receipt details
    setShowDetailRecipt, // State functions to change the value of showDetialRecipt  
    data                 // Additional data used in rendering the receipt
}) => {

    //console.log("totalPrice", totalPrice);

    //console.log("resDetail multi", resDetail);
    const renderSubDetRecipt = (subArray) => {
        return (
            <View style={styles.reciptLabel}>
                {subDetReciptHeader()}
                {subArray.map((detail, index) => {
                    return (
                        renderSubDetailSingleService(detail.detailSubtitleCost, detail.detailSubtitle, index)
                    )
                })}
            </View>
        )
    }

    const subDetReciptHeader = () => {
        return (
            <View style={styles.reciptSupDet}>
                <View style={styles.centeredText}><Text>السعر</Text></View>
                <View style={styles.centeredText}><Text>التفاصيل</Text></View>
            </View>
        )
    }

    const renderSubDetailSingleService = (price = 0, title = 'random', index) => {
        return (
            <View key={index} style={styles.reciptSupDet}>
                {subDetailReciptPrice(price)}
                {subDetailTitle(title)}
            </View>
        )
    }

    const subDetailReciptPrice = (price) => {
        return (
            <View style={styles.centeredText}>
                <Text style={styles.text}>{price}</Text>
            </View>
        )
    }

    const subDetailTitle = (title) => {
        return (
            <View style={styles.centeredText}>
                <Text style={styles.text}>{title}</Text>
            </View>
        )
    }

    const renderReciptServices = () => {
        return (
            <View style={styles.reciptLabel}>
                <Text style={styles.text}>الخدمات</Text>
            </View>
        )
    }

    const renderMainReciptDetails = (details) => {
        return (
            details.filteredSubDetials ?
                details.filteredSubDetials.map((subDetail, index) => {
                    return subDetail?.subDetailArray?.length > 0 ? renderSingleReciptService(subDetail, index, details) : null
                })
                :
                null
        )
    }

    const renderSingleReciptService = (subDetail, index, details) => {
        const additionType = subDetail.additionType ? subDetail.additionType : subDetail?.isPerPerson ? 'perPerson' : 'perRequest';
        let price = 0;
        subDetail.subDetailArray.forEach((detail) => price += parseInt(detail.detailSubtitleCost));
        return (
            <React.Fragment key={index}>
                <View style={styles.reciptDetailItem}>
                    {renderFinalReciptPrice(price * (additionType === "perPerson" ? details.numOfInviters || 0 : additionType === "perRequest" ? 1 : Math.ceil(details.numOfInviters / subDetail.numberPerTable)))}
                    {renderReciptComponent(additionType, price, details.numOfInviters || 0, subDetail.numberPerTable)}
                    <Pressable onPress={() => details.setShowSupDetRecipt(!details.showSupDetRecipt)} style={styles.reciptClom}>
                        <Text style={styles.text}>{subDetail?.detailTitle || ''}</Text>
                    </Pressable>
                </View>
                {details.showSupDetRecipt && renderSubDetRecipt(subDetail.subDetailArray)}
            </React.Fragment>
        );
    };

    const renderReciptDate = (date) => {
        return (
            <View style={styles.reciptDateLabel}>
                <Text style={styles.text}>{moment(date).format('L')}</Text>
            </View>
        )
    }

    const renderPerPerson = (price = 0, invited = 0) => {
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للشخص الواحد</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${invited || 0}`}</Text>
            </View>
        )
    }

    const renderPerTable = (price = 0, invited = 0, perTable = 1) => {
        if (perTable == 0) {
            perTable = 1;
        }
        const tables = Math.ceil((invited / perTable))
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للطاولة الواحدة</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${(tables)}`}</Text>
            </View>
        )
    }

    const renderRequest = (price = 0) => {
        return (
            <View style={styles.reciptMidClom}>
                <Text>السعر للحجز</Text>
                <Text style={styles.text}>{`₪ ${price}  X  ${1}`}</Text>
            </View>
        )
    }

    const renderReciptComponent = (additionType, price, invited, perTable) => {
        switch (additionType) {
            case 'perPerson':
                return renderPerPerson(price, invited);
            case 'perTable':
                return renderPerTable(price, invited, perTable);
            case 'perRequest':
                return renderRequest(price);
            default:
                return null;
        }
    };

    const renderDeals = (campaigns, numOfInviters) => {
        return (
            <View style={styles.reciptDetail}>
                {renderDealsHeader()}
                {campaigns.map((camp, index) => renderSingleDealRecipt({ ...camp, numOfInviters }, index))}
            </View>
        )
    }

    const renderSingleDealRecipt = (camp, index) => {
        return (
            <View key={index} style={styles.reciptDetailItem}>
                {renderFinalReciptPrice(camp?.campCost * (camp?.priceInclude === "perPerson" ? camp?.numOfInviters || 0 : camp?.priceInclude === "perRequest" ? 1 : Math.ceil(camp?.numOfInviters / camp?.numberPerTable)))}
                {renderReciptComponent(camp?.priceInclude, camp?.campCost, camp?.numOfInviters)}
                {renderDealTitle(camp?.campTitle)}
            </View>
        )
    }

    const renderDealTitle = (title) => {
        return (
            <Pressable style={styles.reciptClom}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        )
    }

    const renderDealsHeader = () => {
        return (
            <View style={styles.reciptLabel}>
                <Text style={styles.text}>العروض</Text>
            </View>
        )
    }

    const renderFinalReciptPrice = (price) => {
        return (
            <View style={styles.reciptClom}>
                <Text>السعر النهائي</Text>
                <Text style={styles.text}>{price || 0}</Text>
            </View>
        )
    }

    const renderFullReciptDate = (date, index = 0) => {
        const [showSupDetRecipt, setShowSupDetRecipt] = useState(false);

        if (!showDetailRecipt) {
            return null;
        }

        let detailIndex = resDetail.findIndex(item => item.reservationDate === date);

        if (Array.isArray(requestedDate)) {
            if (detailIndex === -1) {
                return null;
            }
        } else {
            detailIndex = 0;
        }

        const { subDetailId, numOfInviters } = resDetail[detailIndex];
        const filteredSubDetials = filterSubDetails(data, subDetailId);
        const showList = filteredSubDetials?.some(item => item.subDetailArray && item.subDetailArray.length > 0);
        const campaigns = resDetail[detailIndex].campaigns || [];
        const showCamp = campaigns && campaigns.length > 0 ? true : false;

        const details = {
            setShowSupDetRecipt: setShowSupDetRecipt,
            showSupDetRecipt: showSupDetRecipt,
            filteredSubDetials: showList ? filteredSubDetials : false,
            numOfInviters: numOfInviters,
        };

        return (
            <View key={index}>
                {!(showList === false && showCamp === false) && renderReciptDate(date)}
                <View style={styles.reciptDetail}>
                    {showList && renderReciptServices()}
                    {renderMainReciptDetails(details)}
                </View>
                {showCamp && renderDeals(campaigns, numOfInviters)}
            </View>
        );
    }

    const showDetaiPress = () => {
        setShowDetailRecipt(!showDetailRecipt);
    }

    const renderFinalPrice = () => {
        return (
            <View style={styles.reciptDetail}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Pressable onPress={showDetaiPress}>
                        <Image style={styles.iconImg} source={images.invoice} />
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={styles.text}>السعر النهائي   {totalPrice} ₪</Text>
                        <View style={styles.IconView}>
                            <Entypo
                                style={{ alignSelf: 'center' }}
                                name={"price-tag"}
                                color={colors.puprble}
                                size={30} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    const createRecipt = () => {
        return (
            <View style={styles.reciptView}>
                {renderFinalPrice()}
                {Array.isArray(requestedDate) ? requestedDate.map((date, index) => renderFullReciptDate(date, index)) : renderFullReciptDate(requestedDate)}
            </View>
        );
    }

    const renderPrice = () => {
        return (
            <View style={styles.priceView}>
                {createRecipt()}
            </View>
        );
    }

    return renderPrice();
}

const styles = StyleSheet.create({
    reciptView: {
        width: '100%',
        marginVertical: 10,
        alignSelf: 'center',
        // borderWidth: 1
    },
    priceView: {
        width: '90%',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        marginBottom: 5,
        borderRadius: 15,
    },
    reciptDetail: {
        width: '100%',
        alignSelf: 'flex-end',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    reciptDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    reciptLabel: {
        width: '90%',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        borderRadius: 10
    },
    reciptSupDet: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },

    reciptMidClom: {
        alignItems: 'center',
        width: '40%'
    },
    reciptClom: {
        alignItems: 'center',
        width: '30%'
    },
    reciptDateLabel: {
        width: '90%',
        backgroundColor: colors.silver,
        alignSelf: 'center',
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30
    },
    text: {
        fontSize: 15,
        marginRight: 10,
        color: colors.puprble
    },
    IconView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BGScereen,
        borderRadius: 30,
        marginLeft: 10
    },
    centeredText: {
        alignItems: 'center',
        width: '50%'
    }
});

export default Recipt;

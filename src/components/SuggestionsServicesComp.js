import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo";
import React from 'react'
import { colors } from '../assets/AppColors';

const SuggestionsServicesComp = () => {

    const renderCard = (image, serTitle) => {
        return (
            <View style={{ margin: 10, }}>
                <Image
                    style={styles.img}
                    source={image} />
                <View style={styles.InfoView}>
                    <Text style={styles.txt}>{serTitle}</Text>

                    <Text style={styles.txtRank}>★5</Text>
                </View>
            </View>
        );
    }
    const renderSeeAll = () => {
        return (
            <View style={styles.seeAllView}>
                <Entypo
                    name={"triangle-left"}
                    size={20}
                />
                <Text style={styles.CatText}>مشاهدة الكل</Text>
            </View>
        )
    }
    const renderHalls = () => {
        const img = require('../assets/photos/ameer.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'قاعات'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, ' قاعات الامير')}
                    {renderCard(img, ' قاعات الامير')}
                    {renderCard(img, ' قاعات الامير')}

                </ScrollView>
            </View>
        )

    }
    const renderphotographer = () => {
        const img = require('../assets/photos/abofaneh.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'تصوير'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'استديو ابو فنة')}
                    {renderCard(img, 'استديو ابو فنة')}
                    {renderCard(img, 'استديو ابو فنة')}

                </ScrollView>
            </View>
        )
    }
    const renderChif = () => {
        const img = require('../assets/photos/chef.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'طباخ'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'مطبخ الخيرات')}
                    {renderCard(img, 'مطبخ الخيرات')}
                    {renderCard(img, 'مطبخ الخيرات')}

                </ScrollView>
            </View>
        )
    }
    const renderSinger = () => {
        const img = require('../assets/photos/raaed.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'مطربين'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'رائد كبها')}
                    {renderCard(img, 'رائد كبها')}
                    {renderCard(img, 'رائد كبها')}
                </ScrollView>
            </View>
        )
    }
    const renderDJs = () => {
        const img = require('../assets/photos/DJ.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'DJ'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'دي جي ايهاب')}
                    {renderCard(img, 'دي جي ايهاب')}
                    {renderCard(img, 'دي جي ايهاب')}
                   
                </ScrollView>
            </View>
        )
    }
    const renderPopulerTeam = () => {
        const img = require('../assets/photos/dabkeh.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'فرق شعبية'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'فرقة البلد الشعبية')}
                    {renderCard(img, 'فرقة البلد الشعبية')}
                    {renderCard(img, 'فرقة البلد الشعبية')}
                </ScrollView>
            </View>
        )
    }
    const renderflowerDesign = () => {
        const img = require('../assets/photos/kafa.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'تصميم ازهار'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'فل لتصميم الازهار')}
                    {renderCard(img, 'فل لتصميم الازهار')}
                    {renderCard(img, 'فل لتصميم الازهار')}
        
                </ScrollView>
            </View>
        )
    }
    const renderHairdresser = () => {
        const img = require('../assets/photos/styliest.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'تصفيف شعر'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'صالون ورود')}
                    {renderCard(img, 'صالون ورود')}
                    {renderCard(img, 'صالون ورود')}
                   
        
                </ScrollView>
            </View>
        )
    }
    const renderMakeUp = () => {
        const img = require('../assets/photos/makeupp.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'Makeup'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'صالون الجميلة')}
                    {renderCard(img, 'صالون الجميلة')}
                    {renderCard(img, 'صالون الجميلة')}
                    
                </ScrollView>
            </View>
        )
    }
    const renderBieutyCenter = () => {
        const img = require('../assets/photos/bieuty.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'مركز تجميل'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'المركز التجميلي الاول')}
                    {renderCard(img, 'المركز التجميلي الاول')}
                    {renderCard(img, 'المركز التجميلي الاول')}
                </ScrollView>
            </View>
        )
    }

    const renderJokers = () => {
        const img = require('../assets/photos/Jooker.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'مهرج'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'العم شوشو')}
                    {renderCard(img, 'العم شوشو')}
                    {renderCard(img, 'العم شوشو')}
                    
                </ScrollView>
            </View>
        )
    }
    const renderEquipmentRental = () => {
        const img = require('../assets/photos/toolsRent.png')
        return (
            <View>
                <View style={styles.itemView}>
                    {renderSeeAll()}
                    <Text style={styles.titleText}>{'تأجير معدات'}</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    {renderCard(img, 'الفرح لتاجير المعدات')}
                    {renderCard(img, 'الفرح لتاجير المعدات')}
                    {renderCard(img, 'الفرح لتاجير المعدات')}
                   
                </ScrollView>
            </View>
        )
    }



    return (
        <View>
            {renderHalls()}
            {renderphotographer()}
            {renderChif()}
            {renderSinger()}
            {renderDJs()}
            {renderPopulerTeam()}
            {renderflowerDesign()}
            {renderHairdresser()}
            {renderMakeUp()}
            {renderBieutyCenter()}
            {renderJokers()}
            {renderEquipmentRental()}
        </View>
    )
}

export default SuggestionsServicesComp

const styles = StyleSheet.create({
    InfoView: {
        width: 120,
        height: 50,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        elevation: 5
    },
    img: {
        width: 120,
        height: 100,
    },
    itemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeAllView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        textAlign: 'right',
        fontSize: 17,
        color: colors.TitleFont,
        fontFamily: 'Cairo-VariableFont_slnt,wght',
        marginRight: 20
    },
})
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../../../store/SearchContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import { ScreenNames } from '../../../route/ScreenNames';
import strings from '../../assets/res/strings';
import { colors } from '../../assets/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getServiceImages } from '../../resources/API';
import { BackgroundImage } from '@rneui/base';
import EditServiceInfo from '../../components/ProviderComponents/EditServiceInfo';

const ProviderHome = props => {
  const { isFirst, setserviceTitle } = useContext(SearchContext);
  const { serviceInfoAccorUser } = useContext(ServiceProviderContext);
  const [servicePhotos, setservicePhotos] = useState();
  const [showModal, setShowModal] = useState(false);
  const language = strings.arabic.ProviderScreens.ProviderCreateListing;


  const [editTitle, seteditTitle] = useState(false);
  const [editSubTitle, seteditSubTitle] = useState(false);
  const [editCity, seteditCity] = useState(false);
  const [locationEdit, setlocationEdit] = useState(false);
  const [editHallType, seteditHallType] = useState(false);
  const [editHallcapasity, seteditHallcapasity] = useState(false);
  const [editphone, seteditphone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editSocialMedia, setEditSocialMedia] = useState(false);
  const [socialItem, setSocialItem] = useState();
  const [editprice, setEditprice] = useState(false);
  const [editDescrItem, setEditDescrItem] = useState(false);
  const [descriptionItem, setDescriptionItem] = useState();
  const [editNumofRequest, setEditNumofRequest] = useState(false);
  const [addSocilMedia, setAddSocilMedia] = useState(false);
  const [addNewDesc, setAddNewDesc] = useState(false);
  const [addNewDetail, setAddNewDetail] = useState(false);
  const [editServiceDetail, setEditServiceDetail] = useState(false);
  const [detailItem, setDetailItem] = useState();
  const [DetailType, setDetailType] = useState();
  const [detailIsperson, setDetailIsperson] = useState();
  const [sub_DetailArr, setSub_DetailArr] = useState();

  const getImagesfromApi = () => {
    getServiceImages({ serviceID: isFirst }).then(res => {
      setservicePhotos(res);
    });
  };

  useEffect(() => {
    getImagesfromApi();
  }, []);


  const titleEditPress = () => {
    seteditTitle(true)
    setShowModal(true)
    seteditSubTitle(false)
    seteditCity(false)
    setlocationEdit(false)
    seteditHallType(false)
    seteditHallcapasity(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const subTitleEditPress = () => {
    seteditSubTitle(true)
    setShowModal(true)
    seteditCity(false)
    seteditTitle(false)
    setlocationEdit(false)
    seteditHallType(false)
    seteditHallcapasity(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const cityEditPress = () => {
    setShowModal(true)
    seteditCity(true)
    seteditSubTitle(false)
    seteditTitle(false)
    setlocationEdit(false)
    seteditHallType(false)
    seteditHallcapasity(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const locationEditPress = () => {
    setShowModal(true)
    setlocationEdit(true)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    seteditHallType(false)
    seteditHallcapasity(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const HallTypeEditPress = () => {
    setShowModal(true)
    seteditHallType(true)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    seteditHallcapasity(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const hallCapasityEditPress = () => {
    setShowModal(true)
    seteditHallcapasity(true)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    seteditphone(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const phoneEditPress = () => {
    setShowModal(true)
    seteditphone(true)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditEmail(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const emailEditPress = () => {
    setShowModal(true)
    setEditEmail(true)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditSocialMedia(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const socialMediaitemEditPress = (item) => {
    setSocialItem(item)
    setShowModal(true)
    setEditSocialMedia(true)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditprice(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const priceEditPress = () => {
    setShowModal(true)
    setEditprice(true)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditDescrItem(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const editDescrPress = (item) => {
    setDescriptionItem(item)
    setShowModal(true)
    setEditDescrItem(true)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditNumofRequest(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const numofRequestEditPress = () => {
    setShowModal(true)
    setEditNumofRequest(true)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setAddSocilMedia(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const addNewSocialMediaPress = () => {
    setShowModal(true)
    setAddSocilMedia(true)
    setEditNumofRequest(false)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setAddNewDesc(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const addNewDescr = () => {
    setShowModal(true)
    setAddNewDesc(true)
    setAddSocilMedia(false)
    setEditNumofRequest(false)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setAddNewDetail(false)
    setEditServiceDetail(false)
  }
  const addnewServiceDetail = () => {
    setShowModal(true)
    setAddNewDetail(true)
    setAddNewDesc(false)
    setAddSocilMedia(false)
    setEditNumofRequest(false)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
    setEditServiceDetail(false)
  }
  const serviceDetailEditPress = (title, type, isPerson, subDetail) => {
    setShowModal(true)
    setDetailItem(title)
    setDetailType(type)
    setDetailIsperson(isPerson)
    setSub_DetailArr(subDetail)
    setEditServiceDetail(true)
    setAddNewDetail(false)
    setAddNewDesc(false)
    setAddSocilMedia(false)
    setEditNumofRequest(false)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
  }
  const closeModalPress = () => {
    setShowModal(false)
    setEditServiceDetail(true)
    setAddNewDetail(false)
    setAddNewDesc(false)
    setAddSocilMedia(false)
    setEditNumofRequest(false)
    setEditDescrItem(false)
    setEditprice(false)
    setEditSocialMedia(false)
    setEditEmail(false)
    seteditphone(false)
    seteditHallcapasity(false)
    seteditHallType(false)
    setlocationEdit(false)
    seteditCity(false)
    seteditSubTitle(false)
    seteditTitle(false)
  }
  const renderEditServiceInfo = () => {
    if (editTitle) {
      return (
        <EditServiceInfo editTitle={editTitle} serviceID={isFirst} />
      )
    }
    if (editSubTitle) {
      return (
        <EditServiceInfo editSubTitle={editSubTitle} serviceID={isFirst} />
      )
    }
    if (editHallcapasity) {
      return (
        <Text>Capasity</Text>
        //<EditServiceInfo editHallcapasity={editHallcapasity} serviceID={isFirst} />
      )
    }
    if (editCity) {
      return (
        <EditServiceInfo editCity={editCity} serviceID={isFirst} />
      )
    }
    if (locationEdit) {
      return
    }
    if (editHallType) {
      return (
        <EditServiceInfo editHallType={editHallType} serviceID={isFirst} />
      )
    }

    if (editphone) {
      return (
        <EditServiceInfo editphone={editphone} serviceID={isFirst} />
      )
    }
    if (editEmail) {
      return (
        <EditServiceInfo editEmail={editEmail} serviceID={isFirst} />
      )
    }
    if (editSocialMedia) {
      return (
        <EditServiceInfo editSocialMedia={editSocialMedia} socialItem={socialItem} serviceID={isFirst} />
      )
    }
    if (editprice) {
      return (
        <EditServiceInfo editprice={editprice} serviceID={isFirst} />
      )
    }
    if (editDescrItem) {
      return (
        <EditServiceInfo editDescrItem={editDescrItem} descriptionItem={descriptionItem} serviceID={isFirst} />
      )
    }
    if (editNumofRequest) {
      return (
        <EditServiceInfo editNumofRequest={editNumofRequest} serviceID={isFirst} />
      )
    }
    if (addSocilMedia) {
      return (
        <Text style={styles.basicInfoTitle}>add social</Text>
      )
    }
    if (addNewDesc) {
      return (
        <Text style={styles.basicInfoTitle}>add desc</Text>
      )
    }
    if (addNewDetail) {
      return (
        <Text style={styles.basicInfoTitle}>add detail</Text>
      )
    }
    if (editServiceDetail) {
      return (
        <EditServiceInfo editServiceDetail={editServiceDetail} 
        detailItem={detailItem}
        DetailType={DetailType} 
        detailIsperson={detailIsperson}
        sub_DetailArr={sub_DetailArr}
        serviceID={isFirst} />
      )
    }
  }

  const filterService = () => {
    return serviceInfoAccorUser?.filter(item => {
      return item.service_id === isFirst;
    });
  };
  const header = () => {
    return (
      <View style={styles.header}>
        <Pressable onPress={onPressHandler}>
          <AntDesign
            style={styles.icon}
            name={'left'}
            color={'black'}
            size={20}
          />
        </Pressable>
        <Text style={styles.headerTxt}>خدماتي</Text>
      </View>
    )
  }
  const renderServiceLogo = () => {
    // const data = getLogoImg()
    // const serviceLogo = data?.map(item => {
    return (
      <View>
        <BackgroundImage
          style={styles.logoview}
          source={require('../../assets/photos/backgroundPart.png')}>
          <View style={styles.logoImg}></View>
          <Pressable style={styles.editImg}>
            <Entypo name={'camera'} color={colors.puprble} size={25} />
          </Pressable>
        </BackgroundImage>
      </View>
    );
    // })
    // return serviceLogo
  };
  const renderServiceType = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      setserviceTitle(item.title);
      return (
        <View style={styles.servicetype}>
          <Text style={styles.basicInfo}>{item.servType}</Text>
        </View>
      );
    });
    return serviceType;
  };

  const renderServiceTitle = () => {
    const data = filterService();
    const serviceTitle = data?.map(item => {
      return (
        <View>
          {item.title && (
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={titleEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'more-vertical'}
                    color={colors.puprble}
                    size={25} />
                </Pressable>
                <View>
                  <Text style={styles.basicInfo}>{item.title}</Text>
                  <Text style={styles.basicInfoTitle}>العنوان الرئيسي</Text>
                </View>
              </View>
              <View style={styles.IconView}>
                <MaterialIcons name={'title'} color={colors.puprble} size={25} />
              </View>
            </View>
          )}

          {item.subTitle && (
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={subTitleEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'more-vertical'}
                    color={colors.puprble}
                    size={25} />
                </Pressable>
                <View>
                  <Text style={styles.basicInfo}>{item.subTitle}</Text>
                  <Text style={styles.basicInfoTitle}>العنوان الترويجي</Text>
                </View>
              </View>
              <View style={styles.IconView}>
                <MaterialIcons name={'subtitles'} color={colors.puprble} size={25} />
              </View>
            </View>
          )}
        </View>
      );
    });
    return serviceTitle;
  };
  const renderAddDescription = () => {
    return (
      <View>
        <Pressable style={styles.item} onPress={addNewDescr}>
          <Text style={styles.basicInfo}>اضافة جديد</Text>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={'plus'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
        {renderDescription()}
      </View>
    )
  }
  const renderDescription = () => {
    const data = filterService();
    const servicedesc = data?.map(item => {
      if (!item.desc) {
        return null;
      } else if (!Array.isArray(item.desc)) {
        return null;
      } else if (item.desc.length === 0) {
        return null;
      } else {
        item.desc = item.desc.filter(descc => {
          if (descc.empty) {
            return false;
          }
          return true;
        });
        if (item.desc.length === 0) {
          return null;
        }
      }
      return item.desc.map(element => {
        return (
          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable onPress={() => editDescrPress(element.descItem)}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{element.descItem}</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
            </View>
          </View>)
      })
    })
    return servicedesc
  };
  const renderServiceAddress = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      return (
        <View>
          {item.region && (
            <View style={styles.itemService}>
              <View>
                <Text style={styles.basicInfoTitle}>المنطقة</Text>
                <Text style={styles.basicInfo}>{item.region}</Text>
              </View>
              <View style={styles.IconView}>
                <Entypo name={'address'} color={colors.puprble} size={25} />
              </View>
            </View>
          )}
          {item.address && (
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={cityEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'more-vertical'}
                    color={colors.puprble}
                    size={25} />
                </Pressable>
                <View>
                  <Text style={styles.basicInfoTitle}>المدينة</Text>
                  <Text style={styles.basicInfo}>{item.address}</Text>
                </View>
              </View>
              <View style={styles.IconView}>
                <FontAwesome5 name={'city'} color={colors.puprble} size={20} />
              </View>
            </View>
          )}
          {item.serviceLocation && (
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={locationEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'more-vertical'}
                    color={colors.puprble}
                    size={25} />
                </Pressable>
                <View>
                  <Text style={styles.basicInfoTitle}>الموقع</Text>
                  <Text style={styles.basicInfo}>{item.serviceLocation}</Text>
                </View>
              </View>
              <View style={styles.IconView}>
                <Entypo name={'location-pin'} color={colors.puprble} size={25} />
              </View>
            </View>
          )}
        </View>
      );
    });
    return serviceType;
  };
  const renderServicePhotos = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      return (
        <View>
          <View style={styles.itemService}>
            <View>
              <Text style={styles.basicInfo}>مشاهدة الصور (7)</Text>
            </View>
            <View style={styles.IconView}>
              <Entypo name={'images'} color={colors.puprble} size={25} />
            </View>
          </View>

          <View style={styles.itemService}>
            <View>
              <Text style={styles.basicInfo}>اضافة صورة</Text>
            </View>
            <View style={styles.IconView}>
              <MaterialIcons name={'add-photo-alternate'} color={colors.puprble} size={25} />
            </View>
          </View>
        </View>
      );
    });
    return serviceType;
  };
  const istherePrice = () => {
    const data = filterService();
    if (data[0].servicePrice !== null) {
      return (
        <View>
          <Text style={styles.sectionTitletxt}>السعر</Text>
          <View style={styles.content}>{renderServicePrice()}</View>
        </View>)
    }
  }
  const renderServicePrice = () => {
    const data = filterService();
    const servicePrice = data?.map(item => {
      return (
        <View>
          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable onPress={priceEditPress}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{item.servicePrice}</Text>
                <Text style={styles.basicInfoTitle}>السعر</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <Entypo name={'price-tag'} color={colors.puprble} size={25} />
            </View>
          </View>
        </View>
      );
    });
    return servicePrice;
  };
  const isHall = () => {
    const data = filterService();
    if (data[0].servType == 'قاعات') {
      return (
        <View>
          <Text style={styles.sectionTitletxt}>معلومات القاعة</Text>
          <View style={styles.content}>{renderHallInfo()}</View>
        </View>)
    }
  }
  const renderHallInfo = () => {
    const data = filterService();
    const servicePrice = data?.map(item => {
      return (
        <View>
          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable onPress={HallTypeEditPress}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{item.hallType}</Text>
                <Text style={styles.basicInfoTitle}>نوع القاعة</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <Entypo name={'info'} color={colors.puprble} size={25} />
            </View>
          </View>

          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable onPress={hallCapasityEditPress}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{item.maxCapasity}</Text>
                <Text style={styles.basicInfoTitle}>القدرة الاستيعابية</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <Entypo name={'info'} color={colors.puprble} size={25} />
            </View>
          </View>
        </View>
      );
    });
    return servicePrice;
  };
  const renderServiceNumofRequest = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      return (
        <View style={styles.itemService}>
          <View style={styles.itemSM}>
            <Pressable onPress={numofRequestEditPress}>
              <Feather
                style={styles.menuIcon}
                name={'more-vertical'}
                color={colors.puprble}
                size={25} />
            </Pressable>
            <Text style={styles.basicInfo}>{item.numRecivedRequest}</Text>
          </View>
          <View style={styles.IconView}>
            <Entypo name={'info'} color={colors.puprble} size={25} />
          </View>
        </View>

      );
    });
    return serviceType;
  };

  const selectMandatoryDetail = () => {
    const data = filterService();
    return data[0].additionalServices.filter(item => {
      return item.necessity == 'Mandatory'
    })
  }
  const renderMandatoryDetail = () => {
    const data = selectMandatoryDetail()
    const serviceDetailInfo = data.map((itemDetail) => {
      return (
        <View >
          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable 
              onPress={() => serviceDetailEditPress(itemDetail.detailTitle, itemDetail.necessity, itemDetail.isPerPerson,itemDetail.subDetailArray )}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <Text style={styles.detailtxt}>{itemDetail.detailTitle}</Text>
            </View>
            <View style={styles.IconView}>
              <Entypo name={'info'} color={colors.puprble} size={25} />
            </View>
          </View>
          {itemDetail.subDetailArray.map(subDItem => {
            return (
              <View style={styles.detailView}>
                <Text style={styles.basicInfo}>
                  {subDItem.detailSubtitle}
                </Text>
                <Feather
                  style={{ alignSelf: 'center', marginLeft: 10 }}
                  name={'corner-down-left'}
                  color={colors.puprble}
                  size={25}
                />
              </View>
            );
          })}
        </View>
      );
    })
    return serviceDetailInfo
  }
  const selectOptionalDetail = () => {
    const data = filterService();
    return data[0].additionalServices.filter(item => {
      return item.necessity == 'Optional'
    })
  }
  const renderOptionalDetail = () => {
    const data = selectOptionalDetail()
    const serviceDetailInfo = data.map((itemDetail) => {
      return (
        <View >
          <View style={styles.itemService}>
            <View style={styles.itemSM}>
              <Pressable 
              onPress={() => serviceDetailEditPress(itemDetail.detailTitle, itemDetail.necessity, itemDetail.isPerPerson,itemDetail.subDetailArray)}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <Text style={styles.basicInfo}>{itemDetail.detailTitle}</Text>
            </View>
            <View style={styles.IconView}>
            <Entypo name={'info'} color={colors.puprble} size={25} />
            </View>
          </View>
          {itemDetail.subDetailArray.map(subDItem => {
            return (
              <View style={styles.detailView}>
                <Text style={styles.basicInfo}>
                  {subDItem.detailSubtitle}
                </Text>
                <Feather
                  style={{ alignSelf: 'center' }}
                  name={'corner-down-left'}
                  color={colors.puprble}
                  size={25}
                />
              </View>
            );
          })}
        </View>
      );
    })
    return serviceDetailInfo
  }
  const renderOptional = () => {
    const optional = selectOptionalDetail()
    if (optional) {
      return (
        <View>
          <Text style={styles.sectionTitletxt}>الخدمات الاختيارية</Text>
          <View style={styles.content}>
            <Pressable style={styles.item} onPress={addNewDescr}>
              <Text style={styles.basicInfo}>اضافة جديد</Text>
              <View style={styles.IconView}>
                <Entypo
                  style={styles.icon}
                  name={'plus'}
                  color={colors.puprble}
                  size={25}
                />
              </View>
            </Pressable>
            {renderOptionalDetail()}</View>
        </View>
      )
    }
  };
  const renderMandotory = () => {
    const mandotory = selectMandatoryDetail()
    if (mandotory) {
      return (
        <View>
          <Text style={styles.sectionTitletxt}>الخدمات الاجبارية</Text>
          <View style={styles.content}>
            <Pressable style={styles.item} onPress={addnewServiceDetail}>
              <Text style={styles.basicInfo}>اضافة جديد</Text>
              <View style={styles.IconView}>
                <Entypo
                  style={styles.icon}
                  name={'plus'}
                  color={colors.puprble}
                  size={25}
                />
              </View>
            </Pressable>
            {renderMandatoryDetail()}
          </View>
        </View>
      )
    }
  };

  const addSocialMediaItem = () => {
    setSocialData(socialData);
  };
  const removeSocialItem = (index) => {
    const newArray = [...socialData];
    newArray.splice(index, 1);
    setSocialData(newArray);
  }
  const renderSoialMedia = () => {
    return (
      <View>
        <Pressable style={styles.item} onPress={addNewSocialMediaPress}>
          <Text style={styles.basicInfo}>اضافة</Text>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={'add-to-list'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
        {renderSocialItems()}
      </View>
    );
  };
  const renderSocialItems = () => {
    const data = filterService()
    return data.map(item => {
      return item.socialMedia.map(element => {
        return <View style={styles.item}>
          <View style={styles.itemSM}>
            <Pressable onPress={() => socialMediaitemEditPress(element.social)}>
              <Feather
                style={styles.menuIcon}
                name={'more-vertical'}
                color={colors.puprble}
                size={25} />
            </Pressable>
            <Pressable>
              <Text style={styles.basicInfo}>{element.social}</Text>
            </Pressable>
          </View>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={element.social}
              color={colors.puprble}
              size={25} />
          </View>
        </View>
      })
    })
  }
  const renderContactInfo = () => {
    const data = filterService()
    return data.map(item => {
      return (
        <View>
          <View style={styles.item}>
            <View style={styles.itemSM}>
              <Pressable onPress={phoneEditPress}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{item.servicePhone}</Text>
                <Text style={styles.basicInfoTitle}>الموبايل</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <Ionicons
                style={styles.icon}
                name={'call'}
                color={colors.puprble}
                size={25}
              />
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemSM}>
              <Pressable onPress={emailEditPress}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
              <View>
                <Text style={styles.basicInfo}>{item.serviceEmail}</Text>
                <Text style={styles.basicInfoTitle}>Email</Text>
              </View>
            </View>
            <View style={styles.IconView}>
              <Entypo
                style={styles.icon}
                name={'email'}
                color={colors.puprble}
                size={25}
              />
            </View>
          </View>
        </View >
      );
    })
  };

  const onPressHandler = () => {
    props.navigation.goBack();
  };

  const renderModal = () => {
    return (
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.detailModal}>
            <View>
              <Pressable onPress={closeModalPress} style={styles.modalHeader}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-horizontal'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
            </View>
            {renderEditServiceInfo()}
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      {header()}
      <ScrollView>
        {renderServiceLogo()}
        <Text style={styles.sectionTitletxt}>تصنيف المصلحة</Text>
        <View style={styles.content}>{renderServiceType()}</View>

        <Text style={styles.sectionTitletxt}>العناوين الرئيسية</Text>
        <View style={styles.content}>{renderServiceTitle()}</View>

        <Text style={styles.sectionTitletxt}>العنوان</Text>
        <View style={styles.content}>{renderServiceAddress()}</View>

        {isHall()}

        <Text style={styles.sectionTitletxt}>معلومات التواصل </Text>
        <View style={styles.content}>{renderContactInfo()}</View>

        <Text style={styles.sectionTitletxt}>الشبكات الاجتماعية</Text>
        <View style={styles.content}>{renderSoialMedia()}</View>

        <Text style={styles.sectionTitletxt}>الصور</Text>
        <View style={styles.content}>{renderServicePhotos()}</View>

        {istherePrice()}

        <Text style={styles.sectionTitletxt}>الوصف</Text>
        <View style={styles.content}>{renderAddDescription()}</View>

        <Text style={styles.sectionTitletxt}>الحد الاقصى لاستقبال طلبات حجز</Text>
        <View style={styles.content}>{renderServiceNumofRequest()}</View>

        {renderMandotory()}
        {renderOptional()}

        <View style={{ height: 100 }}></View>
      </ScrollView>
      {renderModal()}
    </View>
  );
};

export default ProviderHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BGScereen,
  },
  basicInfoTitle: {
    fontSize: 14,
    textAlign: 'right',
  },
  txt: {
    fontSize: 20,
    color: colors.puprble,
    fontWeight: 'bold',
  },
  detailtxt: {
    fontSize: 18,
    color: colors.puprble,
    fontWeight: 'bold',
  },
  sectionTitletxt: {
    fontSize: 20,
    color: colors.puprble,
    fontWeight: 'bold',
    marginRight: 20,
    marginTop: 10
  },
  content: {
    padding: 5,
    backgroundColor: 'lightgray',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 5,
    marginVertical: 5
  },
  iconview: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  servicetype: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  basicInfo: {
    fontSize: 18,
    color: colors.puprble,
    textAlign: 'right',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  headerTxt: {
    fontSize: 18,
    color: colors.puprble,
    fontFamily: 'Cairo-VariableFont_slnt,wght',
  },
  // servicetitle: {
  //   alignSelf: 'center',
  //   width: '90%',
  //   marginVertical: 10,
  // },

  itemService: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 10,
  },
  IconView: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 10,
  },
  logoview: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: '60%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  editImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    right: 65,
    bottom: 10,
  },
  detailView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  itemSM: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%'
  },
  detailModal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    // borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  Modalbtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 10,
    width: '100%'
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0
  },
  modalHeaderTxt: {
    fontSize: 18
  },
});

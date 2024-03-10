import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal, ToastAndroid, Dimensions, Image
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '../../../store/SearchContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ServiceProviderContext from '../../../store/ServiceProviderContext';
import strings from '../../assets/res/strings';
import { colors } from '../../assets/AppColors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getServiceImages, updateService } from '../../resources/API';
import { BackgroundImage } from '@rneui/base';
import EditServiceInfo from '../../components/ProviderComponents/EditServiceInfo';
import EditServiceDetails from '../../components/ProviderComponents/EditServiceDetails';

const ProviderHome = props => {
  const { isFirst, setserviceTitle } = useContext(SearchContext);
  const { serviceInfoAccorUser, setServiceInfoAccorUser,
    editTitle, seteditTitle,
    editSubTitle, seteditSubTitle,
    editCity, seteditCity,
    locationEdit, setlocationEdit,
    editHallType, seteditHallType,
    editHallcapasity, seteditHallcapasity,
    editphone, seteditphone,
    editEmail, setEditEmail,
    addNewDesc, setAddNewDesc,
    editprice, setEditprice,
    editNumofRequest, setEditNumofRequest,
    editServiceDetail, setEditServiceDetail,
    addSocilMedia, setAddSocilMedia,
    addNewDetail, setAddNewDetail,
    showDetailModal, setShowDetailModal } = useContext(ServiceProviderContext);

  const [servicePhotos, setservicePhotos] = useState();
  // const [showDetailModal, setShowDetailModal] = useState(false);
  const language = strings.arabic.ProviderScreens.ProviderCreateListing;

  const filterService = () => {
    return serviceInfoAccorUser?.filter(item => {
      return item.service_id === isFirst;
    });
  }
  const serviceData = filterService()

  const [serviceDescr, setServiceDescr] = useState(serviceData[0].desc);
  const [serviceSocialMedia, setServiceSocialMedia] = useState(serviceData[0].socialMedia)

  const [socialItem, setSocialItem] = useState();
  const [socialIndex, setSocialIndex] = useState();
  const [descriptionItem, setDescriptionItem] = useState();


  const [isOptional, setIsOptioal] = useState(false);
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

  }, []);

  const onPressHandler = () => {
    props.navigation.goBack();
  };

  const titleEditPress = () => {
    seteditTitle(true)
  }
  const subTitleEditPress = () => {
    seteditSubTitle(true)
  }
  const cityEditPress = () => {
    seteditCity(true)
  }
  const locationEditPress = () => {
    setlocationEdit(true)
  }
  const HallTypeEditPress = () => {
    seteditHallType(true)
  }
  const hallCapasityEditPress = () => {
    seteditHallcapasity(true)
  }
  const phoneEditPress = () => {
    seteditphone(true)
  }
  const emailEditPress = () => {
    setEditEmail(true)
  }
  const socialMediaitemEditPress = (item, itemLink, editSocialMedia, setEditSocialMedia, setShowModal) => {
    setSocialItem(item)
    setSocialIndex(itemLink)
    setEditSocialMedia(!editSocialMedia)
    setShowModal(false)
  }
  const priceEditPress = () => {
    setEditprice(true)
  }
  const editDescrPress = (item, setEditDescrItem, setShowDescModal) => {
    setDescriptionItem(item)
    setEditDescrItem(true)
    setShowDescModal(false)
  }
  const numofRequestEditPress = () => {
    setEditNumofRequest(true)
  }
  const addNewSocialMediaPress = () => {
    setAddSocilMedia(true)
  }
 
  const addNewDescr = () => {
    setAddNewDesc(true)
  }


  const serviceDetailEditPress = (title, type, isPerson, subDetail) => {
    setShowDetailModal(true)
    setDetailItem(title)
    setDetailType(type)
    setDetailIsperson(isPerson)
    setSub_DetailArr(subDetail)
    setEditServiceDetail(true)
  }
  const closeModalPress = (setShowDescModal) => {
    setShowDescModal(false)
  }
  const closeSMmodalPress = (setShowModal) => {
    setShowModal(false)
  }
  const addNewDetailPress = () => {
    setAddNewDetail(true)
    setShowDetailModal(true)
  }
  const renderEditServiceDetailInfo = () => {
    if (editServiceDetail) {
      return (
        <EditServiceDetails
          detailItem={detailItem}
          DetailType={DetailType}
          detailIsperson={detailIsperson}
          sub_DetailArr={sub_DetailArr}
          serviceID={isFirst} />
      )
    }
    if (addNewDetail) {
      return (
        <Text style={styles.basicInfoTitle}>add detail</Text>
      )
    }

  }


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
    const data = filterService()
    // const serviceLogo = data?.map(item => {
    const index = data[0].logoArray?.findIndex((val) => val === true)
    const image = data[0]?.serviceImages[index]

    return (
      <View>
        <BackgroundImage
          style={styles.logoview}
          source={require('../../assets/photos/backgroundPart.png')}>
          <Image style={styles.logoImg} source={{ uri: image }} />
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
            <View>
              {editTitle ?
                <EditServiceInfo serviceID={isFirst} /> :
                <View style={styles.itemService}>
                  <View style={styles.itemSM}>
                    <Pressable onPress={titleEditPress}>
                      <Feather
                        style={styles.menuIcon}
                        name={'edit'}
                        color={colors.BGScereen}
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
                </View>}
            </View>
          )}

          {item.subTitle && (
            <View>
              {editSubTitle ?
                <EditServiceInfo serviceID={isFirst} /> :
                <View style={styles.itemService}>
                  <View style={styles.itemSM}>
                    <Pressable onPress={subTitleEditPress}>
                      <Feather
                        style={styles.menuIcon}
                        name={'edit'}
                        color={colors.BGScereen}
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
                </View>}
            </View>
          )}
        </View>
      );
    });
    return serviceTitle;
  };
  const renderServiceAddress = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      return (
        <View>
          {editCity ?
            <EditServiceInfo serviceID={isFirst} /> :
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
                        name={'edit'}
                        color={colors.BGScereen}
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
            </View>}
          {locationEdit ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View>
              {item.serviceLocation && (
                <View style={styles.itemService}>
                  <View style={styles.itemSM}>
                    <Pressable onPress={locationEditPress}>
                      <Feather
                        style={styles.menuIcon}
                        name={'edit'}
                        color={colors.BGScereen}
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
            </View>}
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
          {editprice ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={priceEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'edit'}
                    color={colors.BGScereen}
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
            </View>}
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
          {editHallType ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={HallTypeEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'edit'}
                    color={colors.BGScereen}
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
            </View>}
          {editHallcapasity ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={hallCapasityEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'edit'}
                    color={colors.BGScereen}
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
            </View>}
        </View>
      );
    });
    return servicePrice;
  };
  const renderServiceNumofRequest = () => {
    const data = filterService();
    const serviceType = data?.map(item => {
      return (
        <View>
          {editNumofRequest ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={numofRequestEditPress}>
                  <Feather
                    style={styles.menuIcon}
                    name={'edit'}
                    color={colors.BGScereen}
                    size={25} />
                </Pressable>
                <Text style={styles.basicInfo}>{item.numRecivedRequest}</Text>
              </View>
              <View style={styles.IconView}>
                <Entypo name={'info'} color={colors.puprble} size={25} />
              </View>
            </View>}
        </View>

      );
    });
    return serviceType;
  };
  const renderContactInfo = () => {
    const data = filterService()
    return data.map(item => {
      return (
        <View>
          {editphone ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View>
              <View style={styles.item}>
                <View style={styles.itemSM}>
                  <Pressable onPress={phoneEditPress}>
                    <Feather
                      style={styles.menuIcon}
                      name={'edit'}
                      color={colors.BGScereen}
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
            </View>}
          {editEmail ?
            <EditServiceInfo serviceID={isFirst} /> :
            <View>
              <View style={styles.item}>
                <View style={styles.itemSM}>
                  <Pressable onPress={emailEditPress}>
                    <Feather
                      style={styles.menuIcon}
                      name={'edit'}
                      color={colors.BGScereen}
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
            </View>}
        </View >
      );
    })
  };

  const deleteDescItemPress = (item, setShowDescModal) => {
    const lastUpdate = serviceDescr.filter(ser => ser.descItem !== item)
    setServiceDescr(lastUpdate)

    const newData = {
      service_id: isFirst,
      desc: serviceDescr
    }
    updateService(newData).then(res => {
      const data = serviceInfoAccorUser || [];
      if (selectedServiceIndex > -1) {
        data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
      }
      if (res.message === 'Updated Sucessfuly') {
        setServiceInfoAccorUser([...data])
        setShowDescModal(false)
        ToastAndroid.showWithGravity(
          'تم الحذف بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    })
  }
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
        <View>{addNewDesc && <EditServiceInfo serviceID={isFirst} />}</View>
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
      return item.desc.map((element, index) => {
        const [editDescrItem, setEditDescrItem] = useState(false)
        const [showDescModal, setShowDescModal] = useState(false);

        return (<View key={index}>
          {editDescrItem ? <EditServiceInfo descriptionItem={descriptionItem} editDescrItem={editDescrItem} setEditDescrItem={setEditDescrItem} serviceID={isFirst} /> :
            <View style={styles.itemService}>
              <View style={styles.itemSM}>
                <Pressable onPress={() => setShowDescModal(true)}>
                  <Feather
                    style={styles.menuIcon}
                    name={'more-vertical'}
                    color={colors.BGScereen}
                    size={25} />
                </Pressable>
                <View>
                  <Text style={styles.basicInfo}>{element.descItem}</Text>
                </View>
              </View>
              <View style={styles.IconView}>
                <AntDesign name={'checkcircle'} color={colors.puprble} size={25} />
              </View>
            </View>}
          {renderDescrModal(element.descItem, setEditDescrItem, editDescrItem, setShowDescModal, showDescModal)}
        </View>)
      })
    })
    return servicedesc
  };
  const renderDescrModal = (item, setEditDescrItem, editDescrItem, setShowDescModal, showDescModal) => {
    return (
      <Modal
        transparent
        visible={showDescModal}
        animationType="slide"
        onRequestClose={() => setShowDescModal(false)}>
        <View style={styles.centeredDescView}>
          <View style={styles.detailModal}>
            <View>
              <Pressable onPress={() => closeModalPress(setShowDescModal)} style={styles.modalHeader}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-horizontal'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
            </View>
            <View style={{ justifyContent: 'flex-end', height: '100%' }}>
              <View style={styles.modalMenu}>
                <Pressable style={styles.modalItem} onPress={() => editDescrPress(item, setEditDescrItem, editDescrItem, setShowDescModal)}>
                  <Feather
                    name={'edit'}
                    color={colors.gray}
                    size={25} />
                  <Text style={styles.modalHeaderTxt}>تعديل</Text>
                </Pressable>
                <Pressable style={styles.modalItem} onPress={() => deleteDescItemPress(item, setShowDescModal)}>
                  <AntDesign
                    name={'delete'}
                    color={colors.gray}
                    size={25} />
                  <Text style={styles.modalHeaderTxt}>حذف</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  // Service detail and sub detail
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
                onPress={() => serviceDetailEditPress(itemDetail.detailTitle, itemDetail.necessity, itemDetail.isPerPerson, itemDetail.subDetailArray)}>
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
                onPress={() => serviceDetailEditPress(itemDetail.detailTitle, itemDetail.necessity, itemDetail.isPerPerson, itemDetail.subDetailArray)}>
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
            <Pressable style={styles.item} onPress={() => {
              addNewDetailPress()
              setIsOptioal(true)
            }}>
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
            <Pressable style={styles.item} onPress={() => {
              addNewDetailPress()
              setIsOptioal(false)
            }}>
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
  const renderDetailModal = () => {
    return (
      <Modal
        transparent
        visible={showDetailModal}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}>
        <View style={styles.servDetailModal}>
          <View style={styles.bodyModal}>
            <Pressable onPress={closeModalPress} style={styles.modalHeader}>
              <Feather
                style={styles.menuIcon}
                name={'more-horizontal'}
                color={colors.puprble}
                size={25} />
            </Pressable>
            {renderEditServiceDetailInfo()}
          </View>
        </View>
      </Modal>
    )
  }

  //Social Media
  const deleteSocialMediaItem = (Socialitem, setShowModal) => {
    console.log("serviceSocialMedia", serviceSocialMedia);
    console.log("Socialitem", Socialitem);
    const lastUpdate = serviceSocialMedia.filter(ser => ser.social !== Socialitem)
    setServiceSocialMedia(lastUpdate)

    const newData = {
      service_id: isFirst,
      socialMedia: serviceSocialMedia
    }
    updateService(newData).then(res => {
      const data = serviceInfoAccorUser || [];
      if (selectedServiceIndex > -1) {
        data[selectedServiceIndex] = { ...data[selectedServiceIndex], ...newData };
      }
      if (res.message === 'Updated Sucessfuly') {
        setServiceInfoAccorUser([...data])
        setShowModal(false)
        ToastAndroid.showWithGravity(
          'تم الحذف بنجاح',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    })

  }
  const renderSoialMedia = () => {
    return (
      <View>
        <Pressable style={styles.item} onPress={addNewSocialMediaPress}>
          <Text style={styles.basicInfo}>اضافة</Text>
          <View style={styles.IconView}>
            <Entypo
              style={styles.icon}
              name={'plus'}
              color={colors.puprble}
              size={25}
            />
          </View>
        </Pressable>
        <View>{addSocilMedia && <EditServiceInfo serviceID={isFirst} />}</View>
        {renderSocialItems()}
      </View>
    );
  };
  const renderSocialItems = () => {
    const data = filterService()
    return data[0].socialMedia.map(element => {
      const [editSocialMedia, setEditSocialMedia] = useState(false)
      const [showModal, setShowModal] = useState(false);
      return (<View>
        {editSocialMedia ?
          <EditServiceInfo
            serviceID={isFirst}
            editSocialMedia={editSocialMedia}
            setEditSocialMedia={setEditSocialMedia}
            socialItem={socialItem}
            socialLink={socialIndex} /> :

          <View style={styles.item}>
            <View style={styles.itemSM}>
              <Pressable onPress={() => {
                setShowModal(true)
              }}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-vertical'}
                  color={colors.BGScereen}
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
        }
        {renderSocialModal(element.social, element.link, editSocialMedia, setEditSocialMedia, showModal, setShowModal)}
      </View>)
    })
  }
  const renderSocialModal = (item, itemLink, editSocialMedia, setEditSocialMedia, showModal, setShowModal) => {
    return (
      <Modal
        transparent
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.detailModal}>
            <View>
              <Pressable onPress={() => closeSMmodalPress(setShowModal)} style={styles.modalHeader}>
                <Feather
                  style={styles.menuIcon}
                  name={'more-horizontal'}
                  color={colors.puprble}
                  size={25} />
              </Pressable>
            </View>
            <View style={{ justifyContent: 'flex-end', height: '100%' }}>
              <View style={styles.modalMenu}>
                <Pressable style={styles.modalItem}
                  onPress={() => socialMediaitemEditPress(item, itemLink, editSocialMedia, setEditSocialMedia, setShowModal)}>
                  <Feather
                    name={'edit'}
                    color={colors.gray}
                    size={25} />
                  <Text style={styles.modalHeaderTxt}>تعديل</Text>
                </Pressable>
                <Pressable style={styles.modalItem} onPress={() => deleteSocialMediaItem(item, setShowModal)}>
                  <AntDesign
                    name={'delete'}
                    color={colors.gray}
                    size={25} />
                  <Text style={styles.modalHeaderTxt}>حذف</Text>
                </Pressable>
              </View>
            </View>
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

        <Text style={styles.sectionTitletxt}>معلومات التواصل </Text>
        <View style={styles.content}>{renderContactInfo()}</View>

        <Text style={styles.sectionTitletxt}>الشبكات الاجتماعية</Text>
        <View style={styles.content}>{renderSoialMedia()}</View>

        <Text style={styles.sectionTitletxt}>الصور</Text>
        <View style={styles.content}>{renderServicePhotos()}</View>

        <Text style={styles.sectionTitletxt}>الوصف</Text>
        <View style={styles.content}>{renderAddDescription()}</View>

        <Text style={styles.sectionTitletxt}>الحد الاقصى لاستقبال طلبات حجز</Text>
        <View style={styles.content}>{renderServiceNumofRequest()}</View>

        {isHall()}
        {istherePrice()}
        {renderMandotory()}
        {renderOptional()}
        {renderDetailModal()}

        <View style={{ height: 100 }}></View>
      </ScrollView>

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
    width: '95%',
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
  itemService: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '100%',
    marginVertical: 10,
    // borderWidth: 1
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
    width: Dimensions.get("screen").width * 0.6,
    height: 160,
    backgroundColor: 'red',
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
    width: '85%',

  },
  detailModal: {
    width: '100%',
    height: '15%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  centeredDescView: {
    flex: 1,
    justifyContent: 'flex-end',
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
  servDetailModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  bodyModal: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
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
  modalMenu: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalItem: {
    // borderWidth: 1,
    alignItems: 'center'
  }
});

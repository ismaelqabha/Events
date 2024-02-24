import React, { useContext, useEffect, useState } from 'react';
import ServiceProviderContext from '../store/ServiceProviderContext';
import SearchContext from './SearchContext';

const ProviderProvider = props => {

  const { userId } = useContext(SearchContext);

  //   service Data
  const [serviceAddress, setserviceAddress] = useState(null);
  const [serviceRegion, setserviceRegion] = useState(null);
  const [title, setTitle] = useState(null);
  const [SuTitle, setSuTitle] = useState(null);
  const [description, setDescription] = useState([]);
  const [selectServiceType, setSelectServiceType] = useState(null);
  const [photoArray, setPhotoArray] = useState([]);
  const [workAreas, setWorkAreas] = useState([]);
  const [price, setPrice] = useState(null);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [hallCapacity, setHallCapacity] = useState(null);
  const [hallType, setHallType] = useState(null);
  const [socialMediaArray, setSocialMediaArray] = useState([])
  const [phoneNumer, setPhoneNumer] = useState(null);
  const [email, setEmail] = useState(null);
  const [eventsTypeWorking, setEventsTypeWorking] = useState([])

  // location 
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Photo delete mode 
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  // drafts 
  const [draftServices, setDraftServices] = useState([]);
  const [draftID, setDraftID] = useState(null)

  // Calender Scrren
  const [serviceInfoAccorUser, setServiceInfoAccorUser] = useState([]);

  // edit service variable
  const [editTitle, seteditTitle] = useState(false);
  const [editSubTitle, seteditSubTitle] = useState(false);
  const [editCity, seteditCity] = useState(false);
  const [locationEdit, setlocationEdit] = useState(false);
  const [editHallType, seteditHallType] = useState(false);
  const [editHallcapasity, seteditHallcapasity] = useState(false);
  const [editphone, seteditphone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editSocialMedia, setEditSocialMedia] = useState(false);
  const [editprice, setEditprice] = useState(false);
  const [editDescrItem, setEditDescrItem] = useState(false);
  const [editNumofRequest, setEditNumofRequest] = useState(false);
  const [editServiceDetail, setEditServiceDetail] = useState(false);

  return (
    <ServiceProviderContext.Provider
      value={{
        serviceAddress,
        setserviceAddress,
        serviceRegion,
        setserviceRegion,
        title,
        setTitle,
        SuTitle,
        setSuTitle,
        description,
        setDescription,
        selectServiceType,
        setSelectServiceType,
        photoArray,
        setPhotoArray,
        workAreas,
        setWorkAreas,
        eventsTypeWorking, 
        setEventsTypeWorking,
        price,
        setPrice,
        additionalServices,
        setAdditionalServices,
        serviceInfoAccorUser,
        setServiceInfoAccorUser,
        hallCapacity,
        setHallCapacity,
        hallType,
        setHallType,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        allData: {
          userID: userId,
          servType: selectServiceType,
          title: title,
          subTitle: SuTitle,
          desc: description,
          region: serviceRegion,
          address: serviceAddress,
          servicePrice: price,
          serviceStutes: null,
          workingRegion: workAreas,
          maxCapasity: hallCapacity,
          hallType: hallType,
          isCostPerPerson: null,
          additionalServices: additionalServices,
          socialMedia: socialMediaArray,
          photoArray,
        },

        // socail data
        socialMediaArray,
        setSocialMediaArray,
        phoneNumer, setPhoneNumer,
        email, setEmail,

        // Photo delete mode 
        isDeleteMode,
        setIsDeleteMode,
        // Draft documents 
        draftServices,
        setDraftServices,
        draftID,
        setDraftID,

        editTitle, 
        seteditTitle,
        editSubTitle, 
        seteditSubTitle,
        editCity, 
        seteditCity,
        locationEdit, 
        setlocationEdit,
        editHallType, 
        seteditHallType,
        editHallcapasity, 
        seteditHallcapasity,
        editphone, 
        seteditphone,
        editEmail, 
        setEditEmail,
        editSocialMedia, 
        setEditSocialMedia,
        editprice, 
        setEditprice,
        editDescrItem, 
        setEditDescrItem,
        editNumofRequest, 
        setEditNumofRequest,
        editServiceDetail, 
        setEditServiceDetail
      }}>
      {props.children}
    </ServiceProviderContext.Provider>
  );
};

export default ProviderProvider;

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
  const [description, setDescription] = useState(null);
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

  // Photo delete mode 
  const [isDeleteMode, setIsDeleteMode] = useState(false)

  // drafts 
  const [draftServices, setDraftServices] = useState([]);
  const [draftID, setDraftID] = useState(null)

  // Calender Scrren
  const [serviceInfoAccorUser, setServiceInfoAccorUser] = useState([]);

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
      }}>
      {props.children}
    </ServiceProviderContext.Provider>
  );
};

export default ProviderProvider;

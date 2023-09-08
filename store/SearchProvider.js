import React, { useState } from 'react';
import { favoritesList, fileFavorites, Events, Request, Payment, serviceDetail, subDetail, subDetailData, servicesData, ServiceImages, Users } from '../src/resources/data';
import SearchContext from '../store/SearchContext';


const SearchProvider = props => {
  const [Service, setService] = useState({});
  const [city, setCity] = useState({});
  const [cat, setCat] = useState('');

  const [userId, setuserId] = useState(1);
  const [sType, setSType] = useState({});
  const [fId, setFId] = useState({});
  const [ServId, setServId] = useState('');



  // Data Base Tables
  const [userFavorates, setUserFavorates] = useState([])
  const [fileFavoriteState, setFileFavoriteState] = useState([])
  const [ServiceDataInfo, setServiceDataInfo] = useState([])
  const [ServiceImages, setServiceImages] = useState([])
  const [ServiceDatesforBooking, setServiceDatesforBooking] = useState([])
  const [campInfo, setCampInfo] = useState([])
  const [datesforBooking, setDatesforBooking] = useState([])
  // Service Descrption Request
  const [detailOfServ, setDetailOfServ] = useState([])
  const [isFromServiceDescription, setisFromServiceDescription] = useState()

  const [town, setTown] = useState([])

  // ClientSearch
  const [cityselected, setcityselected] = useState("");
  const [regionselect, setregionselect] = useState("");
  const [selectDateforSearch, setselectDateforSearch] = useState();
  const [selectMonthforSearch, setselectMonthforSearch] = useState();
  const [Categorychozen, setCategorychozen] = useState(false)
  //
  const [userRegion, setUserRegion] = useState('المثلث الشمالي');
  const [requestedDate, setrequestedDate] = useState()







  const [UserState, setUserState] = useState(Users || [])
  const [fileEventState, setfileEventState] = useState(Events || [])
  const [AddResToEventFile, setAddResToEventFile] = useState(Request || [])
  const [userPayment, setUserPayment] = useState(Payment || [])
  
  const [serviceSubDetail, setserviceSubDetail] = useState(subDetail || [])
  const [SubDetData, setSubDetData] = useState(subDetailData || [])

  const [serviceImg, setserviceImg] = useState([])

  const [ImgOfServeice, setImgOfServeice] = useState()
  const [isDateAvailable, setisDateAvailable] = useState(false)
  const [detailIdState, setdetailIdState] = useState();
  const [RequestIdState, setRequestIdState] = useState();




  return (
    <SearchContext.Provider
      value={{
        Service: Service,
        setService,
        city: city,
        setCity,
        userId,
        setuserId,
        cat,
        setCat,
        sType,
        setSType,
        fId,
        setFId,
        ServId,
        setServId,
        userFavorates,
        setUserFavorates,
        fileFavoriteState,
        setFileFavoriteState,
        fileEventState,
        setfileEventState,
        AddResToEventFile,
        setAddResToEventFile,
        ImgOfServeice,
        setImgOfServeice,
        userPayment,
        setUserPayment,
        isDateAvailable,
        setisDateAvailable,
        detailOfServ,
        setDetailOfServ,
        serviceSubDetail,
        setserviceSubDetail,
        ServiceDataInfo,
        setServiceDataInfo,
        detailIdState,
        setdetailIdState,
        SubDetData,
        setSubDetData,
        RequestIdState,
        setRequestIdState,
        serviceImg,
        setserviceImg,
        UserState,
        setUserState,
        campInfo,
        setCampInfo,
        userRegion,
        setUserRegion,
        town,
        setTown,
        cityselected,
        setcityselected,
        regionselect,
        setregionselect,
        selectDateforSearch,
        setselectDateforSearch,
        selectMonthforSearch,
        setselectMonthforSearch,
        datesforBooking,
        setDatesforBooking,
        ServiceImages,
        setServiceImages,
        ServiceDatesforBooking,
        setServiceDatesforBooking,
        requestedDate,
        setrequestedDate,
        Categorychozen,
        setCategorychozen,
        isFromServiceDescription, 
        setisFromServiceDescription
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

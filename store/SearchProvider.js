import React, { useState } from 'react';
import { favoritesList, fileFavorites, Events, Request, Payment, serviceDetail, subDetail, subDetailData, servicesData, ServiceImages, Users } from '../src/resources/data';
import SearchContext from '../store/SearchContext';
import { v4 as uuidv4 } from 'uuid';


const SearchProvider = props => {

  const [userId, setuserId] = useState('646ce3e29e7972dc37f3146d');
  const [userInfo, setUserInfo] = useState([]);
  const [sType, setSType] = useState({});

  const [Service, setService] = useState({});
  const [city, setCity] = useState({});
  const [cat, setCat] = useState('');
  const [fId, setFId] = useState({});
  const [ServId, setServId] = useState('');



  // Data service favorites
  const [userFavorates, setUserFavorates] = useState([])
  const [fileFavoriteState, setFileFavoriteState] = useState([])
  // service Info
  const [ServiceDataInfo, setServiceDataInfo] = useState([])
  const [ServiceImages, setServiceImages] = useState([])
  const [ServiceDatesforBooking, setServiceDatesforBooking] = useState([])
  const [datesforBooking, setDatesforBooking] = useState([])
  // campighin
  const [campInfo, setCampInfo] = useState([])
  const [campiegnsAccordingServiceId, setCampiegnsAccordingServiceId] = useState([])
  const [reachCampaignfrom, setReachCampaignfrom] = useState('fromHome')
 
  // Service Descrption Request
  const [detailOfServ, setDetailOfServ] = useState([])
  const [town, setTown] = useState([])
  const [serviceSubDetail, setserviceSubDetail] = useState([])
  const [detailIdState, setdetailIdState] = useState();

  // Request
  const [requestInfo, setRequestInfo] = useState( [])
  const [orderSubdetail, setOrderSubdetail] = useState([])
  const [isFromRequestScreen, setisFromRequestScreen] = useState()
  const [RequestIdState, setRequestIdState] = useState();
  const [TimeText, setTimeText] = useState()

 // Event 
 const [eventInfo, setEventInfo] = useState([])

  // ClientSearch
  const [cityselected, setcityselected] = useState("");
  const [regionselect, setregionselect] = useState("");
  const [selectDateforSearch, setselectDateforSearch] = useState();
  const [selectMonthforSearch, setselectMonthforSearch] = useState();
  const [Categorychozen, setCategorychozen] = useState(false)
  const [userRegion, setUserRegion] = useState('المثلث الشمالي');
  const [requestedDate, setrequestedDate] = useState()


  //Booking
 
  const [UserState, setUserState] = useState(Users || [])
  const [userPayment, setUserPayment] = useState(Payment || [])
  const [serviceImg, setserviceImg] = useState([])
  const [ImgOfServeice, setImgOfServeice] = useState()
  const [isDateAvailable, setisDateAvailable] = useState(false)
 




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
        requestInfo, 
        setRequestInfo,
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
        isFromRequestScreen, 
        setisFromRequestScreen,
        orderSubdetail, 
        setOrderSubdetail,
        eventInfo, 
        setEventInfo,
        TimeText, 
        setTimeText,
        campiegnsAccordingServiceId, 
        setCampiegnsAccordingServiceId,
        reachCampaignfrom, 
        setReachCampaignfrom,
        userInfo, 
        setUserInfo
        
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

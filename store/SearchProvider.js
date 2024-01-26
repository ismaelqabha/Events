import React, { useState } from 'react';
import { favoritesList, fileFavorites, Events, Request, Payment, serviceDetail, subDetail, subDetailData, servicesData, ServiceImages, Users } from '../src/resources/data';
import SearchContext from '../store/SearchContext';


const SearchProvider = props => {

  //user
  const [userId, setuserId] = useState(1);
  // const [userInfo, setUserInfo] = useState([]);
  // const [userName, setUserName] = useState(null);
  // const [userEmail, setUserEmail] = useState(null);
  // const [userPhone, setUserPhone] = useState(null);
  // const [userBD, setUserBD] = useState(null);
  // const [userGender, setUserGender] = useState(null);
  // const [userStatus, setUserStatus] = useState(null);
  // const [userCity, setUserCity] = useState(null);
  // const [createUserRegion, setCreateUserRegion] = useState(null);
  // const [userSpecialDate, setUserSpecialDate] = useState([]);
  // const [password, setPassword] = useState(null);
  // const [confirmPassword, setconfirmPassword] = useState(null);
  // const [profilePhoto, setProfilePhoto] = useState(null);


  const [cat, setCat] = useState('');
  const [isFirst, setIsfirst] = useState ()
  const [serviceTitle, setserviceTitle] = useState ()
  const [serviceCat, setServiceCat] = useState();
  const [sType, setSType] = useState();
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
  const [requestInfo, setRequestInfo] = useState([])
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
  const [yearforSearch, setYearforSearch] = useState();
  const [Categorychozen, setCategorychozen] = useState(false)
  const [userRegion, setUserRegion] = useState('المثلث الشمالي');
  const [requestedDate, setrequestedDate] = useState()


  //Booking

  const [userPayment, setUserPayment] = useState(Payment || [])
  const [serviceImg, setserviceImg] = useState([])
  const [ImgOfServeice, setImgOfServeice] = useState()
  const [isDateAvailable, setisDateAvailable] = useState(false)





  return (
    <SearchContext.Provider
      value={{
        userId,
        setuserId,
        // userName, 
        // setUserName,
        // userEmail, 
        // setUserEmail,
        // userPhone, 
        // setUserPhone,
        // userBD, 
        // setUserBD,
        // userInfo,
        // setUserInfo,
        // userGender, 
        // setUserGender,
        // userStatus, 
        // setUserStatus,
        // userCity, 
        // setUserCity,
        // createUserRegion, 
        // setCreateUserRegion,
        // userSpecialDate, 
        // setUserSpecialDate,
        // password, 
        // setPassword,
        // confirmPassword, 
        // setconfirmPassword,
        // profilePhoto, 
        // setProfilePhoto,
        cat,
        setCat,
        isFirst,
        setIsfirst,
        serviceTitle,
        setserviceTitle,
        serviceCat, 
        setServiceCat,
        sType,
        setSType,
        // Service: Service,
        // setService,
        // city: city,
        // setCity,
        // fId,
        // setFId,
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
        yearforSearch, 
        setYearforSearch,
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
       

      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

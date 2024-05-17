import React, { useState } from 'react';
import {   Payment } from '../src/resources/data';
import SearchContext from '../store/SearchContext';


const SearchProvider = props => {

  //user
  const [userInfoBySpiceficId, setUserInfoBySpiceficId] = useState();

  const [cat, setCat] = useState('');
  const [isFirst, setIsfirst] = useState()
  const [serviceTitle, setserviceTitle] = useState()
  const [serviceCat, setServiceCat] = useState();
  const [sType, setSType] = useState();
  const [ServId, setServId] = useState('');

  // Data service favorites
  const [userFavorates, setUserFavorates] = useState([])
  const [fileFavoriteState, setFileFavoriteState] = useState([])

  // service Info
  const [ServiceDataInfo, setServiceDataInfo] = useState([])
  const [ServiceInfoById, setServiceInfoById] = useState([])
  const [ServiceImages, setServiceImages] = useState([])
  const [ServiceDatesforBooking, setServiceDatesforBooking] = useState([])
  const [datesforBooking, setDatesforBooking] = useState([])

  // campighin
  const [campInfo, setCampInfo] = useState([])
  const [campiegnsAccordingServiceId, setCampiegnsAccordingServiceId] = useState([])

  // Service Descrption Request
  const [detailOfServ, setDetailOfServ] = useState([])

  const [serviceSubDetail, setserviceSubDetail] = useState([])
  const [detailIdState, setdetailIdState] = useState();

  // Request
  const [requestInfoByService, setRequestInfoByService] = useState([])
  const [requestInfoAccUser, setRequestInfoAccUser] = useState([])
  const [resDetail, setResDetail] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)


  const [orderSubdetail, setOrderSubdetail] = useState([])

  // Event 
  const [eventInfo, setEventInfo] = useState([])
  const [eventTypeInfo, setEventTypeInfo] = useState([]);

  // ClientSearch
  const [cityselected, setcityselected] = useState("");
  const [regionselect, setregionselect] = useState("");
  const [selectDateforSearch, setselectDateforSearch] = useState();
  const [selectMonthforSearch, setselectMonthforSearch] = useState();
  const [yearforSearch, setYearforSearch] = useState();
  const [Categorychozen, setCategorychozen] = useState(false)
  const [userRegion, setUserRegion] = useState('المثلث الشمالي');
  const [requestedDate, setrequestedDate] = useState([])
  const [periodDatesforSearch, setperiodDatesforSearch] = useState(0)
  const [regionData, setRegionData] = useState([])

  //Booking

  const [userPayment, setUserPayment] = useState(Payment || [])
  const [serviceImg, setserviceImg] = useState([])
  const [ImgOfServeice, setImgOfServeice] = useState()
  const [isDateAvailable, setisDateAvailable] = useState(false)

  // query Dates
  const [bookingDates, setBookingDates] = useState([])


  return (
    <SearchContext.Provider
      value={{
        userInfoBySpiceficId,
        setUserInfoBySpiceficId,
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
        ServId,
        setServId,
        userFavorates,
        setUserFavorates,
        fileFavoriteState,
        setFileFavoriteState,
        requestInfoByService,
        setRequestInfoByService,
        requestInfoAccUser, 
        setRequestInfoAccUser,
        resDetail,
        setResDetail,
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
        ServiceInfoById,
        setServiceInfoById,
        detailIdState,
        setdetailIdState,
        // RequestIdState,
        // setRequestIdState,
        serviceImg,
        setserviceImg,
        campInfo,
        setCampInfo,
        userRegion,
        setUserRegion,
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
        periodDatesforSearch,
        setperiodDatesforSearch,
        ServiceImages,
        setServiceImages,
        ServiceDatesforBooking,
        setServiceDatesforBooking,
        requestedDate,
        setrequestedDate,
        Categorychozen,
        setCategorychozen,
        orderSubdetail,
        setOrderSubdetail,
        eventInfo,
        setEventInfo,
        eventTypeInfo,
        setEventTypeInfo,
        campiegnsAccordingServiceId,
        setCampiegnsAccordingServiceId,
        regionData, setRegionData,
        totalPrice, setTotalPrice,
        bookingDates, setBookingDates

      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

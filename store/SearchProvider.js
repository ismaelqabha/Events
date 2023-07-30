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
  const [favorite, setFavorite] = useState();

  const [UserState, setUserState] = useState(Users || [])
  const [userFavorates, setUserFavorates] = useState( [])
  const [fileFavoriteState, setFileFavoriteState] = useState( [])
  const [fileEventState, setfileEventState] = useState(Events || [])
  const [AddResToEventFile, setAddResToEventFile] = useState(Request || [])
  const [userPayment, setUserPayment] = useState(Payment || [])
  const [detailOfServ, setDetailOfServ] = useState([])
  const [serviceSubDetail, setserviceSubDetail] = useState(subDetail || [])
  const [SubDetData, setSubDetData] = useState(subDetailData || [])
  const [ServiceDataInfo, setServiceDataInfo] = useState([])
  const [serviceImg, setserviceImg] = useState( [])

  const [checkInDesc, setcheckInDesc] = useState()
  const [ImgOfServeice, setImgOfServeice] = useState()
  const [isDateAvailable, setisDateAvailable] = useState(false)
  const [DateText, setDateText] = useState('dd/mm/yyyy');
  const [TimeText, setTimeText] = useState('00:00');
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
        favorite,
        setFavorite,
        userFavorates,
        setUserFavorates,
        fileFavoriteState,
        setFileFavoriteState,
        checkInDesc,
        setcheckInDesc,
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
        DateText,
        setDateText,
        TimeText,
        setTimeText,
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
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

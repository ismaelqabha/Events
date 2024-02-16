 const baseUrl = 'https://ev-server.onrender.com/';
//const baseUrl = "http://localhost:7000/"


// Users
export const getUserData = async (body) => {
    const url = 'Users/getUserInfo'
    return await AppFetch(url, 'POST', body)
}
export const addUser = async (AddNewUser , UserPhoto) => {
    const url = 'Users/create'
    try {
      const formData = new FormData();
      formData.append("UserPhoto",{
        uri:UserPhoto,
        type: 'image/jpeg',
        name: `userPhoto.jpg`,
      })
      formData.append("UserData",JSON.stringify(AddNewUser))
      const headers={
        'Content-Type': 'multipart/form-data',
      }
    
      return await AppFetch(url, 'POST', formData ,headers)
      
    } catch (error) {
      
    }
}
export const signIn = async (body) => {
  const url = 'Users/login'
  return await AppFetch(url, 'POST', body)
}

// Service Data
export const getHomePageData = async body => {
  const url = 'servicesData/getServiceAccordingCategory';
  return await AppFetch(url, 'POST', body);
};
export const getServiceBySerId = async body => {
  const url = 'servicesData/getServiceAccordingServiceId';
  return await AppFetch(url, 'POST', body);
};
export const getServiceInfoById = async body => {
  const url = 'servicesData/getServiceById';
  return await AppFetch(url, 'POST', body);
};
export const addService = async body => {
  const url = 'servicesData/create';
  return await AppFetch(url, 'POST', body);
};
export const updateService = async body => {
  const url = 'servicesData/updateByid';
  return await AppFetch(url, 'PATCH', body);
};


//Service Detail
export const getServiceDetail = async body => {
  const url = 'serviceDetail/getServiceDetailByServID';
  return await AppFetch(url, 'POST', body);
};
//Service sub Detail
export const getServiceSubDetail = async body => {
  const url = 'subDetail/getSubDetail';
  return await AppFetch(url, 'POST', body);
};
export const getOrderSubdetailInfo = async body => {
  const url = 'OrderServiceDetail/getOrderDetailById';
  return await AppFetch(url, 'POST', body);
};
export const addNewOrderDetail = async body => {
  const url = 'OrderServiceDetail/addOrderDetail';
  return await AppFetch(url, 'POST', body);
};
//Event
export const getEventsInfo = async body => {
  const url = 'Events/getEvent';
  return await AppFetch(url, 'POST', body);
};
export const createNewEvent = async body => {
  const url = 'Events/create';
  return await AppFetch(url, 'POST', body);
};
export const updateEvent = async body => {
  const url = 'Events/updateByid';
  return await AppFetch(url, 'PATCH', body);
};
// export const getEventLogo = async body => {
//   const url = 'EventList/getEventIconById';
//   return await AppFetch(url, 'POST', body);
// };
export const getEventList = async body => {
  const url = 'EventList/getEventItem';
  return await AppFetch(url, 'POST', body);
};
// Request

export const getRequestInfoWithservice = async (body) => {
    const url = 'Request/getRequestService'
    return await AppFetch(url, 'POST', body)
}
export const addNewRequest = async (body) => {
    const url = 'Request/addRequest'
    return await AppFetch(url, 'POST', body)
}
export const updateRequest = async (body) => {
    const url = 'Request/updateByid'
    return await AppFetch(url, 'PATCH', body)
}
export const getRequestbyUserId = async (body) => {
    const url = 'Request/getRequest'
    return await AppFetch(url, 'POST', body)
}
export const deleteRequestbyId = async (body) => {
    const url = 'Request/deleteByid'
    return await AppFetch(url, 'DELETE', body)
}
// Camaighns
export const getCampaigns = async (body) => {
    const url = 'Campaigns/getCampaigns'
    return await AppFetch(url, 'POST', body)
}
export const getCampaignsByServiceId = async (body) => {
    const url = 'Campaigns/getCampByServiceId'
    return await AppFetch(url, 'POST', body)
}
export const createNewOffer = async (body) => {
  const url = 'Campaigns/createCamp'
  return await AppFetch(url, 'POST', body)
}

//Add New Dates According Service Id
export const NewDatesAdding = async body => {
  const url = 'Dates/addDates';
  return await AppFetch(url, 'POST', body);
};
// File Favorite Info
export const getFileFavoriteBage = async body => {
  const url = 'fileFavorites/getfileFavoritesByUserId';
  return await AppFetch(url, 'POST', body);
};
export const AddFileFavorite = async body => {
  const url = 'fileFavorites/addFileFavorate';
  return await AppFetch(url, 'POST', body);
};
export const DeleteFileFavorite = async body => {
  const url = 'fileFavorites/deleteByid';
  return await AppFetch(url, 'DELETE', body);
};
export const UpdateFileFavorite = async body => {
  const url = 'fileFavorites/updateByid';
  return await AppFetch(url, 'PATCH', body);
};

//Cites
export const getCities = async body => {
  const url = 'City/getCity';
  return await AppFetch(url, 'POST', body);
};

// Regions
export const getRegions = async body =>{
  const url = 'Region/getRegions'
  return await AppFetch(url,'POST',body)
}

// Draft services 
export const addDraftToAPI= async body =>{
  const url = 'DraftServices/addDraftService';
  return await AppFetch(url,'POST',body)
}

export const getDraftFromAPI = async body =>{
  const url ='DraftServices/getDraftService'
  return await AppFetch(url,"POST",body)
}

export const removeDraftFromAPI = async body =>{
  const url ='DraftServices/deleteDraftService'
  return await AppFetch(url,"POST",body)
}

//Service Images
export const getServiceImages = async body => {
  const url = 'ServiceImags/getImg';
  return await AppFetch(url, 'POST', body);
};

export const addServiceImages = async (imagesArray,serviceID) => {
  const url = 'ServiceImags/addImg';
  try {
    const formData = new FormData();
    const headers={
      'Content-Type': 'multipart/form-data',
    }
    const logoArray = [];
    formData.append("serviceID",serviceID)
      imagesArray?.forEach((data,index) => {
        formData.append(`images`,{
          uri:data.uri,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        })
        formData.append("logoArray" , data.logo)
      });
      
    return await AppFetch(url, 'POST', formData , headers);
  } catch (error) {
    console.log("error adding images ", error);
  }
  
};

// Service Booking Dates
export const getbookingDates = async body => {
  const url = 'Dates/getDates';
  return await AppFetch(url, 'POST', body);
};

// Favorites Services Info
export const getFavoritesforUser = async body => {
  const url = 'FavoritesList/getFavoritesList';
  return await AppFetch(url, 'POST', body);
};
export const getFavoritesServiceInfo = async body => {
  const url = 'FavoritesList/getServicesFavorites';
  return await AppFetch(url, 'POST', body);
};
export const getFavoritesbyFileId = async body => {
  const url = 'FavoritesList/getFavoritesListByFileId';
  return await AppFetch(url, 'POST', body);
};
export const AddNewFavorites = async body => {
  //console.log("AddNewFavorites: ", body);
  const url = 'FavoritesList/addFavoritesList';
  return await AppFetch(url, 'POST', body);
};
export const RemoveFavorite = async body => {
  const url = 'FavoritesList/deleteByid';
  return await AppFetch(url, 'DELETE', body);
};

const AppFetch = async (url, method, body , headers) => {
  const fullUrl = baseUrl + url;
  const bodyStr = JSON.stringify(body) || '';

  return fetch(fullUrl, {
    method: method,
    body: headers ? body : bodyStr,
    headers: headers || {
      'content-type': 'application/json',
    },
  })
    .then(res => {
      console.log('req: ', fullUrl, 'res code: ', res?.status);
      return res?.json?.();
    })
    .then(resJson => {
      return resJson;
    })
    .catch(e => {
      console.log('fetch error: ', e);
    });
};

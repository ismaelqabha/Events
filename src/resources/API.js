
const baseUrl = "https://ev-server.onrender.com/";
//const baseUrl = "http://localhost:7000/"

export const getHomePageData = async (body) => {
    const url = 'servicesData/getServiceAccordingCategory'
    return await AppFetch(url, 'POST', body)

}
export const getServiceDetail = async (body) => {
    const url = 'serviceDetail/getServiceDetailByServID'
    return await AppFetch(url, 'POST', body)
}
export const getEventsInfoBage = async () => {
    const url = ''
    return await AppFetch(url)

}
// Camaighns
export const getCampaigns = async (body) => {
    const url = 'Campaigns/getCampaigns'
    return await AppFetch(url, 'POST', body)
}
//Add New Dates According Service Id
export const NewDatesAdding = async (body) => {
    const url = 'Dates/addDates'
    return await AppFetch(url, 'POST', body)
}
// File Favorite Info
export const getFileFavoriteBage = async (body) => {
    const url = 'fileFavorites/getfileFavoritesByUserId'
    return await AppFetch(url, 'POST', body)
}
export const AddFileFavorite = async (body) => {
    const url = 'fileFavorites/addFileFavorate'
    return await AppFetch(url, 'POST', body)

}

//Cites
export const getCities = async (body) => {
    const url = 'City/getCity'
    return await AppFetch(url, 'POST', body)
}

//Service Images
export const getServiceImages = async (body) => {
    const url = 'ServiceImags/getImg'
    return await AppFetch(url, 'POST', body)
}

// Service Booking Dates
export const getbookingDates = async (body) => {
    const url = 'Dates/getDates'
    return await AppFetch(url, 'POST', body)
}

// Favorites Services Info
export const getFavoritesforUser = async (body) => {
    const url = 'FavoritesList/getFavoritesList'
    return await AppFetch(url, 'POST', body)
}
export const getFavoritesServiceInfo = async (body) => {
    const url = 'FavoritesList/getServicesFavorites'
    return await AppFetch(url, 'POST', body)
}
export const AddNewFavorites = async (body) => {
    //console.log("AddNewFavorites: ", body);
    const url = 'FavoritesList/addFavoritesList'
    return await AppFetch(url, 'POST', body)
}
export const RemoveFavorite = async (body) => {
    const url = 'FavoritesList/deleteByid'
    return await AppFetch(url, 'DELETE', body)
}

const AppFetch = async (url, method, body) => {
    const fullUrl = baseUrl + url
    const bodyStr = JSON.stringify(body) || ''


    return fetch(fullUrl, {
        "method": method,
        body: bodyStr,
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            console.log("req: ", fullUrl, "res code: ", res?.status);
            return res?.json?.()
        })
        .then(resJson => {
            return resJson;
        })
        .catch(e => {
            console.log("fetch error: ", e);
        })
}



import { Alert } from "react-native";
import { ToastAndroid } from "react-native";
import { Platform } from "react-native";
import { addService, addServiceImages } from "./API";


export const showMessage = (msg) => {
  Platform.OS === 'android'
    ? ToastAndroid.show(msg, ToastAndroid.SHORT)
    : Alert.IOS.alert(msg);
};
export const onPublishPress = async (allData) => {
  await addService(allData)
    .then(async res => {
      console.log(' service res ->', res.serviceID);

      await addServiceImages(allData.photoArray, res?.serviceID).then((res) => {
        console.log("images res -> ", res);
        showMessage("تم حفظ البيانات")
      }).catch((e) => {
        console.log('upload photos event error : ', e);

      })
    })
    .catch(e => {
      console.log('create new event error : ', e);
    });
};



/**
 * Calculate the total price based on reservation details and service data.
 * 
 * @param {Array} resDetail - Array of reservation details.
 * @param {string | Array} requestedDate - Requested date(s) for reservation.
 * @param {Object} data - Data of the service.
 * @param {Function} setTotalPrice - Function to set the total price.
 */
export const calculateTotalPrice = (resDetail, requestedDate, data, setTotalPrice) => {
  let total = 0;

  console.log("dataSer", data);

  // Function to calculate total price for a single date
  const calculateDateTotal = (date) => {
    const detailIndex = resDetail.findIndex((item) => item.reservationDate === date);
    if (detailIndex !== -1) {
      const { subDetailId, numOfInviters, campaigns } = resDetail[detailIndex];
      var dateTotal = calculateSubDetailTotal(subDetailId, numOfInviters);
      if (campaigns) {
        campaigns.forEach((campaign) => {
          const multiplier = calculateMultiplier(campaign.priceInclude, numOfInviters, campaign.numberPerTable);
          dateTotal += (campaign.campCost || 0) * multiplier
        });
      }
      updateReservationObject(detailIndex, dateTotal);
      total += dateTotal;
    }
  };

  // Function to calculate total price for a single date
  const calculateSingleDateTotal = () => {
    if (resDetail.length > 0) {
      const { subDetailId, numOfInviters, campaigns } = resDetail[0];
      // console.log("subDetailId", subDetailId, "campaigns", campaigns);
      var dateTotal = calculateSubDetailTotal(subDetailId, numOfInviters);
      if (campaigns) {
        campaigns.forEach((campaign) => {
          const multiplier = calculateMultiplier(campaign.priceInclude, numOfInviters, campaign.numberPerTable);
          dateTotal += (campaign.campCost || 0) * multiplier;
        });
      }
      updateReservationObject(0, dateTotal);
      total += dateTotal;
    }
  };

  // Function to calculate sub detail total price
  const calculateSubDetailTotal = (subDetailId, numOfInviters) => {
    let dateTotal = 0;
    const filteredSubDetails = filterSubDetails(data, subDetailId);
    filteredSubDetails?.forEach((subDetail) => {
      const additionType = subDetail.additionType ? subDetail.additionType : subDetail?.isPerPerson ? 'perPerson' : 'perRequest';
      const numberPerTable = subDetail.numberPerTable;
      subDetail.subDetailArray.forEach((detail) => {
        const price = parseInt(detail.detailSubtitleCost) * calculateMultiplier(additionType, numOfInviters, numberPerTable);
        dateTotal += price;
      });
    });
    return dateTotal;
  };

  // Function to calculate multiplier based on price include type
  const calculateMultiplier = (priceInclude, numOfInviters, numberPerTable) => {
    switch (priceInclude) {
      case "perPerson":
        return numOfInviters || 0;
      case "perTable":
        return Math.ceil(numOfInviters / numberPerTable);
      default:
        return 1;
    }
  };

  // Function to update reservation object with total price
  const updateReservationObject = (index, dateTotal) => {
    resDetail[index].datePrice = dateTotal;
  };

  // Calculate total price for requested dates
  if (Array.isArray(requestedDate)) {
    requestedDate.forEach((date) => calculateDateTotal(date));
  } else {
    calculateSingleDateTotal();
  }

  // Add service price to total if available
  const price = data.servicePrice
  if (price) {
    total += price
  }

  // Set the total price
  setTotalPrice(total);
};

export const filterSubDetails = (data, subDetailId) => {
  return data.additionalServices?.map(service => {
    // Filter sub details based on whether their id exists in subDetailId array
    const filteredSubDetailArray = service.subDetailArray.filter(subDetail =>
      subDetailId.includes(subDetail.id)
    );

    // Return the service object with modified subDetailArray
    return {
      ...service,
      subDetailArray: filteredSubDetailArray
    };
  });
};
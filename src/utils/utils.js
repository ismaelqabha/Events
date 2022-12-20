export const calcCost = eventTotalCost => {
    const totalCost = Object.keys(eventTotalCost);
    const totalsArray = totalCost.map(key => {
      return eventTotalCost[key].totalCost;
    });
  
    var p = 0;
    totalsArray.forEach(price => {
      p += price;
    });
  
    return p;
  };
  
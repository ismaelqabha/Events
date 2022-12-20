import React, {useContext,useState} from 'react';
import SearchContext from '../store/SearchContext';
import { bookingList } from '../resources/data';

const SearchProvider = props => {
 const [Service, setService] = useState({});
 const [city, setCity] = useState({});
 const [date, setDate] = useState(null);
 const [cat, setCat] = useState({});
 const [evId, setevId] = useState(2);
 const [eventTotalCost, setEventTotalCost] = useState(0);
  return (
    <SearchContext.Provider
       value={{
        Service:Service,
        setService,
        city: city,
        setCity,
        date,
        setDate,
        cat,
        setCat,
        evId,
        setevId,
        eventTotalCost,
        setEventTotalCost,
      }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;

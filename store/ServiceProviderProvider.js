import React, {useState} from 'react';
import ServiceProviderContext from '../store/ServiceProviderContext';

const ProviderProvider = props => {
  //   service Data
  const [serviceAddress, setserviceAddress] = useState(null);
  const [serviceRegion, setserviceRegion] = useState(null);
  const [title, setTitle] = useState(null);
  const [SuTitle, setSuTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectServiceType, setSelectServiceType] = useState(null);
  const [photoSource, setPhotoSource] = useState(null);
  const [workAreas, setWorkAreas] = useState([]);

  return (
    <ServiceProviderContext.Provider
      value={{
        serviceAddress,
        setserviceAddress,
        serviceRegion,
        setserviceRegion,
        title,
        setTitle,
        SuTitle,
        setSuTitle,
        description,
        setDescription,
        selectServiceType,
        setSelectServiceType,
        photoSource,
        setPhotoSource,
        workAreas,
        setWorkAreas,
      }}>
      {props.children}
    </ServiceProviderContext.Provider>
  );
};

export default ProviderProvider;

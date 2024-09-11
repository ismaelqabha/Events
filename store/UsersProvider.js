import React, { useState } from 'react';
import UsersContext from './UsersContext';

const UsersProvider = (props) => {
    const [userId, setuserId] = useState();
    const [userInfo, setUserInfo] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userBD, setUserBD] = useState('');
    const [userGender, setUserGender] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [userCity, setUserCity] = useState(null);
    const [createUserRegion, setCreateUserRegion] = useState(null);
    const [userSpecialDate, setUserSpecialDate] = useState([]);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setconfirmPassword] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [relations, setRelations] = useState(null);

    // location 
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);



    return (
        <UsersContext.Provider
            value={{
                userId,
                setuserId,
                userName,
                setUserName,
                userEmail,
                setUserEmail,
                userPhone,
                setUserPhone,
                userBD,
                setUserBD,
                userInfo,
                setUserInfo,
                userGender,
                setUserGender,
                userStatus,
                setUserStatus,
                userCity,
                setUserCity,
                createUserRegion,
                setCreateUserRegion,
                userSpecialDate,
                setUserSpecialDate,
                password,
                setPassword,
                confirmPassword,
                setconfirmPassword,
                profilePhoto,
                setProfilePhoto,
                latitude,
                setLatitude,
                longitude,
                setLongitude,
                relations,
                setRelations,
            }}>
            {props.children}
        </UsersContext.Provider>
    );
}


export default UsersProvider;

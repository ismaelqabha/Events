import React, {useState} from 'react';
import UsersContext from './UsersContext';

const UsersProvider = (props) => {
    const [userId, setuserId] = useState(null);
    const [userInfo, setUserInfo] = useState([]);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userBD, setUserBD] = useState(null);
    const [userGender, setUserGender] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [userCity, setUserCity] = useState(null);
    const [createUserRegion, setCreateUserRegion] = useState(null);
    const [userSpecialDate, setUserSpecialDate] = useState([]);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setconfirmPassword] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);


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
            }}>
            {props.children}
        </UsersContext.Provider>
    );
}


export default UsersProvider;

import {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [userInfo,setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {

    try {
      const response = await fetch('http;//localhost:4000/auth/profile', {
        credentials:'include',
      });

      if (response.ok){
        const userInfoData = await response.json();
        setUserInfo(userInfoData);
      }else if( response.status === 401){
        setUserInfo(null);
      }
      else{
        setUserInfo(null);
      }
    }catch (error){
      setUserInfo(null);
    }
  };

  fetchProfile();
},[]);



  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
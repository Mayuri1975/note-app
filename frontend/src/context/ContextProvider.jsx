import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
 

  useEffect(() =>{
    const verifyUser = async() =>{
      try{
        const res =await axios.get('http://localhost:5000/api/auth/verify',
          {
            headers:{
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            }
          )

        if(res.data.success){
          setUser(res.data.user)
        }else[
          setUser(null)
        ]
      }catch(error){
        console.log(error)
      }
    }
    verifyUser()
  },[])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

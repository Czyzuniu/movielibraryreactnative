import {useAppDispatch} from "../../../../redux/hooks/hooks";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authenticate} from "../../../../redux/slice/session";
import AuthStackNavigation from "../../../../navigation/AuthStackNavigation";
import WaitSpinner from "../../../../base/presentation/components/WaitSpinner";
import {useLazyGetAccountDetailsQuery} from "../../../../redux/services/account";

export default function AuthOrLogin() {
  const [loading, setLoading] = useState(true);
  const [getAccountDetails] = useLazyGetAccountDetailsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreToken = async () => {
      const userToken = await AsyncStorage.getItem('session_id')

      if (userToken) {
        getAccountDetails().unwrap().then((details) => {
          dispatch(authenticate({
            sessionId: userToken,
            username: details.username
          }))
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    };
    restoreToken();
  }, []);

  return (
    loading ? (
      <WaitSpinner isVisible/>
    ) : <AuthStackNavigation/>
  )
}

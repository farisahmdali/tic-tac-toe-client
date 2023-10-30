import { msg } from "@/configs/firbase";
import {  getToken } from "firebase/messaging";
import {useState,useEffect} from "react";

const useFcmToken = () => {
    const [token, setToken] = useState('');
    const [notificationPermissionStatus, setNotificationPermissionStatus] =
      useState('');
  
    useEffect(() => {
      const retrieveToken = async () => {
        try {
          if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  
            // Retrieve the notification permission status
            const permission = await Notification.requestPermission();
            setNotificationPermissionStatus(permission);
  
            // Check if permission is granted before retrieving the token
            if (permission === 'granted') {
              const currentToken = await getToken(msg, {
                vapidKey:
                  process.env.NEXT_PUBLIC_VAPID_KEY,
              });
              if (currentToken) {
                setToken(currentToken);
              } else {
                console.log(
                  'No registration token available. Request permission to generate one.'
                );
              }
            }
          }
        } catch (error) {
          console.log('An error occurred while retrieving token:', error);
        }
      };
  
      retrieveToken();
    }, []);
  
    return { fcmToken: token, notificationPermissionStatus };
  };

export default useFcmToken;

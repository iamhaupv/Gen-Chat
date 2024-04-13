import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GlobalUtils() {
    const signInGoogle = async (auth, provider, navigation) => {
        const userCred = await signInWithPopup(auth, provider);
        const user = userCred.user;
        console.log(userCred);
        
        // Them nguoi dung
        
        if (userCred.user.phoneNumber == null)
            navigation.navigate('Phone Input', { user: {
                displayName: userCred.user.displayName, 
                photoURL: userCred.user.photoURL, 
            } });
      }
}
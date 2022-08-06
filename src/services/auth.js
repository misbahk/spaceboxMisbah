import firebase from '../config/firebaseConfig'
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const socialMediaAuth = () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      localStorage.setItem('user', JSON.stringify(token));


      // console.log(result);
      return token;
      // console.log(user);
      // console.log(token);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      // console.log(error);
      const errorCode = error.code;
      // console.log(errorCode);
      const errorMessage = error.message;
      // console.log(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};

export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const signOut = (auth) => {
  localStorage.removeItem('user');
  localStorage.clear();
}

export default socialMediaAuth;

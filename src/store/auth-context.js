import React from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;
// now we need to do two things with this context component
// - provide it to other components
// - make components capable of consuming it.
//    to make components able to listen to the context change we have two ways -
//    - we can listen by using auth-context consumer
//    - by using reach hook useContext  (more popular)
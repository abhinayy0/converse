import React, { Component, createContext } from 'react';
import { auth } from '../firebase';
import { createOrGetUserProfileDocument } from '../firebase';

const initialUserState = { user: 'abhinay', loading: false };
export const UserContext = createContext(initialUserState);

class UserProvider extends Component {
  state = initialUserState;

  componentDidMount = async () => {
    /* Will be fired whenever user goes from loggedin to log out state or vice versa */
    this.setState({
      // user: { uid: snapshot.id, ...snapshot.data() },
      user: { uid: '1' },

      loading: false,
    });
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // const userRef = await createOrGetUserProfileDocument(userAuth);

        // Attach listener to listen to user changes in firestore
        this.setState({
          // user: { uid: snapshot.id, ...snapshot.data() },
          user: { uid: '1' },

          loading: false,
        });

        // userRef.onSnapshot((snapshot) => {
        //   this.setState({
        //     // user: { uid: snapshot.id, ...snapshot.data() },
        //     user: { uid: "1" },

        //     loading: false,
        //   });
        // });
      }
      this.setState({ user: 'dfdsfdgffgdg', loading: false });
    });
  };

  render() {
    const { user, loading } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;

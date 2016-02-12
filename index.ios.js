/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
var FBSDKLogin = require('react-native-fbsdklogin');
var {
  FBSDKLoginButton,
} = FBSDKLogin;


class chatter extends Component {
  render() {
    return (
      <View style={styles.container}>
             <FBSDKLoginButton
               onLoginFinished={(error, result) => {
                 if (error) {
                   alert('Error logging in.');
                 } else {
                   if (result.isCancelled) {
                     alert('Login cancelled.');
                   } else {
                     alert('Logged in.');
                   }
                 }
               }}
               onLogoutFinished={() => alert('Logged out.')}
               readPermissions={[]}
               publishPermissions={['publish_actions']}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('chatter', () => chatter);

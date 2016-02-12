import FBSDKLogin from 'react-native-fbsdklogin';
import FBSDKCore from 'react-native-fbsdkcore';
import { config } from '../configuration';

const { FBSDKLoginManager} = FBSDKLogin;
const { FBSDKGraphRequest, FBSDKAccessToken } = FBSDKCore;

export function getInfo() {
    return new Promise((resolve, reject) => {
        const fetchFriendsRequest = new FBSDKGraphRequest((error, result) => {
            if (error) {
                console.log(error);
                reject('error making request ' + error);
            } else {
                resolve(result);
            }
        }, config.facebookUserRequest);
        fetchFriendsRequest.start();
    });
}

export function checkAccessToken() {
    return new Promise((resolve, reject) => {
        FBSDKAccessToken.getCurrentAccessToken((result) => {
            if (result === null) {
                reject();
            } else {
                resolve(result);
            }
        });
    });
}

export function facebookLogin() {
    return new Promise((resolve, reject) => {
        FBSDKLoginManager.logInWithReadPermissions(config.facebookReadPermissions, (error, result) => {
            console.log('error, result ', error, result);
            if (error) {
                reject('error: ' + error);
            } else {
                if (result.isCancelled) {
                    reject('error: login cancelled');
                } else {
                    resolve();
                }
            }
        });
    });
}

export function facebookLogout() {
    return new Promise((resolve) => {
        FBSDKLoginManager.logOut();
        return resolve();
    });
}

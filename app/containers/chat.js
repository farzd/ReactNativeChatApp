import React, { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { bindActionCreators } from 'redux';
import { loginActions, chatActions } from '../actions';
import Login from '../components/login/login';
import Chatter from '../components/chatter/chatter';

const { StyleSheet, View, Text, Image, StatusBarIOS, TouchableOpacity, ActivityIndicatorIOS } = React;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#7991E9',
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        color: '#01579B'
    },
    navBar: {
        height: 66,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        paddingTop: 20,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#465C92'
    },
    navTitle: {
        color: '#6683CF',
        fontSize: 20
    },
    navLogout: {
        color: '#fff',
        fontSize: 15,
        paddingRight: 10
    }
});

class Chat extends Component {
    constructor(props) {
        super(props);
        StatusBarIOS.setStyle('light-content');
    }

    componentDidMount() {
        this.props.actions.checkIfLoggedIn();
    }
    render() {
        console.log('props', this.props);
        const { actions, login, profile, chat } = this.props;
        let loginComponent = <Login onPress={() => actions.login()} />;

        if (login.error) {
            loginComponent = <View><Login onPress={() => actions.login()} /><Text style={styles.text}>{login.error}</Text></View>;
        }

        if (login.loading) {
            loginComponent = <ActivityIndicatorIOS size="large" color="#3b5998" />;
        }

        let navBarTitleAlign = { justifyContent: 'center' };
        let wrapperAlign = { alignItems: 'center' };

        if (login.loggedIn) {
            navBarTitleAlign = { justifyContent: 'space-between' };
            wrapperAlign = { alignItems: 'stretch' };
        }

        return (
            <View style={[styles.wrapper, wrapperAlign]}>
                <View style={[styles.navBar, navBarTitleAlign]}>
                    { login.loggedIn ? <Image source={{uri: profile.profileURL}} style={{width: 36, height: 36, borderRadius: 18, marginLeft: 10}}/> : null }
                    <Text style={styles.navTitle}>CHAT</Text>
                    { login.loggedIn ?
                        <TouchableOpacity onPress={() => actions.logout()}>
                            <Text style={styles.navLogout}>logout</Text>
                        </TouchableOpacity> : null}
                </View>
            { login.loggedIn ? <Chatter actions={actions} chat={chat} profile={profile}/> : loginComponent }
            </View>
        );
    }
}

Chat.propTypes = {
    login: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    chat: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        login: state.login,
        profile: state.profile,
        chat: state.chat
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...loginActions, ...chatActions}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

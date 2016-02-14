import React, { Component, PropTypes } from 'react-native';

const { StyleSheet, Text, View, Image } = React;
const styles = StyleSheet.create({
    bubbleWrapper: {
        flexDirection: 'row',
        marginRight: 10,
        marginLeft: 10
    },
    bubbleWrapperLeft: {
        justifyContent: 'flex-start'
    },
    bubbleWrapperRight: {
        justifyContent: 'flex-end'
    },
    speechBubble: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#F974A0',
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    bubbleRight: {
        marginRight: 10
    },
    bubbleLeft: {
        marginLeft: 10
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignSelf: 'flex-start',
        marginTop: 10
    },
    avatarLeft: {

    },
    avatarRight: {

    }
});

export default class Message extends Component {
    render() {
        const { msg, profile } = this.props;
        const dilem = '{<>}';
        const message = msg.split(dilem);
        const userBg = { backgroundColor: message[3] };

        if (profile.id === message[0]) {
            let overflowHack = {};
            if (message[1].length >= 45) {
                overflowHack = {flex: 1};
            }
            return (
                <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
                    <View style={overflowHack}>
                        <Text style={ [styles.speechBubble, userBg, styles.bubbleRight] }>
                            {message[1]}
                        </Text>
                    </View>
                    <Image style={[styles.avatar, styles.avatarRight]} source={{uri: message[2] }} />
                </View>
            );
        }

        let overflowHack = {};
        if (message[1].length >= 45) {
            overflowHack = {flex: 1};
        }
        const req = require('./assets/miranda.jpg');
        const userimg = message[2] ? {uri: message[2]} : req;
        return (
            <View style={[styles.bubbleWrapper, styles.bubbleWrapperLeft]}>
                <Image style={[styles.avatar, styles.avatarLeft ]} source={userimg} />
                <View style={overflowHack}>
                    <Text style={ [styles.speechBubble, userBg, styles.bubbleLeft] }>
                        {message[1]}
                    </Text>
                </View>
            </View>
        );
    }
}

Message.propTypes = {
    msg: PropTypes.string,
    profile: PropTypes.object
};

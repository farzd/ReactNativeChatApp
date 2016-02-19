import React, { Component, PropTypes } from 'react-native';

const { StyleSheet, Text, View, Image, Animated, Easing } = React;
const styles = StyleSheet.create({
    bubbleWrapper: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50
    },
    bubbleWrapperLeft: {
        alignItems: 'flex-start'
    },
    bubbleWrapperRight: {
        alignItems: 'flex-end'
    },
    speechBubble: {
        fontSize: 14,
        color: '#fff',
        borderRadius: 5,
        backgroundColor: '#F974A0',
        padding: 10
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        position: 'absolute',
        top: 0,
    },
    avatarLeft: {
        left: -43
    },
    avatarRight: {
        right: -43
    }
});

const serverImg = require('./assets/anon.jpg');

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speechBubbleScale: new Animated.Value(0)
        };
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const { msg, profile } = this.props;
        const dilem = '{<>}';
        const messageSplit = msg.split(dilem);
        const message = {
            id: messageSplit[0],
            text: messageSplit[1],
            url: messageSplit[2],
            color: messageSplit[3]
        };

        Animated.sequence([
            Animated.timing(this.state.speechBubbleScale, {toValue: 1, duration: 200 })
        ]).start();

        if (profile.id === message.id) {
            return (
                <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
                    <Animated.Text style={[styles.speechBubble, {transform: [{scale: this.state.speechBubbleScale}]}]}>
                        { message.text }
                    </Animated.Text>
                    <Image style={[styles.avatar, styles.avatarRight]} source={{uri: message.url }} />
                </View>
            );
        }

        const speechBubbleColor = { backgroundColor: message.color };
        return (
            <View style={[styles.bubbleWrapper, styles.bubbleWrapperLeft]}>
                <Image style={[styles.avatar, styles.avatarLeft ]} source={message.id === 'server' ? serverImg : {uri: message.url} }/>
                <Text style={[styles.speechBubble, speechBubbleColor]}>
                    { message.text }
                </Text>
            </View>
        );
    }
}

Message.propTypes = {
    msg: PropTypes.string,
    profile: PropTypes.object
};

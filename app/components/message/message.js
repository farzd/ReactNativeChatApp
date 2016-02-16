import React, { Component, PropTypes } from 'react-native';

const { StyleSheet, Text, View, Image, Animated, Easing } = React;
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
        marginBottom: 10
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
    }
});

const serverImg = require('./assets/anon.jpg');

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speechBubbleScale: new Animated.Value(0),
        };
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

        Animated.timing(this.state.speechBubbleScale, {toValue: 1, duration: 200, easing: Easing.out(Easing.quad) }).start();

        if (profile.id === message.id) {
            let overflowHack = {};
            if (message.text.length >= 45) {
                overflowHack = { flex: 1 };
            }
            return (
                <View style={[styles.bubbleWrapper, styles.bubbleWrapperRight]}>
                    <View style={overflowHack}>
                        <Animated.Text style={[styles.speechBubble, styles.bubbleRight, {transform: [{scale: this.state.speechBubbleScale}]}]}>
                            { message.text }
                        </Animated.Text>
                    </View>
                    <Image style={[styles.avatar, styles.avatarRight]} source={{uri: message.url }} />
                </View>
            );
        }

        let overflowHack = {};
        if (message.text.length >= 45) {
            overflowHack = { flex: 1 };
        }
        const speechBubbleColor = { backgroundColor: message.color };
        return (
            <View style={[styles.bubbleWrapper, styles.bubbleWrapperLeft]}>
                <Image style={[styles.avatar, styles.avatarLeft ]} source={message.id === 'server' ? serverImg : {uri: message.url} }/>
                <View style={overflowHack}>
                    <Text style={[styles.speechBubble, speechBubbleColor, styles.bubbleLeft]}>
                        { message.text }
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

import React, { Component, PropTypes } from 'react-native';
import InputField from '../inputfield/inputfield';
import Message from '../message/message';
import Dimensions from 'Dimensions';
const windowHeight = Dimensions.get('window').height - 66;
const scrollHeight = windowHeight - 50;

const { StyleSheet, View, ScrollView, DeviceEventEmitter, Animated } = React;
const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        marginTop: 66
    },
    scrollWrapper: {
        marginBottom: 42,
    },
    scrollContainer: {
        flexDirection: 'column',
    },
    text: {
        fontSize: 20,
        color: '#01579B'
    }
});

export default class Chatter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibleHeight: new Animated.Value(windowHeight),
        };
    }

    componentDidMount() {
        const { actions, profile } = this.props;
        console.log('connecting');
        actions.connectChat();

        setTimeout(function timout() {
            // ping to say that you've join the chat room
            actions.sendMessage(profile.id, profile.name, 'serverJOIN');
        }, 10);

        DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    componentWillUnmount() {
        this.props.actions.sendMessage(this.props.profile.id, this.props.profile.name, 'serverLEAVE');
    }

    keyboardWillShow(e) {
        const newSize = windowHeight - e.endCoordinates.height;
        Animated.timing(this.state.visibleHeight, {toValue: newSize, duration: 200}).start();
    }

    keyboardWillHide() {
        Animated.timing(this.state.visibleHeight, {toValue: windowHeight, duration: 10}).start();
    }

    updateScrollView(x, y) {
        if (y > scrollHeight) {
            this.refs.scroller.scrollTo(y - scrollHeight);
        }
    }

    render() {
        return (
            <Animated.View style={[styles.wrapper, {height: this.state.visibleHeight}]}>
                <ScrollView ref="scroller" style={styles.scrollWrapper} contentContainerStyle={styles.scrollContainer} onContentSizeChange={this.updateScrollView.bind(this)}>
                    {this.props.chat.map((msg, i) => {
                        return <Message msg={msg} profile={this.props.profile} key={i}/>;
                    })}
                </ScrollView>
                <InputField actions={this.props.actions} profile={this.props.profile} />
            </Animated.View>
        );
    }
}


Chatter.propTypes = {
    actions: PropTypes.object.isRequired,
    chat: PropTypes.array.isRequired,
    profile: PropTypes.object
};

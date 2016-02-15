import React, { Component, PropTypes } from 'react-native';
import InputField from '../inputfield/inputfield';
import Message from '../message/message';
import Dimensions from 'Dimensions';
const windowHeight = Dimensions.get('window').height - 66;
const scrollHeight = windowHeight - 50;

const { StyleSheet, View, ScrollView, DeviceEventEmitter } = React;
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
            visibleHeight: windowHeight
        };
    }

    componentDidMount() {
        this.props.actions.connectChat();
        DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
    }

    keyboardWillShow(e) {
        const newSize = windowHeight - e.endCoordinates.height;
        this.setState({visibleHeight: newSize});
    }

    keyboardWillHide() {
        this.setState({visibleHeight: windowHeight});
    }

    updateScrollView(x, y) {
        if (y > scrollHeight) {
            this.refs.scroller.scrollTo(y - scrollHeight);
        }
    }

    render() {
        return (
            <View style={[styles.wrapper, {height: this.state.visibleHeight}]}>
                <ScrollView ref="scroller" style={styles.scrollWrapper} contentContainerStyle={styles.scrollContainer} onContentSizeChange={this.updateScrollView.bind(this)}>
                    {this.props.chat.map((msg, i) => {
                        return <Message msg={msg} profile={this.props.profile} key={i}/>;
                    })}
                </ScrollView>
                <InputField actions={this.props.actions} profile={this.props.profile} />
            </View>
        );
    }
}


Chatter.propTypes = {
    actions: PropTypes.object.isRequired,
    chat: PropTypes.array.isRequired,
    profile: PropTypes.object
};

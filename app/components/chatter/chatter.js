import React, { Component, PropTypes } from 'react-native';
import InputField from '../inputfield/inputfield';
import Message from '../message/message';

const { StyleSheet, View } = React;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 66,
        flexDirection: 'column',
        position: 'relative'
    },
    text: {
        fontSize: 20,
        color: '#01579B'
    }
});

export default class Chatter extends Component {
    componentDidMount() {
        this.props.actions.connectChat();
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {this.props.chat.map((msg, i) => {
                    return <Message msg={msg} key={i}/>;
                })}
                <InputField actions={this.props.actions}/>
            </View>
        );
    }
}


Chatter.propTypes = {
    actions: PropTypes.object.isRequired,
    chat: PropTypes.array.isRequired
};

import React, { Component, PropTypes } from 'react-native';

const { StyleSheet, Text } = React;
const styles = StyleSheet.create({
    speechBubble: {
        flexDirection: 'column',
        fontSize: 14,
        color: '#fff',
        backgroundColor: '#F47AB1',
        borderRadius: 5,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10
    },
});

export default class Message extends Component {
    render() {
        return (
            <Text style={styles.speechBubble}>
                {this.props.msg}
            </Text>
        );
    }
}

Message.propTypes = {
    msg: PropTypes.text.isRequired
};

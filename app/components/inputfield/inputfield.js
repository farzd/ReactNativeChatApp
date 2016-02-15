import React, { Component, PropTypes } from 'react-native';
const { StyleSheet, View, TextInput } = React;

const styles = StyleSheet.create({
    textWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 2
    },
    textInput: {
        height: 40,
        backgroundColor: '#000',
        opacity: 0.3,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#fff'
    }
});

export default class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        return (
            <View style={styles.textWrapper}>
                <TextInput style={styles.textInput}
                    onChangeText={(text) => this.setState({text})}
                    onSubmitEditing={() => {
                        this.props.actions.sendMessage(this.props.profile.id, this.props.profile.name, this.state.text, this.props.profile.profileURL);
                        this.setState({text: ''});
                    }
                    }
                    value={this.state.text} />
            </View>
        );
    }
}

InputField.propTypes = {
    actions: PropTypes.object.isRequired,
    profile: PropTypes.object
};

import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity
} from 'react-native';

import { saveDeckTitle } from '../../utils/api.js';

class NewDeckForm extends Component {

    state = {
        title: ''
    }
    submit = () => {
        console.log("form submited");
        saveDeckTitle(this.state.title).then(() => {
            console.log("saved");
        })
        .catch(err => {
            console.log("Error: ",err);
        })

    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >
                <Text>Set the title of the deck</Text>
                <TextInput
                    style={{height: 40, width: 100}}
                    onChangeText={(text) => this.setState({...this.state, title:text})}
                    value={this.state.title}
                />
                <TouchableOpacity onPress={this.submit}>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NewDeckForm;
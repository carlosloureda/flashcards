import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity,
    Keyboard
} from 'react-native';
import DeckView from './DeckView';
import { saveDeckTitle } from '../utils/api.js';
import { NavigationActions } from 'react-navigation'

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'Home'}),
//     NavigationActions.navigate({ routeName: 'NewDeck'}),
//     NavigationActions.navigate({ routeName: 'DeckView'})
//   ]
// })

class NewDeckView extends Component {

    state = {
        title: ''
    }

    submit = () => {
        const { navigate } = this.props.navigation;
        const navigation  = this.props.navigation;
        console.log("navigate: ", navigate);
        Keyboard.dismiss();
        saveDeckTitle(this.state.title).then(() => {
            console.log("saved: ", this.state.title);
            // navigation.dispatch(resetAction);
            //TODO: reset history or remove this view from stack
            navigate('DeckView', {title: this.state.title})
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

export default NewDeckView;
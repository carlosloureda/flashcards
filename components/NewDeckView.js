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

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'New deck',
            headerTintColor: '#754B8E',
            headerStyle: { backgroundColor: '#522B73' }
        }
    }

    state = {
        title: ''
    }

    submit = () => {
        const { navigate } = this.props.navigation;
        const navigation  = this.props.navigation;
        Keyboard.dismiss();
        saveDeckTitle(this.state.title).then(() => {
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
                <Text style={styles.text} >Set the title of the deck</Text>
                <TextInput
                    style={{height: 40, width: 100}}
                    onChangeText={(text) => this.setState({...this.state, title:text})}
                    value={this.state.title}
                />
                <TouchableOpacity onPress={this.submit}>
                    <Text style={styles.btn} >SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#754B8E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFEAA'
    },
    btn: {
        color: '#12073B'
    }

});

export default NewDeckView;
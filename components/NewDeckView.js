import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity,
    Keyboard, Button, View
} from 'react-native';
import DeckView from './DeckView';
import { saveDeckTitle } from '../utils/api.js';
import { NavigationActions } from 'react-navigation'
import { primaryColor, titleColor, primaryButton } from '../utils/colors';
import { connect } from 'react-redux'
import { addNewDeck } from '../actions/index'

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
        console.log("submit done: ", this.state.title);
        const { replace } = this.props.navigation;
        Keyboard.dismiss();
        if (this.props && this.props.addNewDeck) {
            this.props.addNewDeck(this.state.title).then(() => {
                replace('DeckView', {title: this.state.title})
            })
            .catch(err => {
                console.log("Error: ",err);
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >
                <View style={styles.formGroup}>
                    <Text style={styles.text} >Set the title of the deck</Text>
                    <TextInput
                        style={{height: 100, width: 250}}
                        multiline = {true}
                        numberOfLines = {2}
                        onChangeText={(text) => this.setState({...this.state, title:text})}
                        value={this.state.title}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <Button
                        title="Create deck"
                        color={primaryButton}
                        onPress={this.submit}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: titleColor
    },
    formGroup: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGroup: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        height: 100
    },

});

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addNewDeck: (title) => dispatch(addNewDeck(title)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
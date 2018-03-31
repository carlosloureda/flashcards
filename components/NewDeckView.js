import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity,
    Keyboard, Button
} from 'react-native';
import DeckView from './DeckView';
import { saveDeckTitle } from '../utils/api.js';
import { NavigationActions } from 'react-navigation'
import { primaryColor, titleColor } from '../utils/colors';
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
                <Text style={styles.text} >Set the title of the deck</Text>
                <TextInput
                    style={{height: 40, width: 100}}
                    onChangeText={(text) => this.setState({...this.state, title:text})}
                    value={this.state.title}
                />
                {/* <TouchableOpacity onPress={this.submit}>
                    <Text style={styles.btn} >SUBMIT</Text>
                </TouchableOpacity> */}
                <Button
                    title="Submit"
                    color='#522B73'
                    // style={styles.startQuiz}
                    onPress={this.submit}
                />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: titleColor
    },
    btn: {
        color: primaryColor
    }

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
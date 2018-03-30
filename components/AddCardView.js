import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity, Keyboard
} from 'react-native';
import { addCardToDeck } from '../utils/api.js';
import PropTypes from 'prop-types';

class AddCardView extends Component {

    state = {
        card: {
            question: '',
            answer: ''
        }
    }

    componentDidMount = () => {
    }

    onInputChange = (field, value) => {
        this.setState({
            ...this.state,
            card: {
                ...this.state.card,
                [field]: value
            }
        })
    }

    onAddCardSubmit = () => {
        const { navigate } = this.props.navigation;
        const { title } = this.props.navigation.state.params;
        Keyboard.dismiss()
        const card = {
            question: this.state.card.question,
            answer: this.state.card.answer
        }
        addCardToDeck(title, card)
        .then((deck) => {
            console.log("sucess saving card")
            //TODO: reset history or remove this view from stack
            navigate('DeckView', {title: title})
        })
        .catch((err) => console.log("error: ", err))
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >
                <Text>Question</Text>
                <TextInput
                    style={{height: 40, width: 100}}
                    onChangeText={(text) => this.onInputChange('question', text)}
                    value={this.state.card.question}
                />
                <Text>Answer</Text>
                <TextInput
                    style={{height: 40, width: 100}}
                    onChangeText={(text) => this.onInputChange('answer', text)}
                    value={this.state.card.answer}
                />
                <TouchableOpacity onPress={this.onAddCardSubmit}>
                    <Text>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

AddCardView.propTypes = {
    // title: PropTypes.string.isRequired,
    // onNewCardAdded: PropTypes.function.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddCardView;
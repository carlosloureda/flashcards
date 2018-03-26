import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, TouchableOpacity
} from 'react-native';
import { addCardToDeck } from '../../utils/api.js';
import PropTypes from 'prop-types';

class AddCardForm extends Component {

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
        console.log("onAddCardSubmit");
        const card = {
            question: this.state.card.question,
            answer: this.state.card.answer
        }
        console.log("**card is: ", card);
        addCardToDeck(this.props.title, card)
        .then((deck) => {
            console.log("sucess saving card")
            this.props.onNewCardAdded(deck);
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

AddCardForm.propTypes = {
    title: PropTypes.string.isRequired,
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

export default AddCardForm;
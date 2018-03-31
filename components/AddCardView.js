import React, { Component } from 'react';
import {
    KeyboardAvoidingView, Text, TextInput,
    StyleSheet, SubmitBtn, Button, Keyboard, View
} from 'react-native';
import { addCardToDeck } from '../utils/api.js';
import PropTypes from 'prop-types';
import { primaryButton, primaryColor, titleColor } from '../utils/colors.js';

class AddCardView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Add new card`,
            headerTintColor: '#754B8E',
            headerStyle: { backgroundColor: '#522B73' }
        }
    }

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
        const { goBack } = this.props.navigation;
        const { title } = this.props.navigation.state.params;
        Keyboard.dismiss()
        const card = {
            question: this.state.card.question,
            answer: this.state.card.answer
        }
        addCardToDeck(title, card)
        .then((deck) => {
            console.log("sucess saving card")
            goBack()
        })
        .catch((err) => console.log("error: ", err))
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}
            >
                <View style={styles.formGroup}>
                    <Text style={styles.text}>Question</Text>
                    <TextInput
                        multiline = {true}
                        numberOfLines = {4}
                        style={{height: 100, width: 250}}
                        onChangeText={(text) => this.onInputChange('question', text)}
                        value={this.state.card.question}
                        />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.text}>Answer</Text>
                    <TextInput
                        multiline = {true}
                        numberOfLines = {4}
                        style={{height: 100, width: 250}}
                        onChangeText={(text) => this.onInputChange('answer', text)}
                        value={this.state.card.answer}
                    />
                </View>
                <View
                    style={styles.buttonGroup}
                >
                    <Button
                        color={primaryButton}
                        onPress={this.onAddCardSubmit}
                        title="Submit"
                    />
                </View>
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
        justifyContent: 'center',
        backgroundColor: primaryColor,
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
    },
});

export default AddCardView;
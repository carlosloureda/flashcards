import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers.js';
import {
    primaryColor, secondaryColor,
    titleColor, textColor, primaryButton
} from '../utils/colors.js';

const Progress = ({total, answered}) => {
    return (
        <Text style={styles.progress}>{answered + 1}/{total}</Text>
    )
}

const WRONG_ANSWER = 'WRONG_ANSWER';
const CORRECT_ANSWER = 'CORRECT_ANSWER';

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Quiz: ${navigation.state.params.deck.title}`,
            headerTintColor: '#754B8E',
            headerStyle: { backgroundColor: '#522B73' }
        }
    }

    state = {
        questions: [],
        questions_answered: 0,
        correct_answers: 0,
        flip_card: false,
        actual_question_index: 0
    }

    componentDidMount = () => {
        const { deck } = this.props.navigation.state.params;
        this.setState({
            ...this.state,
            questions: deck.questions
        });
    }

    flipCard = () => {
        this.setState({
            ...this.state,
            flip_card: true
        })
    }

    sendAnswer = (index, type) => {
        const final_question = (index == this.state.questions.length) ? true : false;
        this.setState({
            ...this.state,
            actual_question_index: ! final_question ? this.state.actual_question_index + 1 : this.state.actual_question_index,
            correct_answers: (type == CORRECT_ANSWER) ? this.state.correct_answers + 1 : this.state.correct_answers,
            questions_answered: this.state.questions_answered + 1,
            flip_card: false
        }, () => {
            if (this.state.questions.length === this.state.questions_answered) {
                clearLocalNotification().then(setLocalNotification);
            }
        })
    }

    finalScore = () => {
        let final_score = 100 * (this.state.correct_answers / this.state.questions.length);
        final_score = +final_score.toFixed(2);
        return final_score;
    }

    render() {
        const { navigate, popToTop } = this.props.navigation;

        const { questions, questions_answered, actual_question_index } = this.state;
        const total_questions = questions.length ;

        if (questions_answered === total_questions) {
            const finalScore = this.finalScore();
            return (
                <View style={styles.finalView}>
                    <View style={styles.finalScore}>
                        <Text style={styles.finalTextHeader} >
                            {finalScore >= 50 ? 'Congrats!' : ':) Keep studying'}
                        </Text>
                        <Text style={styles.finalTextResult} >Final Score: {finalScore}% </Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button
                            title="Home"
                            color={primaryButton}
                            onPress={() => popToTop()}
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    {questions_answered < total_questions &&
                        <Progress
                            total={total_questions} answered={questions_answered}
                        />
                    }

                    {!!total_questions && ! this.state.flip_card && questions_answered < total_questions &&
                        <View style={styles.content}>
                            <Text style={styles.question}>{questions[actual_question_index].question}</Text>
                            <View style={styles.buttonGroup}>
                                <Button
                                    title="Show answer"
                                    color={primaryButton}
                                    onPress={() => this.flipCard()}
                                    />
                            </View>
                        </View>
                    }

                    {this.state.flip_card && total_questions && questions_answered < total_questions &&
                        <View style={styles.content}>
                            <Text style={styles.answer}>{questions[0].answer}</Text>
                            <View style={styles.buttonGroup}>
                                <Button
                                    title="Incorrect"
                                    color={'red'}
                                    onPress={() => this.sendAnswer(actual_question_index, WRONG_ANSWER)}
                                    />
                                <Button
                                    title="Correct"
                                    color={'green'}
                                    onPress={() => this.sendAnswer(actual_question_index, CORRECT_ANSWER)}
                                />
                            </View>
                        </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: primaryColor,
    },
    progress: {
        flex: 1,
        alignSelf: 'flex-start',
        color: secondaryColor,
        padding: 5,
        fontSize: 15
    },
    content: {
        flex: 3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    finalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: primaryColor,
    },
    finalScore: {
        paddingTop: 200,
        flex:1
    },
    finalTextHeader: {
        fontSize: 20,
        textAlign: 'center'
    },
    finalTextResult: {
        fontSize: 30,
        textAlign: 'center'
    },
    question: {
        fontSize: 30,
        color: titleColor
    },
    answer: {
        fontSize: 20,
        color: textColor
    },
    buttonGroup: {
        alignSelf: 'stretch',
    }
});

export default QuizView;
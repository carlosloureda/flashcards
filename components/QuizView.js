import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers.js';

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
        return (
            // <View style={styles.wrapper}>
                <View style={styles.container}>
                    {questions_answered < total_questions &&
                        <Progress
                            total={total_questions} answered={questions_answered}
                        />
                    }

                    {!!total_questions && ! this.state.flip_card && questions_answered < total_questions &&
                        <View style={styles.content}>
                            <Text style={styles.question}>{questions[actual_question_index].question}</Text>
                            <View style={styles.button}>
                                <Button
                                    title="Show answer"
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
                                    onPress={() => this.sendAnswer(actual_question_index, WRONG_ANSWER)}
                                />
                                <Button
                                    title="Correct"
                                    onPress={() => this.sendAnswer(actual_question_index, CORRECT_ANSWER)}
                                />
                            </View>
                        </View>
                    }

                    {questions_answered === total_questions &&
                        <View>
                            <Text>Final Score: {this.finalScore()}%</Text>
                            <Button
                                title="Home"
                                onPress={() => popToTop()}
                            />
                        </View>
                    }
                </View>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#877CB0',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#754B8E',
        margin: 10,
        borderRadius: 10
    },
    content: {
        justifyContent: 'space-between',
        flex: 3
    },
    progress: {
        flex: 1,
        alignSelf: 'flex-start',
        color: '#BBA7CD',
        padding: 5,
        fontSize: 15
    },
    question: {
        fontSize: 30,
        color: '#FFFEAA'
    },
    answer: {
        fontSize: 20,
        color: '#554600'
    },
    button: {
        alignSelf: 'stretch',
    },
    buttonGroup: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-start'
    }
});

export default QuizView;
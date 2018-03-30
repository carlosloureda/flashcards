import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { getDeck } from '../utils/api.js';
import { cardsInDeck } from '../utils/model.js';
import AddCardView from './AddCardView';

const Progress = ({total, answered}) => {
    return (
        <Text>{answered ? answered : 0}/{total}</Text>
    )
}

const WRONG_ANSWER = 'WRONG_ANSWER';
const CORRECT_ANSWER = 'CORRECT_ANSWER';

class QuizView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Quiz: ${navigation.state.params.title}`
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
        }, () => {console.log("state: ", this.state);})
    }

    finalScore = () => {
        let final_score = 100 * (this.state.correct_answers / this.state.questions.length);
        final_score = +final_score.toFixed(2);
        return final_score;
    }

    render() {
        const { navigate } = this.props.navigation;
        const { questions, questions_answered, actual_question_index } = this.state;
        console.log("questions: ", questions);
        // console.log("question: ", questions[0]['question']);
        console.log("questions: ", questions);
        for (q of questions) {
            console.log("q: ", q.question);
            console.log("a: ", q.answer);
        }
        questions.map(q => {
            console.log("->q: ", q.question);
            console.log("->a: ", q.answer);
        })
        if (questions.length) {
            console.log("questions[0]: ", questions[0]);
            console.log("questions[0].question: ", questions[0].question);

        }
        // const question = JSON.parse(questions[0])
        // const values = Object.values(questions[0])
        // console.log("values: ", values);
        // console.log("questions[0].question: ", Object.values(questions[0])[0].question);
        const total_questions = questions.length ;
        return (
            <View style={styles.container}>
                <Progress
                    total={total_questions} answered={questions_answered}
                />

                {!!total_questions && ! this.state.flip_card && questions_answered < total_questions &&
                    <View>
                        <Text>{questions[actual_question_index].question}</Text>
                        <Button
                            title="Show answer"
                            onPress={() => this.flipCard()}
                        />
                    </View>
                }

                {this.state.flip_card && total_questions && questions_answered < total_questions &&
                    <View>
                        <Text>{questions[0].answer}</Text>
                        <Button
                            title="Incorrect"
                            onPress={() => this.sendAnswer(actual_question_index, WRONG_ANSWER)}
                        />
                        <Button
                            title="Correct"
                            onPress={() => this.sendAnswer(actual_question_index, CORRECT_ANSWER)}
                        />
                    </View>
                }

                {questions_answered === total_questions &&
                    <Text>Final Score: {this.finalScore()}%</Text>
                }
            </View>
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

export default QuizView;
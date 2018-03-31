import React, { Component } from 'react'
import { StyleSheet, Text, View, AppRegistry, Button } from 'react-native'

class FlexboxExamples extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.progress}>
                <Text>2/3</Text>
            </View>
            <View style={styles.content}>
                {/* <View style={styles.question}>
                    <Text style={{fontSize: 30}} >The question is</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        title="See answer"
                        onPress={() => {}}
                    />
                </View> */}
                <Text>answer</Text>
                <View style={styles.buttonGroup}>
                    <Button
                        title="Incorrect"
                        onPress={() => {}}
                    />
                    <Button
                        title="Correct"
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // alignItems: 'space-between',
        justifyContent: 'space-between',
        // alignItems: 'stretch',
        backgroundColor: 'green',
        margin: 10,
        borderRadius: 10
    },
    buttonGroup: {
        flex:1,
        justifyContent: 'flex-end',
        alignContent: 'flex-start',
        // alignSelf: 'flex-end',
        // justifyContent: 'flex-start',
        backgroundColor: 'yellow'
    },
    content: {
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        flex: 3
    },
    progress: {
        flex: 1,
        // justifyContent: 'center',
        alignSelf: 'flex-start',
        // backgroundColor: 'yellow'
    },
    question: {
        // fontSize: 100
        // flex: 1,

        // alignSelf: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
    button: {
        alignSelf: 'stretch',
        // flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
})

export default FlexboxExamples;
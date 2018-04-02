import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
const NOTIFICATION_KEY = 'Flashcards:notifications'

export const cardsInDeck = (deck) => {
    return deck && deck.questions ? deck.questions.length :  0;
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
      title: 'Do some trainging today!',
      body: "👋 don't forget to exercise with some cards today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(15)

                    tomorrow.setMinutes(25)
                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                        time: tomorrow,
                        repeat: 'day',
                        }
                    )

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}
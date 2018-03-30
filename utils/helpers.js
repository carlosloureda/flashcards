import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
const NOTIFICATION_KEY = 'Flashcards:notifications'

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
            console.log("inside setLocalNotification response");
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(15)

                    tomorrow.setMinutes(00)
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
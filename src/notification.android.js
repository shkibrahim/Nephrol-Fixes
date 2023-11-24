import PushNotification  from "react-native-push-notification";

PushNotification.createChannel(
    {
      channelId: "1234", // Replace with your desired channel ID
      channelName: "Default Channel",
    }
  );
const showNotification=(title,message)=>{

PushNotification.localNotification({
    channelId:"1234",
    title:"hy",
    message:"hello", // (required)

})
}

const notificationDate = new Date(Date.now() + 5 * 1000);
    console.log("Notification Date:", notificationDate);

const showTimeNotification=(title,message)=>{
    PushNotification.localNotificationSchedule({
        channelId:"1234",
        title:title,
        message:message, // (required)
        date: notificationDate
    })
    }
    const cancelAllNotication=()=>{
        PushNotification.cancelAllNotications();
    }
export {showNotification,showTimeNotification,cancelAllNotication}
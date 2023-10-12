const fs = require("fs");

const webPush = require("web-push");

const PushNotification = (function () {
    webPush.setVapidDetails(
        "mailto:andrewpradeep13@gmail.com",
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );

    const saveSubscriptionDetail = async (detail) => {
        return new Promise((resolve, reject) => {
            const detailString = JSON.stringify(detail);
            fs.writeFile(
                `${__dirname}/../../data/subscription.json`,
                detailString,
                "utf8",
                (error) => {
                    if (error) {
                        reject(error);
                        console.error(error);
                        return;
                    }
                    console.log("Subscription Details Saved");
                    resolve();
                }
            );
        });
    };

    const getSubscriptionDetail = async () => {
        return new Promise((resolve, reject) => {
            fs.readFile(
                `${__dirname}/../../data/subscription.json`,
                "utf8",
                (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    console.log("file data", JSON.parse(data));
                    resolve(JSON.parse(data));
                }
            );
        });
    };

    const sendPushNotification = async (data) => {
        const subscriptionDetail = await getSubscriptionDetail();

        const notificationPayload = {
            notification: {
                title: data.title,
                body: data.body,
            },
        };

        const response = await webPush.sendNotification(
            subscriptionDetail,
            JSON.stringify(notificationPayload)
        );
        return response;
    };
    return {
        saveSubscriptionDetail,
        getSubscriptionDetail,
        sendPushNotification,
    };
})();

module.exports = PushNotification;

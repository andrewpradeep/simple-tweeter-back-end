const express = require("express");

const router = express.Router();
const PushNotification = require("../../utils/pushNotification");

router.post("/pushnotification/subscription", async (req, res, next) => {
    try {
        await PushNotification.saveSubscriptionDetail(req.body);

        const details = await PushNotification.getSubscriptionDetail();

        res.status(200).json(details);
    } catch (error) {
        console.error(error);
    }
});

router.post("/pushnotification/send", async (req, res, next) => {
    try {
        const details = await PushNotification.sendPushNotification(req.body);
        res.status(200).json(details);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;

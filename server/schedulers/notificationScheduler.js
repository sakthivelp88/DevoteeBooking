import cron from "node-cron";

import {
    processScheduledNotifications,
} from "#services/admin/adminNotificationService.js";

export const startNotificationScheduler = () => {
    cron.schedule("* * * * *", async () => {
        try {
            console.log(
                "[Notification Scheduler] Checking scheduled notifications..."
            );
            const result =
                await processScheduledNotifications();

            if (result.processed > 0) {
                console.log(
                    `[Notification Scheduler] Processed ${result.processed} notification(s).`
                );
            }
        } catch (error) {
            console.error(
                "[Notification Scheduler] Error:",
                error.message
            );
        }
    });
};
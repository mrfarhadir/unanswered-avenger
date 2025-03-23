import schedule from "node-schedule";
import { runAvenger } from "./core/avenger";
import { config } from "./config";

console.log("🛡️ Unanswered Avenger started...");

schedule.scheduleJob(`*/${config.checkInterval / 60000} * * * *`, runAvenger);

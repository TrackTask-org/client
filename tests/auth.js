import { TrackTask } from "tracktask-client"

const username = "" // Enter username here
const password = "" // Enter password here

const tt = new TrackTask(username, password);
await tt.login();
console.log(await tt.getUser());
console.log(await tt.getTasks());
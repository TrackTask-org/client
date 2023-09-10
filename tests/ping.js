import { TrackTask } from "tracktask-client"

const tt = new TrackTask(); // Authentication is not required for this endpoint
console.log(await tt.ping());
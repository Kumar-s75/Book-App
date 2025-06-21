import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import redis from "@/database/redis";

const ratelimit = new Ratelimit(config:{
  redis,
  limiter: Ratelimit.fixedWindow(10, "10 s"),
  analytics: true,

  prefix: "@upstash/ratelimit",
});

 
// const identifier = "api";
// const { success } = await ratelimit.limit(identifier);

// if (!success) {
//   return "Unable to process at this time";
// }
// doExpensiveCalculation();
// return "Here you go!";

export default ratelimit;
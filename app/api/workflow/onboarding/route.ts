import { serve } from "@upstash/workflow/nextjs";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import {eq} from "drizzle-orm";

type UserState='non-active'|'active'
// Type-safety for starting our workflow
interface InitialData {
  userId: string
  email: string
  fullName: string
}


const ONE_DAY_IN_MS=24*60*60*1000;
const THREE_DAYS_IN_MS=3*ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS=30*ONE_DAY_IN_MS;

const getUserState=async(email:string):Promise<UserState>=>{
   const user=await db
        .select()
        .from(users)
        .where(eq(users.id,session?.user?.id))
        .limit(1);

        if(user.length===0) return 'non-active';

        const lastActivityDate=new (user[0].lastActivityDate!);
        const now=new Date();
        const timeDifference=now.getTime()-lastActivityDate.getTime();

        if(timeDifference>THREE_DAYS_IN_MS && timeDifference<=THIRTY_DAYS_IN_MS){
            return "non-active";
        }
        return "active";
};


export const { POST } = serve<InitialData>(async (context) => {
  const { userId, email, fullName   } = context.requestPayload;

  // Step 1: Send welcome email
  await context.run("new-signup ", async () => {
    await sendEmail(email, 
      "Welcome to our service!",
    `Welcome ${fullName}! `);
  });

  // Step 2: Wait for 3 days (in seconds)
  await context.sleep("sleep-until-follow-up", 60 * 60 * 24 * 3);

  // Step 3: AI-generate personalized follow-up message
  const { body: aiResponse } = await context.api.openai.call(
    "generate-personalized-message",
    {
      token: "<OPENAI_API_KEY>",
      operation: "chat.completions.create",
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an assistant creating personalized follow-up messages." },
          { role: "user", content: `Create a short, friendly follow-up message for ${name} who joined our service 3 days ago.` }
        ]
      },
    }
  );

  const personalizedMessage = aiResponse.choices[0].message.content;

  // Step 4: Send personalized follow-up email
  await context.run("send-follow-up-email", async () => {
    await sendEmail(email, personalizedMessage);
  });
});
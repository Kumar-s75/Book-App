import {Client as WorkflowClient} from '@upstash/workflow'
import config from '@/lib/config'


export const workflowClient=new WorkflowClient({
   baseUrl:config.env.upstash.qstashUrl,
   token:config.env.upstash.qstashToken,
})

import { Client, resend } from "@upstash/qstash";
const client = new Client({ token: "<QSTASH_TOKEN>" });

await client.publishJSON({
  api: {
    name: "email",
    provider: resend({ token: "<RESEND_TOKEN>" }),
  },
  body: {
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Hello World",
    html: "<p>It works!</p>",
  },
});
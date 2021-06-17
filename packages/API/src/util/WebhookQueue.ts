import executeWebhook, { EmbedOptions } from '@menhera-tools/execute-webhook';
import { StatusRole } from './constants';

let queue: Array<EmbedOptions> = [];
let debounce = false;
let timeout: ReturnType<typeof setTimeout>;

async function sendWebhook(arr: Array<EmbedOptions>): Promise<void> {
  if (arr.length <= 10) {
    await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
      content: StatusRole,
      embeds: queue,
    });
  } else {
    const firstArray = arr.slice(0, 10);
    const secondArray = arr.slice(11, arr.length - 1);
    await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
      content: StatusRole,
      embeds: firstArray,
    });
    await executeWebhook(process.env.WEBHOOK_ID_STATUS, process.env.WEBHOOK_TOKEN_STATUS, {
      content: StatusRole,
      embeds: secondArray,
    });
  }
}

async function startCounting() {
  if (!debounce) {
    debounce = true;
    timeout = setTimeout(() => {
      sendWebhook(queue);
      debounce = false;
      queue = [];
    }, 2000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      sendWebhook(queue);
      debounce = false;
      queue = [];
    }, 2000);
  }
}

export default function Queue(embed: EmbedOptions): void {
  queue.push(embed);
  startCounting();
}

import {DiscordFile, ExecuteWebhookData, WebhookOptions} from './types';
import {APIWebhook} from 'discord-api-types/v10';
import phin from 'phin';
import FormData from 'form-data';

export class Webhook {
  /* The default payload for the webhook */
  defaultPayload?: {};
  /**
   * Create a new Webhook instance
   * @param {WebhookOptions} options
   */
  constructor(private options: WebhookOptions) {}

  /**
   * Get webhook information
   * @returns {APIWebhook}
   */
  public async get(): Promise<APIWebhook> {
    const data: APIWebhook = await this.request<APIWebhook>(this.options.url);
    return data;
  }

  /**
   * Set the default username for the webhook
   * @param {string} username
   */
  public setUsername(username: string) {
    this.defaultPayload = {
      ...this.defaultPayload,
      username,
    };
  }

  /**
   * Set the default avatar for the webhook
   * @param {string} avatar
   */
  public setAvatar(avatar: string) {
    this.defaultPayload = {
      ...this.defaultPayload,
      avatar_url: avatar,
    };
  }

  /**
   * Modify the webhook
   * @param {WebhookOptions} options
   */
  public async modify(options: WebhookOptions) {
    return this.request(this.options.url, 'PATCH', options);
  }

  /**
   * Delete the webhook
   */
  public async delete() {
    return this.request(this.options.url, 'DELETE');
  }

  /**
   * Send a message to the webhook
   * @param {ExecuteWebhookData} data
   */
  public async execute(data: ExecuteWebhookData) {
    return this.defaultPayload
      ? this.request(
          this.options.url,
          'POST',
          {
            ...this.defaultPayload,
            ...data,
          },
          data.files,
        )
      : this.request(this.options.url, 'POST', data, data.files);
  }

  /**
   * Make a request to the webhook
   * @param {string} url
   * @param {string} method
   * @param {any} postData
   * @param {DiscordFile[] | DiscordFile} file
   * @returns {Promise<any>}
   * @private
   */
  private async request<T = any>(
    url: string,
    method?: string,
    postData?: any,
    file?: DiscordFile | DiscordFile[],
  ): Promise<T> {
    if (!method) method = 'GET';
    if (!postData) postData = null;
    if (typeof postData === 'object') postData = JSON.stringify(postData);
    return new Promise((resolve, reject) => {
      if (file) {
        const form = new FormData();

        if (Array.isArray(file)) {
          for (const f of file) {
            form.append(f.name, f.file, f.name);
          }
        } else {
          form.append(file.name, file.file, file.name);
        }
        form.append('payload_json', postData);
        form.submit(url, (err, res) => {
          if (err) reject(err);
          res.on('data', d => {
            resolve(JSON.parse(d.toString()));
          });
        });
      } else {
        phin({
          url,
          method,
          data: postData,
          headers: {
            'Content-Type': 'application/json',
          },
          parse: 'json',
        })
          .then(res => {
            console.log(res.body);
            resolve(res.body as T);
          })
          .catch(reject);
      }
    });
  }
}

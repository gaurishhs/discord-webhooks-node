import {
  APIAllowedMentions,
  APIEmbed,
  APIMessageComponent,
} from 'discord-api-types/v10';

export interface WebhookOptions {
  url: string;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
}

export interface WebhookObject {
  guild_id?: string;
  channel_id?: string;
  user?: User;
  token?: string;
  name: string;
  avatar: string;
  id: string;
  application_id?: string;
  url?: string;
}

export interface ModifyWebhookOptions {
  name?: string;
  avatar?: string;
  channel_id?: string;
}

export interface ExecuteWebhookData {
  content?: string;
  username?: string;
  avatar_url?: string;
  tts?: boolean;
  embeds?: APIEmbed[];
  allowed_mentions?: APIAllowedMentions;
  components?: APIMessageComponent[];
  flags?: number;
  thread_name?: string;
  files?: DiscordFile[];
}

export interface DiscordFile {
  name: string;
  file: Buffer;
}

import {
  APIButtonComponent,
  APIEmbed,
  APIMessageComponent,
} from 'discord-api-types/v10';
import {Button} from './builders/Button';
import {Embed} from './builders/Embed';

export class MessageBuilder {
  data: {
    embeds: APIEmbed[];
    components: APIMessageComponent[];
    content?: string;
  };
  constructor(content?: string) {
    this.data = {
      embeds: [],
      components: [],
      content: content,
    };
  }

  addEmbed(embed: Embed | APIEmbed): this {
    if (embed instanceof Embed) {
      this.data.embeds.push(embed.toJSON());
    } else {
      this.data.embeds.push(embed);
    }
    return this;
  }

  removeEmbed(index: number): this {
    this.data.embeds.splice(index, 1);
    return this;
  }

  clearEmbeds(): this {
    this.data.embeds = [];
    return this;
  }

  addComponent(component: APIMessageComponent | Button): this {
    if (component instanceof Button) {
      this.data.components.push(component.toJSON());
    } else {
      this.data.components.push(component);
    }
    return this;
  }

  toJSON() {
    return this.data;
  }
}

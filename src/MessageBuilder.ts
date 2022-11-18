import {
  APIButtonComponent,
  APIEmbed,
  APIMessageComponent,
} from 'discord-api-types/v10';
import {Button} from './builders/Button';
import {Embed} from './builders/Embed';

export class MessageBuilder {
  /* The data for the message */
  data: {
    /* The embeds for the message */
    embeds: APIEmbed[];
    /* The components for the message */
    components: APIMessageComponent[];
    /* The content for the message */
    content?: string;
  };
  /**
   * Create a new MessageBuilder
   * @param {string} content
   */
  constructor(content?: string) {
    /* Initialize the data */
    this.data = {
      embeds: [],
      components: [],
      content: content,
    };
  }

  /**
   * Add an embed to the message
   * @param {Embed | APIEmbed} embed
   * @returns {MessageBuilder}
   */
  addEmbed(embed: Embed | APIEmbed): this {
    if (embed instanceof Embed) {
      this.data.embeds.push(embed.toJSON());
    } else {
      this.data.embeds.push(embed);
    }
    return this;
  }

  /**
   * Remove an embed from the message
   * @param {number} index
   * @returns {MessageBuilder}
   */
  removeEmbed(index: number): this {
    this.data.embeds.splice(index, 1);
    return this;
  }

  /**
   * Remove all embeds from the message
   * @returns {MessageBuilder}
   */
  clearEmbeds(): this {
    this.data.embeds = [];
    return this;
  }

  /**
   * Add a component to the message
   * @param {Button | APIButtonComponent} component
   * @returns {MessageBuilder}
   */
  addComponent(component: APIMessageComponent | Button): this {
    if (component instanceof Button) {
      this.data.components.push(component.toJSON());
    } else {
      this.data.components.push(component);
    }
    return this;
  }

  /**
   * Get the JSON representation of the message
   * @returns {Object}
   */
  toJSON(): Object {
    return this.data;
  }
}

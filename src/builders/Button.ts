import {
  APIButtonComponent,
  APIButtonComponentWithURL,
  APIButtonComponentWithCustomId,
  EmojiFormat,
  APIEmoji,
  APIMessageComponentEmoji,
  ButtonStyle,
} from 'discord-api-types/v10';

const isURLButton = (button: any): button is APIButtonComponentWithURL => {
  if (button === undefined) return false;
  return button.url !== undefined;
};

const isCustomIdButton = (
  button: any,
): button is APIButtonComponentWithCustomId => {
  if (button === undefined) return false;
  return button.custom_id !== undefined;
};

export class Button {
  public label?: string;
  public style?: ButtonStyle;
  public custom_id?: string;
  public url?: string;
  public emoji?: APIMessageComponentEmoji;
  public disabled?: boolean;
  constructor(data?: APIButtonComponent) {
    if (data?.label) {
      this.label = data.label;
    }

    if (data?.style) {
      this.style = data.style;
    }

    if (isURLButton(data)) {
      this.url = data.url;
    }

    if (isCustomIdButton(data)) {
      this.custom_id = data.custom_id;
    }

    if (data?.emoji) {
      this.emoji = data.emoji;
    }

    if (data?.disabled) {
      this.disabled = data.disabled;
    }
  }

  public setLabel(label: string): this {
    this.label = label;
    return this;
  }

  public setStyle(style: ButtonStyle): this {
    this.style = style;
    return this;
  }

  public setCustomId(custom_id: string): this {
    this.custom_id = custom_id;
    return this;
  }

  public setURL(url: string): this {
    this.url = url;
    return this;
  }

  public setEmoji(emoji: EmojiFormat): this {
    if (typeof emoji === 'string') {
      this.emoji = {
        name: emoji,
      };
    } else {
      this.emoji = emoji;
    }
    return this;
  }

  public setDisabled(disabled: boolean): this {
    this.disabled = disabled;
    return this;
  }

  public toJSON() {
    return {
      type: 2,
      label: this.label,
      style: this.style || 1,
      custom_id: this.custom_id || '',
      url: this.url,
      emoji: this.emoji,
      disabled: this.disabled,
    };
  }
}

import {
  APIEmbed,
  APIEmbedAuthor,
  APIEmbedField,
  APIEmbedFooter,
  APIEmbedImage,
  APIEmbedThumbnail,
} from 'discord-api-types/v10';

const HEXCODE_REGEX = /^#?([a-fA-F0-9]{6})$/;
const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

export class Embed {
  public title?: string;
  public description?: string;
  public url?: string;
  public timestamp?: string | Date;
  public color?: number;
  public footer?: APIEmbedFooter;
  public image?: APIEmbedImage;
  public thumbnail?: APIEmbedThumbnail;
  public author?: APIEmbedAuthor;
  public fields: APIEmbedField[];
  /**
   * Create a new Embed
   * @since 1.0.0
   * @param data
   */
  constructor(data?: APIEmbed) {
    if (data?.title) {
      this.title = data.title;
    }

    if (data?.description) {
      this.description = data.description;
    }

    if (data?.url) {
      this.url = data.url;
    }

    if (data?.timestamp) {
      this.timestamp = data.timestamp;
    }

    if (data?.color) {
      this.color = data.color;
    }

    if (data?.footer) {
      this.footer = data.footer;
    }

    if (data?.image) {
      this.image = data.image;
    }

    if (data?.thumbnail) {
      this.thumbnail = data.thumbnail;
    }

    if (data?.author) {
      this.author = data.author;
    }

    this.fields = data?.fields || [];
  }

  /**
   * Set the Embed Title
   * @param title
   * @returns
   */
  setTitle(title: string) {
    if (typeof title !== 'string') {
      throw new TypeError('Title must be of type string');
    }

    if (title.length > 256) {
      throw new TypeError('Title should not exceed 256 characters');
    }

    this.title = title;
    return this;
  }

  /**
   * Set the Embed Description
   * @param description
   * @returns
   */
  setDescription(description: string) {
    if (typeof description !== 'string') {
      throw new TypeError('Description must be of type string');
    }

    if (description.length > 4096) {
      throw new TypeError('Description should not exceed 4096 characters');
    }

    this.description = description;
    return this;
  }

  /**
   * Set The Embed Color
   * @param color
   * @returns
   */
  setColor(color: string | number) {
    if (typeof color !== 'string' && typeof color !== 'number') {
      throw new TypeError(
        `Invalid color type, Expected string / number instead received ${typeof color}`,
      );
    }

    if (typeof color === 'number') {
      if (color < 0 || color > 16777215) {
        throw new TypeError('Invalid color');
      }

      this.color = color;
    } else {
      const colorvalidation = color.match(HEXCODE_REGEX);
      if (!colorvalidation) {
        throw new TypeError('Invalid HexCode!');
      }

      this.color = parseInt(colorvalidation[1], 16);
    }

    return this;
  }

  /**
   * Set The Embed URL
   * @param url
   * @returns
   */
  setURL(url: string) {
    if (typeof url !== 'string') {
      throw new TypeError('Url should be of type string');
    }

    if (!URL_REGEX.test(url)) {
      throw new TypeError('Not a valid URL');
    }

    this.url = url;
    return this;
  }

  /**
   * Set The Embed Timestamp
   * @param timestamp
   * @returns
   */
  setTimestamp(timestamp = new Date()) {
    if (Number.isNaN(new Date(timestamp).getTime())) {
      throw new TypeError('Invalid Timestamp date.');
    }

    this.timestamp = new Date(timestamp);
    return this;
  }

  /**
   * Set The embed footer
   * @param iconURL
   * @param text
   * @returns
   */
  setFooter(iconURL: string | undefined, text: string | any[]) {
    if (typeof text !== 'string') {
      throw new TypeError('Footer text should be of type string');
    }

    if (text.length > 2048) {
      throw new TypeError(
        'Embed footer text should not be more than 2048 characters',
      );
    }

    this.footer = {text};

    if (iconURL !== undefined) {
      if (typeof iconURL !== 'string') {
        throw new TypeError('Url should be of type string');
      }

      if (!iconURL.startsWith('attachment://') && !URL_REGEX.test(iconURL)) {
        throw new TypeError('Not a valid URL');
      }

      // eslint-disable-next-line camelcase
      this.footer.icon_url = iconURL;
    }

    return this;
  }

  /**
   * Set The Embed Image
   * @param imageURL
   * @returns
   */
  setImage(imageURL: string) {
    if (typeof imageURL !== 'string') {
      throw new TypeError('Image url should be of type string');
    }

    if (!imageURL.startsWith('attachment://') && !URL_REGEX.test(imageURL)) {
      throw new TypeError('Not a valid URL');
    }

    this.image = {url: imageURL};
    return this;
  }

  /**
   * Set the embed thumbnail
   * @param url
   * @returns
   */
  setThumbnail(url: string) {
    if (typeof url !== 'string') {
      throw new TypeError('Thumbnail url should be of type string');
    }

    this.thumbnail = {url};
    return this;
  }

  /**
   * Set the embed author
   * @param name
   * @param url
   * @param iconURL
   * @returns
   */
  setAuthor(
    name: string | any[],
    url: string | undefined,
    iconURL: string | undefined,
  ) {
    if (typeof name !== 'string') {
      throw new TypeError('Footer text should be of type string');
    }

    if (name.length > 256) {
      throw new TypeError('Footer text should not exceed 256 characters');
    }

    this.author = {name};

    return this;
  }

  /**
   * Add a field to embed
   * @param name
   * @param value
   * @param inline
   * @returns
   */
  addField(
    name: string | any[],
    value: string | any[],
    inline?: boolean | undefined,
  ) {
    if (this.fields.length >= 25) {
      throw new TypeError('Embeds cannot exceed 25 fields');
    }

    if (typeof name !== 'string') {
      throw new TypeError('Embed field name should be of type string');
    }

    if (typeof value !== 'string') {
      throw new TypeError('Embed field value should be of type string');
    }

    if (typeof inline !== 'boolean') {
      throw new TypeError('Embed field inline should be of type boolean');
    }

    if (name.length > 256) {
      throw new TypeError('Embed field name cannot exceed 256 characters');
    }

    if (value.length > 1024) {
      throw new TypeError('Embed field value cannot exceed 1024 characters');
    }

    this.fields.push({name, value, inline});
    return this;
  }

  /**
   * Add multiple fields to an embed
   * @param fields
   */
  addFields(fields: APIEmbedField[]) {
    for (const field of fields) {
      this.addField(field.name, field.value, field.inline);
    }
    return this;
  }

  /**
   * Convert the embed to a JSON object
   */
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      url: this.url,
      color: this.color,
      timestamp: this.timestamp?.toString(),
      footer: this.footer,
      image: this.image,
      thumbnail: this.thumbnail,
    };
  }
}

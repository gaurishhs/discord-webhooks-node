# Discord Webhooks

[![Downloads](https://img.shields.io/npm/dw/discord-webhooks-node)](https://img.shields.io/npm/dw/discord-webhooks-node)
[![License](https://img.shields.io/github/license/gaurishhs/discord-webhooks-node)](https://img.shields.io/github/license/gaurishhs/discord-webhooks-node)

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Send files](#send-files)
    - [Send embeds](#send-embeds)
    - [Config](#config)
- [API](https://gaurishhs.github.io/discord-webhooks-node/)
- [License](#license)

## Installation

```bash
npm install discord-webhooks-node
```

## Usage

### Basic Usage

```ts
import { Webhook } from 'discord-webhooks-node';

const webhook = new Webhook({
    url: 'WEBHOOK_URL',
});

webhook.execute({
    content: 'Hello world!',
}).then(() => console.log('Sent!')).catch((err) => console.error('Failed! ', err));
```

### Send files

```ts
import { Webhook } from 'discord-webhooks-node';

const webhook = new Webhook({
    url: 'WEBHOOK_URL',
});

webhook.execute({
    content: 'Hello world!',
    files: [
        {
            name: 'test.txt',
            file: Buffer.from('Hello world!'),
        },
    ],
}).then(() => console.log('Sent!')).catch((err) => console.error('Failed! ', err));
```

As an embed attachment:

```ts
import { readFileSync } from 'fs';
import { Embed, Webhook } from 'discord-webhooks-node';

const webhook = new Webhook({
    url: 'WEBHOOK_URL',
});

webhook.execute({
    content: 'Hello world!',
    embeds: [new Embed().setTitle('Hello world!').setDescription('This is a test embed.').setImage('attachment://test.jpeg').toJSON()],
    files: [
        {
            name: 'test.jpeg',
            // Read test.jpeg from the current directory
            file: readFileSync(__dirname + '/test.jpeg'),
        },
    ],
}).then(() => console.log('Sent!')).catch((err) => console.error('Failed! ', err));
```

### Send embeds

```ts
import { readFileSync } from 'fs';
import { Button, Embed, MessageBuilder, Webhook } from '../src';

const webhook = new Webhook({
    url: 'WEBHOOK_URL',
});

const msg = new MessageBuilder('Hello World!')
.addEmbed(
    new Embed()
    .setTitle('Hello World!')
    .setDescription('This is a test embed!')
    .setColor('#ff0000')
    .setFooter('https://discord.com', 'This is a test footer!')
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
    .setAuthor('Test Author', 'https://discord.com', 'https://cdn.discordapp.com/embed/avatars/0.png')
    .addField('Test Field', 'This is a test field!', false)
)
.addComponent(new Button().setLabel('Test Button').setStyle(1).setURL('https://discord.com'));
 
webhook.execute(msg.toJSON()).then(() => console.log('Sent!')).catch((err) => console.error('Failed! ', err));
```

### Config

```ts
import { Webhook } from 'discord-webhooks-node';

const webhook = new Webhook({
    url: 'WEBHOOK_URL',
})

webhook.setUsername('Test User');
webhook.setAvatar('https://cdn.discordapp.com/embed/avatars/0.png');

```
# License
- This project is MIT Licensed. Read the license file for more information.
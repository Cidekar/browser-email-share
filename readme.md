<p align="center"><img src="https://user-images.githubusercontent.com/4164072/67222410-461a9980-f3fb-11e9-9353-e7c37fc531a7.png" width="540" height="325"></p>

<p align="center"><img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen">&nbsp;<img src="https://img.shields.io/badge/npm-latest-blue.svg?maxAge=2592000"></p>

## Introduction
Create "mailto" links and send email using an email client.

## Documentation
### Usage
```js
    const EmailShare = require('@cidekar/browser-email-share')

    // New-up an instance
    const share = new EmailShare()

    // Render the DOM
    share.render(
        {
            body: 'Thank you for sending emails with our component.',
            subject: 'An email.'
        },
        document.getElementById('render')
    )

```

Define your DOM with data binding:
```js
    const EmailShare = require('@cidekar/browser-email-share')

    // New-up an instance
    const share = new EmailShare({
        text: 'Email',
        slot: `<a
                    class="btn btn-blue"
                    href="mailto:?subject={{email.subject}}&body={{email.body}}"
                    target="{{anchor.target}}"
                    rel="{{anchor.rel}}">
                    {{anchor.text}}
                </a>`
    })

    // Render the DOM
    share.render(
        {
            body: 'Thank you for sending emails with your customized component.',
            subject: 'An email, created with a custom slot.'
        },
        document.getElementById('render')
    )
```  

### Generator
 View our documentation by running the TypeDoc generator: 
```bash 
    $ yarn docs #TypeDoc 
```
### Development
Package linking is a two-step process:
- From the package folder create a symlink in the global folder.
```bash
    $ yarn link
    # success Registered "@cidekar/browser-email-share".
    # info You can now run `yarn link "@cidekar/browser-email-share"` in the projects where you want to use this package and it will be used instead.
```

- Some other location, create a symbolic link from globally-installed package.
```bash
    $ yarn link @cidekar/browser-email-share
```
## License
Copyright 2019 Cidekar, LLC. All rights reserved.

[Apache License 2.0](./license.md)
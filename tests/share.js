import emailShare from '../src/emailShare'

describe('default parameters are properly defined in class', () => {
    
    const share = new emailShare()

    test('rel is not undefined', () => {
        expect(share.anchor.rel).not.toBeUndefined()
    })

    test('target is not undefined', () => {
        expect(share.anchor.target).not.toBeUndefined()
    })

    test('text is not undefined', () => {

        expect(share.anchor.text).not.toBeUndefined()
      
    })

    test('slot is null', () => {

        expect(share.anchor.slot).not.toBeUndefined()
    })
})


describe('the email component can render', () => {

    // Setup a document body for test
    document.body.innerHTML = `<div id="render"></div>`
    
    const share = new emailShare()
    
    share.render(
        {
            body: 'Thank you for sending emails with our component.',
            subject: 'An email.'
        },
        document.getElementById('render')
    )

    const expected = [
        expect.stringMatching(/<a(.|\n)*\/a>/),
        expect.stringMatching(/href=/),
        expect.stringMatching(/subject=/),
        expect.stringMatching(/body=/),
        expect.stringMatching(/target=/),
        expect.stringMatching(/rel=/),
    ]

    it('attributes are present after rendering DOM', () => {
        expect([document.body.innerHTML]).toEqual(
            expect.arrayContaining(expected)
        )
    })

})
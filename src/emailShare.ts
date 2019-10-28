interface Email {
    /**
     * The body of a message is simply lines of US-ASCII characters
     *  @link http://www.faqs.org/rfcs/rfc2822.html
     */
    body: string;

    /**
     * Provide a summary, or indicate the nature, of the email message
     * @link https://www.w3.org/Protocols/rfc822/
     * @link http://www.faqs.org/rfcs/rfc2822.html
     */
    subject: string;
    
}

interface Anchor{
    /**
     * Each link-value conveys one target IRI as a URI-Reference.
     * @link https://tools.ietf.org/html/rfc5988#page-7
     * @link https://tools.ietf.org/html/rfc8288#section-3.4
     */
    target?: string;

    /**
     * Indicate that the semantics of the relationship between the current and the linked document.
     * @link https://tools.ietf.org/html/rfc8288#section-3.3
     */
    rel?: string;

    /**
     * Describe the purpose of the mail link to the consumer.
     * @link https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-link.html
     */
    text?: string;

    /**
     * A slot for assigning nodes without a slot name. Data passed to the slot is rendered in the DOM.
     * @link https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Slots-Proposal.md
     */
    slot?: string;
}

type Callback = () => any

abstract class EmailShareBase {
    
    /**
    * Create and render DOM element into the supplied element.
    * @link https://reactjs.org/docs/react-dom.html#render
    */
    abstract render(email: Email, container: HTMLCollection | HTMLElement, callback?: () => void): void
    
    public anchor: Anchor = {
        rel: "noopener noreferrer",
        slot: `<div>
                    <a
                        class="greyButton"
                        href="mailto:?subject={{email.subject}}&body={{email.body}}"
                        target="{{anchor.target}}"
                        rel="{{anchor.rel}}">
                        {{anchor.text}}
                    </a>             
                </div>`,
        target: "_blank",
        text: "Send email with the default email client."
    }
    
    constructor(params: Anchor) {
        Object.assign(this.anchor, params)
    }
    
}

export default class EmailShare extends EmailShareBase{

    private hasMustache = "{{([a-zA-Z.]+)}}"

    private mustacheWhitelist = [
        'anchor.target', 
        'anchor.rel', 
        'anchor.text'
    ]

    private emailWhitelist = [
        'email.subject', 
        'email.body'
    ]

    public email: Email = {
        body: null,
        subject: null

    }
    
    constructor(anchor: Anchor){
        super(anchor)
        
        this.inject(this.mustacheWhitelist)
    }

    /**
     *  Allow injection of Class property into user defined template by whitelist.
     * @param whitelist 
     */
    inject(whitelist: string[]){

        this.anchor.slot.match(new RegExp(this.hasMustache, 'g')).map((slotMustache) => {
            const slotRequest = new RegExp(this.hasMustache, 'g').exec(slotMustache)
            if (slotRequest && whitelist.includes(slotRequest[1])) {
                const parts = slotRequest[1].split('.')
                this.anchor.slot = this.anchor.slot.replace(slotMustache, this[parts[0]][parts[1]])
            }
        })
    }

    render(email: Email, container: HTMLCollection | HTMLElement, callback: Callback): void{
        Object.assign(this.email, email)
        
        this.email.body = encodeURIComponent(this.email.body)
        this.email.subject = encodeURIComponent(this.email.subject)

        this.inject(this.emailWhitelist)

        if (container instanceof HTMLCollection){
            let domPointer = 0
            let insert = true
            while (insert) {

                if (domPointer >= container.length) {
                    insert = false
                    break
                }
                container[domPointer].insertAdjacentHTML('beforeend', this.anchor.slot)
                domPointer++
            }
        }
        else if(container instanceof HTMLElement){
            container.insertAdjacentHTML('beforeend', this.anchor.slot)
        }
        
        if(callback && typeof callback === 'function'){
            callback()
        }     
    }
}
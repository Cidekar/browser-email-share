/**!
 * @cidekar/browser-email-share version 1.0.0
 * (c) 2014-2019 Cidekar
 * @license Released under the Apache-2.0 license.
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var EmailShareBase = /** @class */function () {
    function EmailShareBase(params) {
        this.anchor = {
            rel: "noopener noreferrer",
            slot: "<div>\n                    <a\n                        class=\"greyButton\"\n                        href=\"mailto:?subject={{email.subject}}&body={{email.body}}\"\n                        target=\"{{anchor.target}}\"\n                        rel=\"{{anchor.rel}}\">\n                        {{anchor.text}}\n                    </a>             \n                </div>",
            target: "_blank",
            text: "Send email with the default email client."
        };
        Object.assign(this.anchor, params);
    }
    return EmailShareBase;
}();
var EmailShare = /** @class */function (_super) {
    __extends(EmailShare, _super);
    function EmailShare(anchor) {
        var _this = _super.call(this, anchor) || this;
        _this.hasMustache = "{{([a-zA-Z.]+)}}";
        _this.mustacheWhitelist = ['anchor.target', 'anchor.rel', 'anchor.text'];
        _this.emailWhitelist = ['email.subject', 'email.body'];
        _this.email = {
            body: null,
            subject: null
        };
        _this.inject(_this.mustacheWhitelist);
        return _this;
    }
    /**
     *  Allow injection of Class property into user defined template by whitelist.
     * @param whitelist
     */
    EmailShare.prototype.inject = function (whitelist) {
        var _this = this;
        this.anchor.slot.match(new RegExp(this.hasMustache, 'g')).map(function (slotMustache) {
            var slotRequest = new RegExp(_this.hasMustache, 'g').exec(slotMustache);
            if (slotRequest && whitelist.includes(slotRequest[1])) {
                var parts = slotRequest[1].split('.');
                _this.anchor.slot = _this.anchor.slot.replace(slotMustache, _this[parts[0]][parts[1]]);
            }
        });
    };
    EmailShare.prototype.render = function (email, container, callback) {
        Object.assign(this.email, email);
        this.email.body = encodeURIComponent(this.email.body);
        this.email.subject = encodeURIComponent(this.email.subject);
        this.inject(this.emailWhitelist);
        if (container instanceof HTMLCollection) {
            var domPointer = 0;
            var insert = true;
            while (insert) {
                if (domPointer >= container.length) {
                    insert = false;
                    break;
                }
                container[domPointer].insertAdjacentHTML('beforeend', this.anchor.slot);
                domPointer++;
            }
        } else if (container instanceof HTMLElement) {
            container.insertAdjacentHTML('beforeend', this.anchor.slot);
        }
        if (callback && typeof callback === 'function') {
            callback();
        }
    };
    return EmailShare;
}(EmailShareBase);

EmailShare.version = '1.0.0';

export default EmailShare;

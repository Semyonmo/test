import $ from  'jquery';

let self = null;

export default class Footer {
    constructor() {
        self = this;
        self.$scrollBar = $('.footer__scroll');
        self.$scrollBarText = $('span', self.$scrollBar);
        self.$footer = $('.footer__place');
        self.$barButton = $('.footer__anchor');

        $(document).scroll(self.replace);
        self.$barButton.click(self.barClick);
    }

    barClick() {
        if (self.$scrollBar.hasClass('active')) {
            self.$scrollBarText.text('кликни здесь');
            self.$scrollBar.removeClass('active');
        } else {
            self.$scrollBarText.text('закрой');
            self.$scrollBar.addClass('active');
        }
        self.replace();
    }

    /**
     * Check footer scroll bar position under footer block
     * @returns {boolean}
     */
    barPosition() {
        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop(),
            scrollBarHeight = self.$scrollBar.height(),
            footerHeight = self.$footer.height();

        return scrollBottom + scrollBarHeight - 490 < footerHeight;
        //490 - scroll bar transform value
    }


    /**
     * Make footer scroll bar hidden if
     * scrolled to footer at bottom
     * and footer scroll bar has not been active
     */
    replace() {
        if (self.barPosition() && !self.$scrollBar.hasClass('active')) {
            self.$scrollBar.css('display', 'none');
        } else {
            self.$scrollBar.css('display', 'block');
        }
    }
}
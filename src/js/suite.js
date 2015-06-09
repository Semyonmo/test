import $ from  'jquery';
import _ from 'lodash';

class magicBg {
    constructor(selector, imgUrl, height, width) {
        var self = this;

        self.element = $(selector);
        self.viewport = this.getViewport();

        if (imgUrl != null) { //if bg with image
            self.image = new Image();

            self.image.onload = function () {
                var image = this;

                self.updateImage(image.height, image.width);

                //mobile check
                if (typeof window.orientation !== 'undefined') {
                    self.element
                        .css('position', 'fixed')
                        .css('top', 0);

                } else {
                    $(window).scroll(function () {
                        self.scroll(self);
                    });

                    $(window).resize(_.throttle(function () {
                        self.updateImage(image.height, image.width);
                    }, 100));
                }
            };

            self.image.src = imgUrl;
        }
    }


    updateImage(height, width) {
        console.log('update');
        var self = this;
        self.viewport = self.getViewport();
        self.ratioImage = width / height;
        self.ratioScreen = self.viewport.width / self.viewport.height;

        if (self.ratioImage < self.ratioScreen) {//image can be scrolled
            console.log('can be scrolled');
            self.curentScale = self.ratioScreen/self.ratioImage * 100;
        }
        self.height = height / 100 * self.curentScale;
        self.element.css('backgroundImage', `url("${self.image.src}")`);

        if (self.height > height) {
            self.element.css('height', self.height/ 10 + 'vh');
        }
    }


    scroll(self) {
        if (self.ratioImage < self.ratioScreen) {//image can be scrolled
            console.log('scroll');

            var scrollTop = $(document).scrollTop();
            var overHeight = self.viewport.height * ((self.curentScale - 100)/ 100);
            console.log(self.curentScale - 100);

            if (overHeight < scrollTop) { //fix image position
                self.element.css('position', 'fixed').css('top', -overHeight);
            }
            else { //scroll image with page
                self.element.css('position', 'absolute').css('top', 0);
            }
        } else {
            self.element.css('position', 'fixed').css('top', 0);
        }
    }

    /**
     * Get viewport of browser
     * @returns {{width: *, height: *}}
     */
    getViewport() {
        var viewPortWidth;
        var viewPortHeight;

        if (typeof window.innerWidth != 'undefined') {
            viewPortWidth = window.innerWidth;
            viewPortHeight = window.innerHeight;
        }

        else if (typeof document.documentElement != 'undefined'
            && typeof document.documentElement.clientWidth != 'undefined'
            && document.documentElement.clientWidth != 0) {
            viewPortWidth = document.documentElement.clientWidth;
            viewPortHeight = document.documentElement.clientHeight;
        }

        // older versions of IE
        else {
            viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
            viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
        }
        return {
            width: viewPortWidth,
            height: viewPortHeight
        }
    }
}

var bg = new magicBg('#background', '/img/bg.jpg');

$(document).scroll(function () {
    applyFooterAction();
});

$('.footer__anchor').click(function () {
    var $footerScroll = $('.footer__scroll');
    var $text = $('span',this);
    if ($footerScroll.hasClass('active')) {
        $text.text('КЛИКНИ ЗДЕСь');
        $footerScroll.removeClass('active');
    } else {
        $text.text('закрой');
        $footerScroll.addClass('active');
    }
    applyFooterAction();
});

function isFooterPlaced () {
    var scrollBotoom = $(document).height() - $(window).height() - $(window).scrollTop();
    var footerHeight = $('.footer__scroll').height();
    var footerPlace = $('.footer__place').height();
    return scrollBotoom + footerHeight - 490 < footerPlace;
}


function applyFooterAction() {
    if(isFooterPlaced() && !$('.footer__scroll').hasClass('active')) {
        $('.footer__scroll').css('display', 'none');
    } else {
        $('.footer__scroll').css('display', 'block');
    }
}



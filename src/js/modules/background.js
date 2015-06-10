import $ from  'jquery';
import _ from 'lodash';

let self = null;

export default class Background {
    constructor(selector, imgUrl) {
        self = this;

        self.element = $(selector);
        self.viewport = self.getViewport();

        if (imgUrl != null) { //if bg with image
            self.image = new Image();

            self.image.onload = function () {
                var image = this;

                self.updateImage(image.height, image.width);

                if (typeof window.orientation === 'undefined') {//desktop
                    $(window).scroll(function () {
                        self.scroll(self);
                    });

                    $(window).resize(_.throttle(function () {
                        self.updateImage(image.height, image.width);
                    }, 100));
                } else {//mobile
                    self.element
                        .css('position', 'fixed')
                        .css('top', 0);

                }
            };

            self.image.src = imgUrl;
        }
    }


    /**
     * Update image and viewport of screen and apply new values
     * @param height
     * @param width
     */
    updateImage(height, width) {
        var self = this;
        self.viewport = self.getViewport();
        self.ratioImage = width / height;
        self.ratioScreen = self.viewport.width / self.viewport.height;

        if (self.ratioImage < self.ratioScreen) {//image can be scrolled
            self.curentScale = self.ratioScreen / self.ratioImage * 100;
        }
        self.height = height / 100 * self.curentScale;
        self.element.css('backgroundImage', `url("${self.image.src}")`);

        if (self.height > height) {
            self.element.css('height', self.height / 10 + 'vh');
        }
    }

    /**
     * Scroll background image
     * @param self
     */
    scroll(self) {
        if (self.ratioImage < self.ratioScreen) {//image can be scrolled

            var scrollTop = $(document).scrollTop();
            var overHeight = self.viewport.height * ((self.curentScale - 100) / 100);

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
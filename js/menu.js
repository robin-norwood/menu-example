/*
   menu.js - Menu javascript

   Copyright (c) 2011 Robin Norwood <robin.norwood@gmail.com>

      This file is part of Menu.

    Menu is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Menu is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Menu.  If not, see <http://www.gnu.org/licenses/>.
*/

$(function () {
    var Menu = function () {
        var self = this;

        var init = function () {
            self.setAnchor(jQuery.url().attr('anchor'));
            self.loadContent();
            pollAnchor();
        };

        var pollAnchor = function () {
            var cur = new Anchor(jQuery.url(document.location).attr('anchor'));

            if (self.anchor.path != cur.path) {
                self.anchor = cur;
                self.loadContent();
            }

            $.doTimeout('poll-anchor', 250, function () {pollAnchor();});
        };

        this.setAnchor = function (anchor_tag) {
            anchor_tag = anchor_tag ? anchor_tag : 'one';
            anchor_tag = anchor_tag.split('#').reverse()[0];
            this.anchor = new Anchor(anchor_tag);

            document.location.hash = this.anchor.toString();

            return;
        };

        this.loadContent = function () {
            $("div.content").addClass("nodisplay");
            $("nav a").parent().removeClass("current");

            $("div#content-" + this.anchor.path).removeClass("nodisplay");
            $("nav a#" + this.anchor.path).parent().addClass("current");
        };

        init();
    };

    var menu = new Menu();
}
);
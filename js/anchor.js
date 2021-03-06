/*
   anchor.js - Menu javascript

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

function Anchor(anchor_tag) {
    /*
     * The Anchor object is a helper to handle the anchor tag part of
     * a url, and can be used for navigation and state within an
     * application. This implementation treats the anchor tag as if it
     * were the path and formvars of a 'real' url.
     *
     * var a = new Anchor(anchor_tag)
     *   // anchor_tag: Contents of anchor tag (the part of the URL after '#').
     *
     * a.path: The path, first part of the anchor tag
     * a.get(var_name): Get var
     * a.set(var_name, val): Set var value
     * a.update(var_string): Update vars with contents of the string.
     *                    Ex: 'var1=val1&var2=val2'
     *
     * Ex: var a = new Anchor('path?var1=val1&var2=val2');
     *     a.path == 'path';
     *     a.get('var1') == 'val1';
     *     a.get('var2') == 'val2';
     */

    var that = this;

    anchor_tag = anchor_tag || '';

    this.path = null;
    var vars = new Object();

    var init = function () {
        var path_n_vars = anchor_tag.split('?');
        that.path = path_n_vars[0] || 'home';

        if (path_n_vars.length > 1) {
            that.update(path_n_vars[1]);
        }
    };

    this.setPath = function (name) {
        this.path = name;
    };

    this.toString = function () {
        // Turn the object back into a string
        //  ex: path?var1=val1&var2=var2

        var ret = this.path;
        var vars_str = this.varsToString();

        if (vars_str.length > 0) {
            ret += '?' + vars_str;
        }

        return ret;
    };

    this.varsToString = function () {
        // Turn the vars back into a string
        //  ex: a.varsToString == "var1=val1&var2=val2";
        var ret = new Array();

        $.each(vars, function (k, v) {
            ret.push(k + '=' + v);
        });

        return ret.join('&');
    };

    this.resetVars = function () {
        vars = new Object();
    };

    this.set = function (the_var, val) {
        vars[the_var] = val;
    };

    this.get = function (the_var) {
        if (the_var in vars)
            return vars[the_var];

        return '';
    };

    this.update = function(the_vars) {
        $.each(the_vars.split('&'), function (idx, str) {
            var key_n_val = str.split('=');
            if (key_n_val.length == 2) {
                that.set(key_n_val[0], key_n_val[1]);
            }
        });
    };

    init();

    return this;
}

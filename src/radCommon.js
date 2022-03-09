import $ from 'jquery';

require('jquery');
require('popper.js')
require('bootstrap');
require('bootstrap-select');
require('readmore-js');
require('jquery.are-you-sure');
import {RadCommonGlobalSearch} from "./radCommonGlobalSearch";
import {RadCommonAutoComplete} from "./radCommonAutoComplete";
import {RadCommonDynamicUpdater} from "./radCommonDynamicUpdater";
import {RadCommonGeneral} from "./radCommonGeneral";
import {AreYouSure} from "./areYouSure";

export class RadCommon {
    static setup() {
        $(document).ready( function() {
            RadCommonAutoComplete.setup();
            RadCommonGlobalSearch.setup();
            RadCommonGeneral.setup();
            RadCommonDynamicUpdater.setup();
            AreYouSure.setup();
        })
    }
}

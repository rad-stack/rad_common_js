import $ from 'jquery';

require('jquery');
require('@rails/ujs').start();
require('@popperjs/core');
require('bootstrap');
require('bootstrap-select');
require('readmore-js');
require('jquery.are-you-sure');
require('bootstrap-select');
require('ajax-bootstrap-select');
require('./richtext');

import { RadCommonGlobalSearch } from './radCommonGlobalSearch';
import { RadCommonAutoComplete } from './radCommonAutoComplete';
import { RadCommonDynamicUpdater } from './radCommonDynamicUpdater';
import { RadCommonGeneral } from './radCommonGeneral';
import { AreYouSure } from './areYouSure';
import { RadChosen } from './radChosen';
import { DateSetup } from './dateSetup';
import { RadSearch } from './radSearch';
import { BatchActions } from './batchActions';
import { Duplicates } from './duplicates';
import { RadSearchDateFilter } from './radSearchDateFilter';

export class RadCommon {
  static setup() {
    $(document).ready(function () {
      RadCommonAutoComplete.setup();
      RadCommonGlobalSearch.setup();
      RadCommonGeneral.setup();
      RadCommonDynamicUpdater.setup();
      AreYouSure.setup();
      RadCommon.bootstrapSetup();
      RadChosen.setup();
      DateSetup.setup();
      RadSearch.setup();
      Duplicates.setup();
      BatchActions.setup();
      RadSearchDateFilter.setup();
      $('.selectpicker').selectpicker();
    });
  }

  static bootstrapSetup() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }
}

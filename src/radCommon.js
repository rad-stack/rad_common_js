import $ from 'jquery';

require('jquery');
require('@rails/ujs').start();
require('popper.js');
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
import { Toast } from './toast';
import { SentryTest } from './sentry';

export class RadCommon {
  static setup() {
    const setupSteps = () => {
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
      Toast.setup();
      SentryTest.setup();
      $('.selectpicker').selectpicker();
    };
    document.addEventListener('turbo:render', function(event) {
      setupSteps();
    });

    document.addEventListener('turbo:load', function(event) {
      setupSteps();
    });

    document.addEventListener('DOMContentLoaded', function(event) {
      setupSteps();
    });
  }

  static bootstrapSetup() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
  }
}

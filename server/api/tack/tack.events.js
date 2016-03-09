/**
 * Tack model events
 */

'use strict';

import {EventEmitter} from 'events';
var Tack = require('./tack.model');
var TackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TackEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Tack.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TackEvents.emit(event + ':' + doc._id, doc);
    TackEvents.emit(event, doc);
  }
}

export default TackEvents;

/*
 * Copyright 2017 Next Century Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* globals DigBehaviors, _ */
/* exported DigBehaviors */
var DigBehaviors = DigBehaviors || {};

/**
 * Polymer behavior for state-related utility functions.
 */
DigBehaviors.StateBehavior = {
  /**
   * Builds and returns the entity state object from the given config object.
   *
   * @param {Object} config
   * @return {Object}
   */
  buildEntityState: function(config) {
    return {
      email: config.email || [],
      phone: config.phone || [],
      publisher: config.publisher || [],
      location: config.location || [],
      name: config.name || [],
      age: config.age || [],
      ethnicity: config.ethnicity || [],
      eyeColor: config.eyeColor || [],
      hairColor: config.hairColor || [],
      height: config.height || [],
      weight: config.weight || []
    };
  },

  /**
   * Builds and returns the search state object for the UI from the given config object and annotations filter.
   *
   * @param {Object} config
   * @param {Object} annotationsFilter
   * @return {Object}
   */
  buildSearchStateForUI: function(config, annotationsFilter) {
    return {
      dateCreated: config.dateCreated || {},
      country: config.country || {},
      city: config.city || {},
      phone: config.phone || {},
      email: config.email || {},
      website: config.website || {},
      name: config.name || {},
      age: config.age || {},
      ethnicity: config.ethnicity || {},
      eyeColor: config.eyeColor || {},
      hairColor: config.hairColor || {},
      height: config.height || {},
      weight: config.weight || {},
      hasImage: config.hasImage || {},
      image: config.image || {},
      annotationsFilter: annotationsFilter ? _.cloneDeep(annotationsFilter) : {},
      sort: config.sort || '',
      text: (config.text || config.text === null) ? config.text : ''
    };
  },

  /**
   * Builds and returns the search state object for elasticsearch from the given config object.
   *
   * @param {Object} config
   * @return {Object}
   */
  buildSearchStateForES: function(config) {
    return {
      dateCreated: config.dateCreated || {},
      country: config.country || {},
      city: config.city || {},
      phone: config.phone || {},
      email: config.email || {},
      website: config.website || {},
      name: config.name || {},
      age: config.age || {},
      ethnicity: config.ethnicity || {},
      eyeColor: config.eyeColor || {},
      hairColor: config.hairColor || {},
      height: config.height || {},
      weight: config.weight || {},
      hasImage: config.hasImage || {},
      image: config.image || {},
      sort: config.sort || '',
      text: config.text || ''
    };
  }
};

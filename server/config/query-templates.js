'use strict';

module.exports = {

  QUERY_TEMPLATES: {
    // annotation query -- using 'mockUser' for now until user support is added
    annotationQuery: {
        query: {
            query: {
                bool : {
                    must : [
                        {
                            term : { uri : '' }
                        },
                        {
                            term : { user : '' }
                        }
                    ]
                }
            }
        },
        pathsToValues: [
            'query.bool.must[0].term.uri', 'query.bool.must[1].term.user'
        ]
    },
    // Common query used among entities
    commonMatchQuery: {
        query:{
            match:{ '{{field}}' : '{{{value}}}' }
        }
    },

    commonTermQuery: {
        query:{
            term:{ '{{field}}' : '{{{value}}}' }
        }
    },

    commonMatchQueryOfferSorted: {
        query:{
            match:{ '{{field}}' : '{{value}}' }
        },
        "sort": [
                  {
                    "validFrom": {
                    "order": "desc"
                }
            }
        ] 
    },
    //offer locations for phone.html
    offerLocation:{
      "aggs": {
        "phone": {
          "filter": {
            "term": {
              "{{field}}": "{{value}}"
            }
          },
          "aggs": {
            "city": {
              "terms": {
                "field": "availableAtOrFrom.address.key",
                "size": 0
              }
            }
          }
        }
      },
      "size": 0
    },
    // Who: Give a sense of who is using this phone/email
    // note that in current index, aggregations on hair color, eye color, and ethnicity come back empty
    // and that ethnicity is missing from offer type
    phoneOrEmailPeopleAgg: {
        "query": {
            "filtered": {
                "filter": {
                    "term": {
                        "{{field}}": "{{value}}"
                    }
                }
            }
        },
        "aggs" : {
            "people_names": {
                "terms": {
                    "field": "name.raw",
                    "size": 0
                }
            },
            "people_ages": {
                "terms": {
                    "field": "age",
                    "size": 0
                }
            },
            "people_ethnicities": {
                "terms": {
                    "field": "ethnicity",
                    "size": 0
                }
            }
        }
    },
    // same one used in phone/email
    sellerPeopleAggs: {
        "query": {
            "filtered": {
                "filter": {
                    "term": {
                        "{{field}}": "{{value}}"
                    }
                }
            }
        },
        "aggs" : {
            "people_names": {
                "terms": {
                    "field": "name.raw",
                    "size": 0
                }
            },
            "people_ages": {
                "terms": {
                    "field": "age",
                    "size": 0
                }
            },
            "people_ethnicities": {
                "terms": {
                    "field": "ethnicity",
                    "size": 0
                }
            }
        }
    },
    offerRevisions: {
        query: {
            "query": {
                "filtered": {
                    "query": {
                        "match": { 'mainEntityOfPage.url.raw' : '' }
                    },
                    "filter": {
                        "not": {
                            "term": { 'uri' : '' }
                        }
                   }
                }
            }
        },
        pathsToValues: [
            "query.filtered.query.match['mainEntityOfPage.url.raw']",
            "query.filtered.filter.not.term['uri']"
        ]
      
   },
    // webpage entity queries
    webpageRevisions: {
        "query": {
            "filtered": {
                "filter": {
                    "term": {
                        '{{field}}' : '{{value}}'
                    }
                }
            }
        },
        "aggs": {
            "page_revisions" : {
                "date_histogram": {
                    "field": "dateCreated",
                    "interval": "week"
                }
            }
        }
    },
    itineraryPhone:{
      "aggs": {
        "phone": {
          "filter": {
            "term": {
              '{{field}}': '{{value}}'
            }
          },
          "aggs": {
            "timeline": {
              "date_histogram": {
                "field": "validFrom",
                "interval": "day"
              },
              "aggs": {
                "city": {
                  "terms": {
                    "field": "availableAtOrFrom.address.key",
                    "size": 500
                  },
                  "aggs": {
                    "publisher": {
                      "terms": {
                        "field": "mainEntityOfPage.publisher.name.raw",
                        "size": 500
                      }
                    },
                    "mentions": {
                      "terms": {
                        "field": "mainEntityOfPage.mentions",
                        "size": 500
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "size": 0
    },

    locationTimeline: {
       "aggs": {
          "offersPhone": {
             "filter": {
                "term": {
                   "{{field}}": "{{value}}"
                }
             },
             "aggs": {
                "offerTimeline": {
                   "date_histogram": {
                      "field": "validFrom",
                      "interval": "day"
                   },
                    "aggs": {
                        "localities": {
                            "terms": {
                                "field": "availableAtOrFrom.address.key",
                                "order" : { "_term" : "asc" }
                            }
                        }
                    }
                },
                "locations": {
                    "terms": {
                        "field": "availableAtOrFrom.address.key",
                        "size": 0
                    }
                }
             }
          }
       },
       "size": 0
    },
    hourlyLocationTimeline : {
      "aggs": {
        "phone": {
          "filter": {
            "term": {
              "mainEntityOfPage.mentions": "http://dig.isi.edu/ht/data/phone/1-2163741665"
            }
          },
          "aggs": {
            "city": {
              "terms": {
                "field": "availableAtOrFrom.address.key",
                "size": 20
              },
              "aggs": {
                "timeline": {
                  "date_histogram": {
                    "field": "validFrom",
                    "min_doc_count" : 1,
                    "interval": "hour"
                  }
                }
              }
            }
          }
        }
      },
      "size": 0
    }

  }
};

'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CustomerSchema = new Schema({
    email: {
        type: String,
        required: 'Please fill Email',
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    role: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    billing: {
        type: {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            company: {
                type: String
            },
            address_1: {
                type: String
            },
            address_2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            },
            email: {
                type: String
            },
            phone: {
                type: String
            }
        }
    },
    shipping: {
        type: {
            first_name: {
                type: String
            },
            last_name: {
                type: String
            },
            company: {
                type: String
            },
            address_1: {
                type: String
            },
            address_2: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            postcode: {
                type: String
            },
            country: {
                type: String
            }
        }
    },
    is_paying_customer: {
        type: Boolean
    },
    avatar_url: {
        type: String
    },
    meta_data: {
        type: [ metaData ]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

var metaData = new Schema({
    key: {
        type: String
    },
    value: {
        type: String
    }
});

mongoose.model("Customer", CustomerSchema);
mongoose.model("metaData", metaData)
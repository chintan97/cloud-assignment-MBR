/**
 * Employer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    employerName: {
      type: 'string',
      required: true,
      maxLength: 30,
      example: 'Code Inc.'
    },

    userId: {
      type: 'string',
      required: true,
      maxLength: 10,
      example: 'c334455' 
    },

    userPassword: {
      type: 'string',
      required: true,
      maxLength: 30,
      example: 'password123'
    },

    userFirstName: {
      type: 'string',
      required: true,
      maxLength: 30,
      example: 'John'
    },

    userLasName:{
      type: 'string',
      required: true,
      maxLength: 30,
      example: 'Smith'
    },

  },
  datastore: 'employerDB'

};


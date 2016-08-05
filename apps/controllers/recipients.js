'use strict'

require('rootpath')()

const is = require('is_js')
const recipientValidator = require('apps/validators/recipientValidator')
const recipientFormatter = require('apps/services/recipientFormatter')
const Recipient  = require('apps/models/recipient')

const ERROR_MESSAGE = 'Incorrect format Ex.firstname, lastname, x@y.com'

exports.addRecipient = (req, res) => {
  if (!recipientValidator.validateNewRecipient(req.body)) {
    return false
  }

  const recipient = recipientFormatter.validRecipientFormat(req.body)
  res.status(201)
  return res.send({ code: 201, message: 'Success', recipient })
}


'use strict'

require('rootpath')()

const emailValidator = require('apps/validators/email')
const emailService = require('apps/services/email')
let emailBody

let getMainpage = (req, res) => {
  res.render('index.ejs', { title: 'Namcha e-mail' })
}

let postEmail = (req, res) => {

  emailBody = req.body
  if(!_isValidRequest(emailBody)) {
    return _response(res, 403, 'Request is invalid')
  }

  const recipients = emailValidator.getValidRecipient(emailBody.to)
  if(!recipients.length) {
    return _response(res, 403, 'Recipients is invalid')
  }

  const result = emailService.send(recipients, emailBody.topic, emailBody.body)
  if(!result.status) {
    return _response(res, 503, 'Cannot send email')
  }
  return _response(res, 200, 'Success')
}

let _isValidRequest = (topic, body, recipients) => {
  return (emailValidator.validTopic(emailBody.topic) && emailValidator.validBody(emailBody.body) && emailValidator.getValidRecipient(emailBody.to).length)
}

let _response = (res, code, message) => {
  return res.status(code).send({
    code,
    message
  })
}

module.exports = {
  postEmail,
  getMainpage
}

'use strict'

require('rootpath')()

const request = require('supertest')
const expect = require('chai').expect
const sinon = require('sinon')
const recipientController = require('apps/controllers/recipients')

describe('Recipients controllers', () => {
    it('Should add Recipients successfully if params is valid', done => {
        // arrange
        const req = {
            body: {
                firstname: "david",
                lastname: "beckham",
                email: "DAVID.beckham@gmail.com"
            }
        }
        
        const res = {
            _self: this,
            send: () => {
                
            },
            status: () => {

            }
        }
        const spySend = res.send = sinon.spy()
        const spyStatus = res.status = sinon.spy()
        const expectedResult = {
            firstname: "David",
            lastname: "Beckham",
            email: "david.beckham@gmail.com"
        }

        // act
        recipientController.addRecipient(req, res)

        // assert
        const resultSend = spySend.args[0][0]
        const resultStatus = spyStatus.args[0][0]
        expect(spySend.calledOnce).to.be.true
        expect(spyStatus.calledOnce).to.be.true
        expect(resultStatus).eql(201)
        expect(resultSend.code).eql(201)
        expect(resultSend.message).eql('Success')
        expect(resultSend.recipient).eql(expectedResult)
        done()
    })
})
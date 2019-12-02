'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Customer = mongoose.model('Customer');

var credentials,
    token,
    mockup;

describe('Customer CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            email: "john.doe@example.com",
            first_name: "John",
            last_name: "Doe",
            username: "john.doe",
            billing: {
                first_name: "John",
                last_name: "Doe",
                company: "",
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US",
                email: "john.doe@example.com",
                phone: "(555) 555-5555"
            },
            shipping: {
                first_name: "John",
                last_name: "Doe",
                company: "",
                address_1: "969 Market",
                address_2: "",
                city: "San Francisco",
                state: "CA",
                postcode: "94103",
                country: "US"
            }
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Customer get use token', (done) => {
        request(app)
            .get('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Customer get by id', function (done) {

        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/customers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.first_name, mockup.first_name);
                        assert.equal(resp.data.last_name, mockup.last_name);
                        assert.equal(resp.data.username, mockup.username);
                        assert.equal(resp.data.role , "customer")
                        assert.equal(resp.data.avatar_url , "https://secure.gravatar.com/avatar/8eb1b522f60d11fa897de1dc6351b7e8?s=96")
                        assert.equal(resp.data.is_paying_customer, false)
                        assert.equal(resp.data.billing.first_name, mockup.billing.first_name);
                        assert.equal(resp.data.billing.last_name, mockup.billing.last_name);
                        assert.equal(resp.data.billing.company, mockup.billing.company);
                        assert.equal(resp.data.billing.address_1, mockup.billing.address_1);
                        assert.equal(resp.data.billing.address_2, mockup.billing.address_2);
                        assert.equal(resp.data.billing.city, mockup.billing.city);
                        assert.equal(resp.data.billing.state, mockup.billing.state);
                        assert.equal(resp.data.billing.postcode, mockup.billing.postcode);
                        assert.equal(resp.data.billing.country, mockup.billing.country);
                        assert.equal(resp.data.billing.email, mockup.billing.email);
                        assert.equal(resp.data.billing.phone, mockup.billing.phone);

                        assert.equal(resp.data.shipping.first_name, mockup.shipping.first_name);
                        assert.equal(resp.data.shipping.last_name, mockup.shipping.last_name);
                        assert.equal(resp.data.shipping.company, mockup.shipping.company);
                        assert.equal(resp.data.shipping.address_1, mockup.shipping.address_1);
                        assert.equal(resp.data.shipping.address_2, mockup.shipping.address_2);
                        assert.equal(resp.data.shipping.city, mockup.shipping.city);
                        assert.equal(resp.data.shipping.state, mockup.shipping.state);
                        assert.equal(resp.data.shipping.postcode, mockup.shipping.postcode);
                        assert.equal(resp.data.shipping.country, mockup.shipping.country);
                        done();
                    });
            });

    });

    it('should be Customer post use token', (done) => {
        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.email, mockup.email);
                assert.equal(resp.data.first_name, mockup.first_name);
                assert.equal(resp.data.last_name, mockup.last_name);
                assert.equal(resp.data.username, mockup.username);

                assert.equal(resp.data.billing.first_name, mockup.billing.first_name);
                assert.equal(resp.data.billing.last_name, mockup.billing.last_name);
                assert.equal(resp.data.billing.company, mockup.billing.company);
                assert.equal(resp.data.billing.address_1, mockup.billing.address_1);
                assert.equal(resp.data.billing.address_2, mockup.billing.address_2);
                assert.equal(resp.data.billing.city, mockup.billing.city);
                assert.equal(resp.data.billing.state, mockup.billing.state);
                assert.equal(resp.data.billing.postcode, mockup.billing.postcode);
                assert.equal(resp.data.billing.country, mockup.billing.country);
                assert.equal(resp.data.billing.email, mockup.billing.email);
                assert.equal(resp.data.billing.phone, mockup.billing.phone);

                assert.equal(resp.data.shipping.first_name, mockup.shipping.first_name);
                assert.equal(resp.data.shipping.last_name, mockup.shipping.last_name);
                assert.equal(resp.data.shipping.company, mockup.shipping.company);
                assert.equal(resp.data.shipping.address_1, mockup.shipping.address_1);
                assert.equal(resp.data.shipping.address_2, mockup.shipping.address_2);
                assert.equal(resp.data.shipping.city, mockup.shipping.city);
                assert.equal(resp.data.shipping.state, mockup.shipping.state);
                assert.equal(resp.data.shipping.postcode, mockup.shipping.postcode);
                assert.equal(resp.data.shipping.country, mockup.shipping.country);
                done();
            });
    });

    it('should be customer put use token', function (done) {

        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    first_name: 'name update'
                }
                request(app)
                    .put('/api/customers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.first_name, update.first_name);
                        assert.equal(resp.data.last_name, mockup.last_name);
                        assert.equal(resp.data.username, mockup.username);

                        assert.equal(resp.data.billing.first_name, mockup.billing.first_name);
                        assert.equal(resp.data.billing.last_name, mockup.billing.last_name);
                        assert.equal(resp.data.billing.company, mockup.billing.company);
                        assert.equal(resp.data.billing.address_1, mockup.billing.address_1);
                        assert.equal(resp.data.billing.address_2, mockup.billing.address_2);
                        assert.equal(resp.data.billing.city, mockup.billing.city);
                        assert.equal(resp.data.billing.state, mockup.billing.state);
                        assert.equal(resp.data.billing.postcode, mockup.billing.postcode);
                        assert.equal(resp.data.billing.country, mockup.billing.country);
                        assert.equal(resp.data.billing.email, mockup.billing.email);
                        assert.equal(resp.data.billing.phone, mockup.billing.phone);

                        assert.equal(resp.data.shipping.first_name, mockup.shipping.first_name);
                        assert.equal(resp.data.shipping.last_name, mockup.shipping.last_name);
                        assert.equal(resp.data.shipping.company, mockup.shipping.company);
                        assert.equal(resp.data.shipping.address_1, mockup.shipping.address_1);
                        assert.equal(resp.data.shipping.address_2, mockup.shipping.address_2);
                        assert.equal(resp.data.shipping.city, mockup.shipping.city);
                        assert.equal(resp.data.shipping.state, mockup.shipping.state);
                        assert.equal(resp.data.shipping.postcode, mockup.shipping.postcode);
                        assert.equal(resp.data.shipping.country, mockup.shipping.country);
                        done();
                    });
            });

    });

    it('should be customer delete use token', function (done) {

        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be customer get not use token', (done) => {
        request(app)
            .get('/api/customers')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be customer post not use token', function (done) {

        request(app)
            .post('/api/customers')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be customer put not use token', function (done) {

        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/customers/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be customer delete not use token', function (done) {

        request(app)
            .post('/api/customers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/customers/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Customer.remove().exec(done);
    });

});
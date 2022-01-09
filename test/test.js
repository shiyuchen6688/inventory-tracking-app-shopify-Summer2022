let mongoose = require("mongoose")
let Item = require("../models/item")
// test dependencies 
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should()
chai.use(chaiHttp);

describe('Items API', () => {
    beforeEach((done) => {
        Item.deleteMany({}, (err) => {
            done();
        });
    });

    /*
     * Test the GET route
     */
    describe('/GET item', () => {
        it('GET all the items', (done) => {
            chai.request(server)
                .get('/api/items')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('All items successfully retrieved');
                    res.body.items.should.be.a('array');
                    res.body.items.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
     * Test the POST route
     */
    describe('/POST item', () => {
        it('POST an item', (done) => {
            let item = {
                name: "testItem",
                weight: 123.123,
                sourceAddress: "test source address",
                sourcePhone: "111111",
                destinationAddress: "test dest address",
                destinationPhone: "222222",
                delivered: false,
                category: "test category",
                description: "test description",
            }
            chai.request(server)
                .post('/api/items')
                .send(item)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('One item successfully added');
                    res.body.item.should.have.property('name');
                    res.body.item.should.have.property('weight');
                    res.body.item.should.have.property('sourceAddress');
                    res.body.item.should.have.property('sourcePhone');
                    res.body.item.should.have.property('destinationAddress');
                    res.body.item.should.have.property('destinationPhone');
                    res.body.item.should.have.property('delivered');
                    res.body.item.should.have.property('category');
                    res.body.item.should.have.property('description');
                    item["dateCreated"] = res.body.item.dateCreated
                    item["_id"] = res.body.item._id
                    res.body.item.should.deep.equal(item);
                    done();
                });
        });
    });

    /*
     * Test the GET/:id route
     */
    describe('/GET/:id item', () => {
        it('GET a item by item id', (done) => {
            let item = {
                name: "testItem",
                weight: 123.123,
                sourceAddress: "test source address",
                sourcePhone: "111111",
                destinationAddress: "test dest address",
                destinationPhone: "222222",
                delivered: false,
                category: "test category",
                description: "test description",
            }

            chai.request(server)
                .post('/api/items')
                .send(item)
                .end((err, res) => {
                    const id = res.body.item._id
                    chai.request(server)
                        .get('/api/items/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('One item successfully retrieved');
                            res.body.item = res.body.item[0]
                            res.body.item.should.have.property('name');
                            res.body.item.should.have.property('weight');
                            res.body.item.should.have.property('sourceAddress');
                            res.body.item.should.have.property('sourcePhone');
                            res.body.item.should.have.property('destinationAddress');
                            res.body.item.should.have.property('destinationPhone');
                            res.body.item.should.have.property('delivered');
                            res.body.item.should.have.property('category');
                            res.body.item.should.have.property('description');
                            item["dateCreated"] = res.body.item.dateCreated
                            item["_id"] = res.body.item._id
                            res.body.item.should.deep.equal(item);
                            done();
                        });
                })



        });
    });

    /*
     * Test the PUT/:id route
     */
    describe('/PUT/:id item', () => {
        it('UPDATE an item by item id', (done) => {
            let item = {
                name: "testItem",
                weight: 123.123,
                sourceAddress: "test source address",
                sourcePhone: "111111",
                destinationAddress: "test dest address",
                destinationPhone: "222222",
                delivered: false,
                category: "test category",
                description: "test description",
            }
            let updatedItem = {
                name: "testItem updated",
                weight: 321.321,
                sourceAddress: "test source address updated",
                sourcePhone: "111111 updated",
                destinationAddress: "test dest address updated",
                destinationPhone: "222222 updated",
                delivered: true,
                category: "test category updated",
                description: "test description updated",
            }

            chai.request(server)
                .post('/api/items')
                .send(item)
                .end((err, res) => {
                    const id = res.body.item._id
                    chai.request(server)
                        .put('/api/items/' + id)
                        .send(updatedItem)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('One item successfully updated');
                            done();
                        });


                })
        });
    });

    /*
     * Test the DELETE/:id route
     */
    describe('/DELETE/:id item', () => {
        it('DELETE an item by item id', (done) => {
            let item = {
                name: "testItem",
                weight: 123.123,
                sourceAddress: "test source address",
                sourcePhone: "111111",
                destinationAddress: "test dest address",
                destinationPhone: "222222",
                delivered: false,
                category: "test category",
                description: "test description",
            }

            chai.request(server)
                .post('/api/items')
                .send(item)
                .end((err, res) => {
                    const id = res.body.item._id
                    chai.request(server)
                        .delete('/api/items/' + id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('One item successfully deleted');
                            done();
                        });
                })
        });
    });
});
const expect = require('chai').expect;

const { get, getById, post } = require('../../routes/productsController');

let req = {
    body: {},
    params: {},
};

const res = {
    jsonCalledWith: {},
    json(arg) {
        this.jsonCalledWith = arg
    }
}

describe('Products Route', function () {
    describe('get() function', function () {
        it('should return object with title ', function () {
            get(req, res);
            expect(res.jsonCalledWith).to.be.eql({ title: 'Products page' });
        });

        it('should receive return by id ', function () {
            const getReq = req;
            getReq.params = {
                id: 1
            };
            getById(getReq, res);
            expect(res.jsonCalledWith).to.be.have.key('success')
        });
        it('test description ', function () {
            const getReq = req;
            getReq.body = {
                id: 1,
                name: 'Product 1',
                description: 'Product1',
                price: 19.00
            };
            post(getReq, res);
            expect(res.jsonCalledWith).to.be.eql({ error: 'Description < 10' })
        });
        it('test price ', function () {
            const getReq = req;
            getReq.body = {
                id: 1,
                name: 'Product 1',
                description: 'Product1 description',
                price: -19.00
            };
            post(getReq, res);
            expect(res.jsonCalledWith).to.be.eql({ error: 'Price <= 0' })
        });
    })
});
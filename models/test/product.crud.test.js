// const Product = require('../product.model');
// const expect = require('chai').expect;
// const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
// const mongoose = require('mongoose');

// describe('Product', () => {

//   before(async () => {
//     try {
//       const fakeDB = new MongoMemoryServer();
//       const uri = await fakeDB.getConnectionString();
//       mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
//     } catch(err) {
//       console.log(err);
//     }
//   });

//   describe('Reading data', () => {

//     before(async () => {
//       const testDepOne = new Product({ name: 'Department #1', client: 'Mark' });
//       await testDepOne.save();
//     });
//     it('should return all the data with "find" method', async () => {
//       const products = await Product.find();
//       const expectedLength = 1;
//       expect(products.length).to.be.equal(expectedLength)
//     });
  
//   });

//   after(() => {
//     mongoose.models = {};
//   });
// });
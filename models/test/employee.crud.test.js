const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getConnectionString();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    } catch(err) {
      console.log(err);
    };
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Jaga', department: 'Mark' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Jagaz', department: 'Mark' });
      await testEmpTwo.save();
    })
  
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async() => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      const expectedName = 'Employee #1';
      expect(employee.firstName).to.be.equal(expectedName);
    })

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Employee #1', lastName: 'Jaga', department: 'Mark' });
      await employee.save();
      const savedEmployee = await Employee.findOne({ firstName: 'Employee #1' });
      expect(savedEmployee).to.not.be.null;
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Jaga', department: 'Mark' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Baba', department: 'Bob' });
      await testEmpTwo.save();
    })

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'Employee #1' }, { $set: { firstName: '=Employee #1=', lastName: 'Jaga', department: 'Mark' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Employee #1' });
      employee.firstName = '=Employee #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Cruise', department: 'Drums' }});
      const employees = await Employee.find();
      expect(employees[0].firstName).to.equal('Updated!');
      expect(employees[1].firstName).to.equal('Updated!');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Jaga', department: 'Mark' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Baba', department: 'Bob' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({firstName: 'Employee #1'});
      const updatedEmployee = await Employee.find();
      expect(updatedEmployee.length).to.equal(1);
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({firstName: 'Employee #1'});
      await employee.remove();
      const removedEmployee = await Employee.findOne({firstName: 'Employee #1'});
      expect(removedEmployee).to.equal(null);
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany({});
      const updatedEmployee = await Employee.find();
      expect(updatedEmployee.length).to.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});


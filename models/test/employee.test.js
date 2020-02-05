const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  it('should throw an error if no arg', () => {
    const emp = new Employee({}); // create new Employee, but don't set `name` attr value
  
    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if not all args', () => {
    const firstName = 'Mark';
    const lastName = 'Ronson'
    const department = 'curtains';
    let emp = new Employee({firstName, lastName});
  
    emp.validate(err => {
      expect(err).to.exist;
    });

    emp = new Employee({firstName});
  
    emp.validate(err => {
      expect(err).to.exist;
    });

    emp = new Employee({department, lastName});
  
    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if any argument is not a string', () => {
    const string = 'string';
    const number = 2;
    const object = {};
    const undef = undefined;
    
    let emp = new Employee({string, number, object});
  
    emp.validate(err => {
      expect(err).to.exist;
    });

    emp = new Employee({undef, string, string});
  
    emp.validate(err => {
      expect(err).to.exist;
    });

    emp = new Employee({string, string, object});
  
    emp.validate(err => {
      expect(err).to.exist;
    });
  });

  it('should return proper Employee object if the args are correct', () => {
    const firstName = 'Mark';
    const lastName = 'Bob';
    const department = 'carpentry';

    const emp = new Employee({firstName, lastName, department});

    emp.validate(err => {
      expect(err).to.not.exist;
    });
  });
});


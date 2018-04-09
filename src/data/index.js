/**
 * this is an in memory mock data layer
 */
const moment = require('moment');
const uuid = require('uuid');

let data = [
  {
    "id": "1",
    "name": "ABC",
    "status": "ACTIVE",
    "createdAt": "2018-03-29T18:44:48.989Z",
    "children": [],
  },
  {
    "id": "2",
    "name": "XYZ",
    "status": "INACTIVE",
    "createdAt": "2018-03-1T10:40:08.989Z",
    "children": [],
  }
];

module.exports = {
  getAll: () => {
    return data;
  },
  getParentById: (id) => {
    return data.find((item) => item.id == id);
  },
  createParent: ({model}) => {
    let a = Object.assign({ 
      id: uuid(), 
      createdAt: moment().toISOString(),
      status: 'ACTIVE',      
    }, model);
    data.push(a);
    return a;
  },
  addChild: (child) => {    
    console.log('starting add Child ', child)
    const newOne = {
      id: uuid(),
      createdAt: moment().toISOString(),      
    };
    let a = Object.assign({}, newOne, child);
    const parent = data.find((item) => item.id == child.parentId);
    parent.children.push(a);
    return a;
  },
  getChildrenByParentId: (id) => {
    const parent = data.find((item) => item.id == id);
    return parent.children;
  }
};
module.exports = {
  examplesText: `
  query GetAllParents{
    getAll{
      id
      name
      status
      createdAt
      
    }  
  }
  
  query GetParentByID{
      getById(id: "1"){
      id
      name
      status
      createdAt
    }
  }
  
  mutation CreateParent {
    create(model:{
      name: "wewe"  
    }) {
      id
    }
  }
  
  `,
};
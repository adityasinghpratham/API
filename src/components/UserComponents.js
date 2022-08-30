import React from 'react'
import Table from 'react-bootstrap/Table';
import { Component } from 'react' 
import axios from 'axios';
export class UserComponents extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[]
     
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8080/api/v1/employee")
    .then((res)=>{
      this.setState({
        users:res.data,
      })
    })
  }
  submit(evenet,id){
    evenet.preventDefault();
    if(id){
      axios.post("http://localhost:8080/api/v1/employee/",{
      id: this.state.id,
      name: this.state.name,
      experience: this.state.experience,
      designation: this.state.designation
      }).then(()=>{
        this.componentDidMount();
      })
    }
    
    if(id){
      axios.put("http://localhost:8080/api/v1/employee",{
        id:id,
        name:this.state.name,
        experience:this.state.experience,
        designation:this.state.designation
      }).then(()=>{
        this.componentDidMount();
      })
    }
  }
  delete(id){
    axios.delete("http://localhost:8080/api/v1/employee/"+id)
    .then(()=>{
      this.componentDidMount();
    })
  }
  edit(id){
    axios.get("http://localhost:8080/api/v1/employee/"+id)
    .then((res)=>{
      this.setState({
        id: res.data.id,
        name: res.data.name,
        experience: res.data.experience,
        designation: res.data.designation
      });
    }) 
  }
  render(){
    return (
      <div className="container">
         <div className="row">
         <div className="col s6">
          <h1>Form for User</h1>
                 <form className="form-group" onSubmit={(e)=>this.submit(e,this.state.id)}>
                 <div className="input-field col s12">
                 <label htmlFor="autocomplete-input" className="form-check-label"><h3>Enter Id</h3></label>
                 <br />
                    <input value={this.state.id} onChange={(e)=>this.setState({id:e.target.value})} type="text" id="autocomplete-input" className="form-control"  />
                   
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="autocomplete-input"><h3>Enter Name</h3></label>
                  <br />
                    <input value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="text" id="autocomplete-input" className="autocomplete form-control"  />
                    
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="autocomplete-input"><h3>Enter Experience</h3></label>
                  <br />
                    <input value={this.state.experience} onChange={(e)=>this.setState({experience:e.target.value})} type="text" id="autocomplete-input" className="autocomplete form-control"  />
                    
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="autocomplete-input"><h3>Enter Designation</h3></label>
                  <br />
                    <input value={this.state.designation} onChange={(e)=>this.setState({designation:e.target.value})} type="text" id="autocomplete-input" className="autocomplete form-control"  />
                    
                  </div>
                  <button type="submit" name="action" class="btn btn-success pad">Submit</button>
                 </form>
          </div>          
          <div className="col s6">
          <h1>Users List</h1>
          <Table striped bordered hover variant="dark">
        <thead>
          
          <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Designation</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
            {
              this.state.users.map(user =>
                  <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.experience}</td>
                      <td>{user.designation}</td>
                      <td>
                        <button onClick={(e)=>this.edit(user.id)} type="submit" name="action" class="btn btn-warning">Edit</button>       
                      </td>
                      <td>
                      <button onClick={(e)=>this.delete(user.id)} type="submit" name="action" class="btn btn-danger">Delete</button>       
                      </td>
                  </tr>
                )
            }
         

        </tbody>
      </Table>
          </div>                
          </div>              
      </div>
    );
  }
}

export default UserComponents
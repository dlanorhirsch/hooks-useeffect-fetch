import React from 'react'

export default class MyData extends React.Component{
  constructor(){
    super()
      this.state = {
        data: []
    }
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  render() {
    return (
        <div>
            {this.state.data.map(item => <div key={item.id}>
              <div style={{
                border:"1px solid #aaa",
                margin:"5px",
                paddingLeft: "10px",
                width: "300px"
              }}> 
                <h3>Name: {item.name}</h3>
                <div>Company: {item.company.name}</div>
                <div>User Name: {item.username}</div>
                <div>Email: {item.email}</div>
                <div>Item: {item.phone}</div>
                <br />
              </div>  
            </div>)}
        </div>
    )
  }
}



// export default MyData
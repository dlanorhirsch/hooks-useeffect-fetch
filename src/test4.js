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
        <>
            {this.state.data.map(item => <div key={item.id}>
              <div>
                {item.name}
                {/* {item.company} */}
              </div>
            </div>)}
        </>
    )
  }
}



// export default MyData
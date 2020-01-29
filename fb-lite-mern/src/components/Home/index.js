import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Member = props => (
    <tr>
      <td>{props.member.email}</td>
      <td>{props.member.visibility}</td>
      <td>
        <Link to={"/edit/"+props.member._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMember(props.member._id) }}>delete</a>
      </td>
    </tr>
  )

  export default class MembersList extends Component {
    constructor(props) {
      super(props);
  
      this.deleteMember = this.deleteMember.bind(this)
  
      this.state = {members: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:5000/members/')
        .then(response => {
          this.setState({ members: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }
  
    deleteMember(id) {
      axios.delete('http://localhost:5000/members/'+id)
        .then(response => { console.log(response.data)});
  
      this.setState({
        members: this.state.members.filter(el => el._id !== id)
      })
    }
  
    memberList() {
      return this.state.members.map(member => {
        return <Member member={member} deleteMember={this.deleteMember} key={member._id}/>;
      })
    }
  
    render() {
      return (
        <div>
          <h3>Registered Users</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Email</th>
                <th>Visibility</th>
              </tr>
            </thead>
            <tbody>
              { this.memberList() }
            </tbody>
          </table>
        </div>
      )
    }
  }
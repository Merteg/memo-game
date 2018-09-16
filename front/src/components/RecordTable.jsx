import React, { Component } from 'react';
import { request } from '../utils';


export default class RecordTable extends Component {
  state = {
    recordsArr: [],
  }

  componentDidMount() {
    request('/record').then(data => {
      console.log(data);
      if (data.success) {
        this.setState({ recordsArr: data.records });
      }
    });
  }

  render() {
    return (
      <table className="record-table">
        <thead>
          <tr className="record-row">
            <th>Position</th>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.state.recordsArr.map((element, index) => {
            return (
              <tr key={index} className="record-row">
                <td>{index}</td>
                <td>{element[0]}</td>
                <td>{element[1]}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

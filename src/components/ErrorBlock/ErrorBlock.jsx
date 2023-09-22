import React from 'react'
import { Button } from 'antd'

import './ErrorBlock.scss'

class Error extends React.Component {
  constructor() {
    super()
    this.getMainPage = () => {
      this.props.errorUpdate()
    }
  }
  render() {
    return (
      <section className="Error">
        <h5 className="errorHeader">Oops, looks like something went wrong</h5>
        <Button type="text" block onClick={this.getMainPage} className="Button">
          While we are solving the problem, you can return to the <span className="Link">. main page</span>.
        </Button>
      </section>
    )
  }
}
export default Error

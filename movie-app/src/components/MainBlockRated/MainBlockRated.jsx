import React from 'react'
import { Pagination } from 'antd'

import Rated from '../RatingPoster/RatingPoster'

class RatedBlock extends React.Component {
  render() {
    return (
      <section className="RatedContainer">
        <main>
          <Rated rating={this.props.rating} ratingLoaded={this.props.ratingLoaded} />
        </main>
        <footer>
          <Pagination defaultCurrent={1} total={50} onChange={(page) => this.props.getPage(page, 'rated')} />
        </footer>
      </section>
    )
  }
}

export default RatedBlock

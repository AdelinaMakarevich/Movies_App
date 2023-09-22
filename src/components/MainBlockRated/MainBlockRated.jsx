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
          {this.props.totalPages > 1 ? (
            <Pagination
              defaultCurrent={1}
              total={this.props.totalPages}
              pageSize={1}
              onChange={(page) => this.props.getPage(page, 'rated')}
            />
          ) : (
            ''
          )}
        </footer>
      </section>
    )
  }
}

export default RatedBlock

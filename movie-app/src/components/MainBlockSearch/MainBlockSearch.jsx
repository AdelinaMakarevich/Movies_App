import React from 'react'
import { Pagination } from 'antd'
import { Input } from 'antd'
import _ from 'lodash'
import Poster from '../MoviePoster'
import './MainBlockSearch.scss'
class SearchBlock extends React.Component {
  constructor() {
    super()
    this.state = {
      page: '&page=1',
      search: '',
    }

    this.search = _.debounce((event) => {
      this.props.search(event)
    }, 1000)
  }
  render() {
    return (
      <section className="searchContainer">
        <header>
          <Input className="searchLine" placeholder="Type to search..." onChange={this.search} />
        </header>
        <main>
          <Poster
            error={this.props.error}
            isLoaded={this.props.isLoaded}
            movie={this.props.movie}
            genreLoaded={this.props.genreLoaded}
            postRating={this.props.postRating}
          />
        </main>
        <footer>
          <Pagination defaultCurrent={1} total={50} onChange={(page) => this.props.getPage(page, 'search')} />
        </footer>
      </section>
    )
  }
}

export default SearchBlock

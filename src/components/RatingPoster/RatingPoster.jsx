import React from 'react'
import { Image, Rate, Spin } from 'antd'

import { GenreContext } from '../GenreContext'
import { Style, Text } from '../MoviePoster/helper'

import '../MoviePoster/MoviePoster.scss'

class Rated extends React.Component {
  render() {
    const genre = this.context
    if (this.props.ratingLoaded) {
      return (
        <div className="Poster">
          {this.props.rating.length === 0 ? (
            <p className="RatedParagraph">Nothing.</p>
          ) : (
            this.props.rating.map((item) => {
              let url
              if (item.poster_path !== null) {
                url = `https://image.tmdb.org/t/p/original${item.poster_path}`
              } else {
                url =
                  'https://img.freepik.com/free-photo/top-view-movie-lettering-on-yellow-background-with-copy-space_23-2148425108.jpg?w=740&t=st=1694384695~exp=1694385295~hmac=240ac5fad02ba4f14eddc1a2a9185c93c9dc26e97ed38c6a8c7f3f5e230e8efa'
              }
              const element = item.genre_ids.map((id_genre) => {
                let result = genre.filter((item) => item.id === id_genre)
                return (
                  <div className="genre" key={result[0].id}>
                    {result[0].name}
                  </div>
                )
              })
              return (
                <section className="posterBlock" key={item.id}>
                  <div className="image">
                    <Image src={url} />
                  </div>
                  <div className="informationBlock">
                    <div className="Header">
                      <h5>{item.title}</h5>
                      <div className="Vote" style={Style(item.vote_average)}>
                        {item.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <p className="date">{item.release_date}</p>
                    <div className="genreBlock">{element}</div>
                    <p className="text">{Text(item)}</p>
                    <Rate count={10} disabled defaultValue={item.rating} />
                  </div>
                </section>
              )
            })
          )}
        </div>
      )
    } else {
      return (
        <Spin tip="Loading" size="large">
          <div className="Poster" style={{ height: '45vw' }} />
        </Spin>
      )
    }
  }
}
Rated.contextType = GenreContext

export default Rated

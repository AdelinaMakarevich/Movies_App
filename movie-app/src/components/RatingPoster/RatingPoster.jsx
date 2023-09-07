import React from 'react'
import { Image } from 'antd'
import { Rate } from 'antd'
import { GenreContext } from '../GenreContext'
import { Spin } from 'antd'
import '../MoviePoster/MoviePoster.scss'

class Rated extends React.Component {
  render() {
    const genre = this.context
    if (this.props.ratingLoaded) {
      return (
        <div className="Poster">
          {this.props.rating.length === 0 ? (
            <p style={{ fontFamily: 'Inter UI', fontSize: '20px', textAlign: 'left', margin: 50, marginBottom: '75%' }}>
              Nothing.
            </p>
          ) : (
            this.props.rating.map((item) => {
              const element = item.genre_ids.map((id_genre) => {
                let result = genre.filter((item) => item.id === id_genre)
                return (
                  <div className="genre" key={result[0].id}>
                    {result[0].name}
                  </div>
                )
              })
              let styles
              if (item.vote_average < 3) {
                styles = { border: `2px solid #E90000` }
              } else if (item.vote_average >= 3 && item.vote_average < 5) {
                styles = { border: `2px solid #E97E00` }
              } else if (item.vote_average >= 5 && item.vote_average < 7) {
                styles = { border: `2px solid #E9D100` }
              } else if (item.vote_average >= 7) {
                styles = { border: `2px solid #66E900` }
              }

              let text = item.overview
              if (text.length > 230) {
                text = text.slice(0, 230)
                let lastIndex = text.lastIndexOf(' ')
                text = text.substring(0, lastIndex) + '...'
              }
              return (
                <section className="posterBlock" key={item.id}>
                  <div className="image">
                    <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
                  </div>
                  <div className="informationBlock">
                    <div className="Header">
                      <h5>{item.title}</h5>
                      <div className="Vote" style={styles}>
                        {item.vote_average.toFixed(1)}
                      </div>
                    </div>
                    <p className="date">{item.release_date}</p>
                    <div className="genreBlock">{element}</div>
                    <p className="text">{text}</p>
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

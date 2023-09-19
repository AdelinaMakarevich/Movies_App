import React, { Component } from 'react'
import { Tabs } from 'antd'

import SearchBlock from './components/MainBlockSearch'
import RatedBlock from './components/MainBlockRated'
import { request } from './components/Services/MovieRequest'
import { genre } from './components/Services/GenreRequest'
import { postRating } from './components/Services/PostRequest'
import { ratingRequest } from './components/Services/RatingRequest'
import Error from './components/ErrorBlock'
import { GenreContext } from './components/GenreContext'

import './App.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      genre: [],
      genreLoaded: false,
      error: undefined,
      isLoaded: false,
      items: [],
      page: '1',
      search: '',
      guestSession: undefined,
      ratingError: undefined,
      ratingLoaded: false,
      rating: [],
      ratingPage: '1',
    }

    this.search = (event) => {
      this.setState({
        search: event.target.value,
      })
      setTimeout(() => {
        request(this.state.search, this.state.page).then((result) => this.setState({ items: result.items }))
      }, 1000)
    }

    this.getPage = (page, block) => {
      if (block === 'search') {
        this.setState({
          page: page,
        })
        setTimeout(() => {
          request(this.state.search, this.state.page).then((result) =>
            this.setState({ items: result.items, isLoaded: true })
          )
        }, 1000)
      } else {
        this.setState({
          ratingPage: page,
        })
        setTimeout(() => {
          ratingRequest(this.state.guestSession, this.state.ratingPage).then((result) =>
            this.setState({ rating: result.rating, ratingLoaded: result.ratingLoaded })
          )
        }, 1000)
      }
    }

    this.errorUpdate = () => {
      this.setState({
        error: undefined,
        isLoaded: false,
        items: [],
        page: '1',
        search: '',
        guestSession: undefined,
        ratingError: undefined,
        ratingLoaded: false,
        rating: [],
        ratingPage: '1',
      })
    }

    this.getGuestSession = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
      return fetch(
        'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=b029cfb27d4d05afb5d2401c555deade',
        options
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            guestSession: result.guest_session_id,
          })
        })
    }
    this.getGuestSession()

    genre().then((result) => this.setState({ genre: result.genre, genreLoaded: true }))
    request(this.state.search, this.state.page).then((result) => this.setState({ items: result.items, isLoaded: true }))
  }

  render() {
    this.items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <SearchBlock
            getPage={this.getPage}
            search={this.search}
            postRating={(id, gen) => {
              postRating(id, gen, this.state.guestSession).then((result) => {
                if (result.ratingError !== undefined) {
                  this.setState({ ratingError: result.ratingError })
                }
              })
            }}
            error={this.state.error}
            isLoaded={this.state.isLoaded}
            movie={this.state.items}
            genreLoaded={this.state.genreLoaded}
          />
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: (
          <RatedBlock rating={this.state.rating} ratingLoaded={this.state.ratingLoaded} getPage={this.getPage} />
        ),
      },
    ]
    if (this.state.error != undefined || this.state.ratingError != undefined) {
      return <Error errorUpdate={this.errorUpdate} movie={this.getMovie} />
    } else {
      return (
        <GenreContext.Provider value={this.state.genre}>
          <section className="AppContainer">
            <Tabs
              defaultActiveKey="1"
              centered
              items={this.items}
              onChange={() => {
                if (this.state.guestSession !== undefined) {
                  ratingRequest(this.state.guestSession, this.state.ratingPage).then((result) =>
                    this.setState({ rating: result.rating, ratingLoaded: result.ratingLoaded })
                  )
                }
              }}
            />
          </section>
        </GenreContext.Provider>
      )
    }
  }
}

export default App

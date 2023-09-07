import React, { Component } from 'react'

import { Tabs } from 'antd'
import SearchBlock from './components/MainBlockSearch'
import RatedBlock from './components/MainBlockRated'
import Error from './components/ErrorBlock'

import './App.scss'
import { GenreContext } from './components/GenreContext'

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
    }

    this.getPage = (page, block) => {
      if (block === 'search') {
        this.setState({
          page: page,
        })
      } else {
        this.setState({
          ratingPage: page,
          ratingLoaded: false,
        })
        setTimeout(this.getRating, 1000)
      }
    }
    this.getGenre = () => {
      let url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI5Y2ZiMjdkNGQwNWFmYjVkMjQwMWM1NTVkZWFkZSIsInN1YiI6IjY0ZGE5NTY5ZjQ5NWVlMDI5MWEwN2Q2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0QaQYJO5sSJCGMlXO2TnXQffvp_YbbnhON9fK4ySRM',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            genre: result.genres,
            genreLoaded: true,
          })
        })
    }
    this.getMovie = () => {
      let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=b029cfb27d4d05afb5d2401c555deade&page=${this.state.page}`
      if (this.state.search != /^\s+$/ && this.state.search != 0) {
        url =
          'https://api.themoviedb.org/3/search/movie?query=' +
          this.state.search +
          '&include_adult=false&language=en-US' +
          this.state.page
      }
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDI5Y2ZiMjdkNGQwNWFmYjVkMjQwMWM1NTVkZWFkZSIsInN1YiI6IjY0ZGE5NTY5ZjQ5NWVlMDI5MWEwN2Q2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0QaQYJO5sSJCGMlXO2TnXQffvp_YbbnhON9fK4ySRM',
        },
      })
        .then((response) => response.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result.results,
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error: error,
            })
          }
        )
    }
    this.getGuestSession = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
      fetch(
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

    this.postRating = (id, genre) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          value: genre,
        }),
      }
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=b029cfb27d4d05afb5d2401c555deade&guest_session_id=${this.state.guestSession}`,
        options
      ).catch((error) => {
        this.setState({
          ratingError: error,
        })
      })
    }

    this.getRating = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }

      fetch(
        `https://api.themoviedb.org/3/guest_session/${this.state.guestSession}/rated/movies?api_key=b029cfb27d4d05afb5d2401c555deade&language=en-US&page=${this.state.ratingPage}&sort_by=created_at.asc`,
        options
      )
        .then((response) => response.json())
        .then((result) => {
          this.setState({
            rating: result.results,
            ratingLoaded: true,
          })
        })
        .catch((error) => {
          this.setState({
            ratingLoaded: true,
            ratingError: error,
          })
        })
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
    this.getGenre()
    this.getGuestSession()
  }

  render() {
    setInterval(() => this.getMovie(), 5000)
    this.items = [
      {
        key: '1',
        label: `Search`,
        children: (
          <SearchBlock
            getPage={this.getPage}
            search={this.search}
            postRating={this.postRating}
            error={this.state.error}
            isLoaded={this.state.isLoaded}
            movie={this.state.items}
            genreLoaded={this.state.genreLoaded}
          />
        ),
      },
      {
        key: '2',
        label: `Rated`,
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
            <Tabs defaultActiveKey="1" centered items={this.items} onChange={this.getRating} />
          </section>
        </GenreContext.Provider>
      )
    }
  }
}

export default App

import React from 'react';
import { Image } from 'antd';
import { Rate } from 'antd';
import './movie_poster.css'

class Poster extends React.Component {
    render() {
        return(
            <section className='posterBlock'>
                <div className='image'>
                <Image
                    width={183}
                    height={281}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                </div>
                <div className='informationBlock'>
                <h5>Lorem</h5>
                <p className='date'>March 2, 12</p>
                <div className='genre'>Drama</div>
                <div className='genre'>Drema</div>
                <p className='text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Rate />
                </div>
            </section>
        )
    }
}

export default Poster;
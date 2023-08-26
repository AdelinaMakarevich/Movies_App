import React from 'react';
import { Pagination } from 'antd';
import { Input } from 'antd';
import Poster from './movie_poster';
import './main_block_search.css'
class SearchBlock extends React.Component {
    render() {
        return(
            <section className='searchContainer'>
                <header>  
                    <Input className='searchLine' placeholder="Type to search..." />
                </header>
                <main>
                    <Poster />
                </main>
                <footer>
                    <Pagination defaultCurrent={1} total={50} />;
                </footer>
            </section>
        )
    }
}

export default SearchBlock;
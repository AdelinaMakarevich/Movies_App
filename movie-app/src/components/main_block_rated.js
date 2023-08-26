import React from 'react';
import { Pagination } from 'antd';
import { Input } from 'antd';
class RatedBlock extends React.Component {
    render() {
        return(
            <section>
            <header>  
                <Input placeholder="Type to search..." />
            </header>
            <footer>
                <Pagination defaultCurrent={1} total={50} />;
            </footer>
            </section>
            )
    }
}

export default RatedBlock;
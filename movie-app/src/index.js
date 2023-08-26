import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from 'antd';
import SearchBlock from './components/main_block_search';
import RatedBlock from './components/main_block_rated';
import './index.css';

export default class App extends React.Component {
  render() {
    const onChange = (key) => {
      console.log(key);
    };
    const items = [
      {
        key: '1',
        label: `Search`,
        children: <SearchBlock />,
      },
      {
        key: '2',
        label: `Rated`,
        children: <RatedBlock />,
      }
    ];
    return (
      <section className='mainContainer'>
          <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
      </section>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

# Stateful
#### An easy way to write stateful [React](https://reactjs.org/) components

```javascript
import Stateful from '@react-rangers/stateful';

const App = () => (
  <Stateful initialState={{ count: 0 }}>
    {state => (
      <button onClick={() => { state.count += 1; }}>
        {state.count}
      </button>
    )}
  </Stateful>  
)
```

Here's the same app written in standard way as of React 16

```javascript
class App extends React.Component {
  state = {
    count: 0,
  };

  render() {
    <button onClick={() => this.setState({ count: state.count + 1})}>
      {state.count}
    </button>    
  }
}
```

Please check out [the introductory blog post](https://medium.com/react-rangers/an-easy-way-to-write-stateful-react-components-f210f253f520)
for more documentation and usage examples.

import * as React from 'react';

import { watch, watchable } from '.';

/**
 * Props:
 * - initialState (object or function returning object), only considered by constructor
 */
export default class Stateful extends React.Component {
  constructor(props) {
    super(props);

    const { initialState } = props;
    const state = watchable.object(
      typeof initialState === 'function' ? initialState() : initialState,
    );

    this.state = {
      state,
      data: props.compute({ state }),
    };
  }

  componentDidMount() {
    this._watchableCompute = watchable.value({
      get: () => this.props.compute,
    });

    this._handle = watch(() => {
      const { state } = this.state;
      this.setState({
        data: this._watchableCompute.get()({ state }),
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.compute !== prevProps.compute) {
      this._watchableCompute.set();
    }
  }

  componentWillUnmount() {
    if (this._handle) {
      this._handle.stop();
    }
  }

  render() {
    return this.props.children(this.state.data);
  }
}

Stateful.defaultProps = {
  /**
   * Default implementation marks dependency on all state properties and returns state
   */
  compute: ({ state }) => (Object.values(state), state),
  initialState: {},
};

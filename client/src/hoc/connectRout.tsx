import React from 'react';

function connectRoute(Component: any) {
  return class extends Component {
    shouldComponentUpdate(nextProps) {
      return nextProps.location !== this.props.location;
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

export default connectRoute;

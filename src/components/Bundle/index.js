import React from 'react'
import { setTimeout } from 'core-js/library/web/timers';

export default class Bundle extends React.Component {
  constructor (...attrs) {
    super(...attrs)
    this.state = {
      mod: null
    }
  }

  componentWillMount () {
    this.load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load (props) {
    this.setState({
      mod: null
    })

    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render () {
    return (
      this.props.children(this.state.mod)
    )
  }
}

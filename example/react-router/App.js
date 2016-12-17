import React from 'react'
import { render } from 'react-dom'

// 1. import a few components
import { HashRouter, Match, Miss, Link } from 'react-router'

const App = () => (
  // 2. render a `Router`, it will listen to the url changes
  //    and make the location available to other components
  //    automatically
  <HashRouter>
    <div>
      <ul>
        {/* 3. Link to some paths with `Link` */}
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
      </ul>
  
      <hr/>
  
      {/* 4. Render some `<Match/>` components.
             When the current location matches the `pattern`
             then the `component` will render.
      */}
      <Match exactly pattern='/' component={Home} />
      <Match pattern='/about' component={About} />
      <Match pattern='/topics' component={Topics} />
      <Match pattern='/:userId' component={User} />
  
      {/* If none of those match, then a sibling `Miss` will render. */}
      <Miss component={NoMatch}/>
    </div>
  </HashRouter>
)

const User = (props)=> {
  console.log(props)
  return (
    <div>
    <h2>--</h2>
  </div>)
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
)

const Topics = ({ pathname, pattern }) => (
  // 5. Components rendered by a `Match` get some routing-specific
  //    props, like the portion of the parent `pattern` that was
  //    matched against the current `location.pathname`, in this case
  //    `/topics`
  <div>
    <h2>Topics</h2>
    <ul>
      {/* 6. Use the parent's matched pathname to link relatively */}
      <li><Link to={`${pathname}/rendering`}>Rendering with React</Link></li>
      <li><Link to={`${pathname}/components`}>Components</Link></li>
      <li><Link to={`${pathname}/props-v-state`}>Props v. State</Link></li>
    </ul>

    {/* 7. Render more `Match` components to get nesting naturally
           within the render lifecycle. Use the parent's matched
           pathname to nest the url.
    */}
    <Match pattern={`${pathname}/:topicId`} component={Topic}/>

    {/* 8. use the `render` prop for convenient inline rendering */}
    <Match pattern={pathname} exactly render={() => (
      <h3>Please select a topic</h3>
    )}/>
  </div>
)

const Topic = ({ params }) => (
  // 9. the dynamic segments of a `pattern` (in this case `:topicId`)
  //    are parsed and sent to the component from `Match`.
  <div>
    <h3>{params.topicId}</h3>
  </div>
)

render(<App/>, document.querySelector('#root'))

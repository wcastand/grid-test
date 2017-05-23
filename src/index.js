import React from 'react'
import { render } from 'react-dom'
import unit from 'fela-plugin-unit'
import { createRenderer } from 'fela'
import { Provider, createComponent } from 'react-fela'
import namedMediaQuery from 'fela-plugin-named-media-query'

import './index.css'
const mountNode = document.getElementById('stylesheet')

const namedMediaQueryPlugin = namedMediaQuery({
  desktop: '@media (min-width: 1024px)',
  tablet: '@media (min-width: 768px)',
  mobile: '@media (max-width: 767px)',
})

const renderer = createRenderer({
  plugins: [unit(), namedMediaQueryPlugin],
})

const App = createComponent(
  () => ({
    width: '100vw',
    height: '100vh',
    backgroundColor: 'yellow',
    alignItems: 'stretch',
  }),
  Box,
)

const Box = createComponent(
  () => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  'div',
)

const Layout = createComponent(
  () => ({
    flexDirection: 'column',
    alignItems: 'stretch',
    '>div:first-child': { marginTop: 0 },
    '>div:first-last': { marginBottom: 0 },
  }),
  Box,
)

const Row = createComponent(
  ({ responsive = false }) => ({
    flexDirection: responsive ? 'column' : 'row',
    alignItems: 'stretch',
    '>div:first-child': { marginLeft: 0 },
    '>div:last-child': { marginRight: 0 },
    tablet: {
      flexDirection: 'row',
      margin: '5px 0',
    },
    desktop: {
      margin: '10px 0',
    },
  }),
  Box,
)

const Div = createComponent(
  ({ flex = '1' }) => ({
    flex,
    height: '100px',
    backgroundColor: 'red',
    border: '1px solid #272727',
    margin: '5px 0',
    tablet: {
      margin: '0 5px',
    },
    desktop: {
      margin: '0 10px',
    },
  }),
  Box,
)

render(
  <Provider renderer={renderer} mountNode={mountNode}>
    <App>
      <Layout>
        <Row responsive={true}>
          <Div flex="2">1</Div>
          <Div flex="1">2</Div>
        </Row>
        <Row responsive={false}>
          <Div>3</Div>
          <Div>4</Div>
        </Row>
      </Layout>
    </App>
  </Provider>,
  document.getElementById('app'),
)

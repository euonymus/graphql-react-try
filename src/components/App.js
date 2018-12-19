import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Login from './Login'
import Search from './Search'

import Quarks from './Quarks'
import QuarkTypes from './QuarkTypes'
import GluonTypes from './GluonTypes'
import QuarkProperties from './QuarkProperties'
import QtypeProperties from './QtypeProperties'

import AddQuark from './AddQuark'
import AddQuarkType from './AddQuarkType'
import AddGluonType from './AddGluonType'
import AddQuarkProperty from './AddQuarkProperty'
import AddQtypeProperty from './AddQtypeProperty'


class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/quarks/1' />} />
            <Route exact path='/login' component={Login} />

            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
            <Route exact path='/search' component={Search} />

n
            <Route exact path='/quarks/:page' component={Quarks} />
            <Route exact path='/quark-types' component={QuarkTypes} />
            <Route exact path='/gluon-types' component={GluonTypes} />
            <Route exact path='/quark-properties' component={QuarkProperties} />
            <Route exact path='/qtype-properties' component={QtypeProperties} />

            <Route exact path='/add-quark' component={AddQuark} />
            <Route exact path='/add-quark-type' component={AddQuarkType} />
            <Route exact path='/add-gluon-type' component={AddGluonType} />
            <Route exact path='/add-quark-property' component={AddQuarkProperty} />
            <Route exact path='/add-qtype-property' component={AddQtypeProperty} />
            
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;

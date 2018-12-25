import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'
import CreateLink from './CreateLink'
import Login from './Login'
import Search from './Search'

import QuarkDetail from './QuarkDetail'
import Quarks from './Quarks'
import QuarkTypes from './QuarkTypes'
import GluonTypes from './GluonTypes'
import QuarkProperties from './QuarkProperties'
import QtypeProperties from './QtypeProperties'
import QpropertyGtypes from './QpropertyGtypes'
import QpropertyTypes from './QpropertyTypes'

import AddQuark from './AddQuark'
import EditQuark from './EditQuark'
import DeleteQuark from './DeleteQuark'
import AddQuarkType from './AddQuarkType'
import AddGluonType from './AddGluonType'
import AddQuarkProperty from './AddQuarkProperty'
import AddQtypeProperty from './AddQtypeProperty'
import AddQpropertyGtype from './AddQpropertyGtype'
import AddQpropertyType from './AddQpropertyType'

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path='/create' component={CreateLink} />
            <Route exact path='/search' component={Search} />


            <Route exact path='/' render={() => <Redirect to='/quarks/1' />} />
            <Route exact path='/login' component={Login} />

            <Route exact path='/quark/:id' component={QuarkDetail} />
            <Route exact path='/quarks/:page' component={Quarks} />
            <Route exact path='/quark-types' component={QuarkTypes} />
            <Route exact path='/gluon-types' component={GluonTypes} />
            <Route exact path='/quark-properties' component={QuarkProperties} />
            <Route exact path='/qtype-properties' component={QtypeProperties} />
            <Route exact path='/qproperty-gtypes' component={QpropertyGtypes} />
            <Route exact path='/qproperty-types' component={QpropertyTypes} />

            <Route exact path='/add-quark' component={AddQuark} />
            <Route exact path='/edit-quark/:id' component={EditQuark} />
            <Route exact path='/delete-quark/:id' component={DeleteQuark} />
            <Route exact path='/add-quark-type' component={AddQuarkType} />
            <Route exact path='/add-gluon-type' component={AddGluonType} />
            <Route exact path='/add-quark-property' component={AddQuarkProperty} />
            <Route exact path='/add-qtype-property' component={AddQtypeProperty} />
            <Route exact path='/add-qproperty-gtype' component={AddQpropertyGtype} />
            <Route exact path='/add-qproperty-type' component={AddQpropertyType} />

          </Switch>
        </div>
      </div>
    )
  }
}

export default App;

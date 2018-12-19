import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <Link to="/qtype-properties" className="ml1 no-underline black">
            qtype properties
          </Link>
          <div className="ml1">|</div>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>
          <div className="ml1">|</div>
          <Link to="/top" className="ml1 no-underline black">
            top
          </Link>
          <div className="ml1">|</div>
          <Link to="/search" className="ml1 no-underline black">
            search
          </Link>
{/*
          <Link to="/quark-types" className="ml1 no-underline black">
            quark types
          </Link>
          <div className="ml1">|</div>
          <Link to="/gluon-types" className="ml1 no-underline black">
            gluon types
          </Link>
          <div className="ml1">|</div>
          <Link to="/quark-properties" className="ml1 no-underline black">
            quark properties
          </Link>
*/}
          {authToken && (
             <div className="flex">
               <div className="ml1">|</div>
               <Link to="/add-quark" className="ml1 no-underline black">
                 add quark
               </Link>
               <div className="ml1">|</div>
               <Link to="/add-qtype-property" className="ml1 no-underline black">
                 add qtype_property
               </Link>
{/*
               <div className="ml1">|</div>
               <Link to="/create" className="ml1 no-underline black">
                 submit
               </Link>
               <div className="ml1">|</div>
               <Link to="/add-quark-type" className="ml1 no-underline black">
                 add quark_type
               </Link>
               <div className="ml1">|</div>
               <Link to="/add-gluon-type" className="ml1 no-underline black">
                 add gluon_type
               </Link>
*/}
             </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
             <div
               className="ml1 pointer black"
               onClick={() => {
                 localStorage.removeItem(AUTH_TOKEN)
                 this.props.history.push(`/`)
               }}
               >
               logout
             </div>
          ) : (
             <Link to="/login" className="ml1 no-underline black">
               login
             </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)

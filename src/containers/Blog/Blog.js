import React, { Component, Suspense } from 'react';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../../hoc/asyncComponent'
import Posts from '../../containers/Posts/Posts'
import './Blog.css';

//react lazy
const AsyncNewPost = React.lazy(() => import('../NewPost/NewPost'));

// const AsyncNewPost = asyncComponent(() => {
//     return import('../NewPost/NewPost');
// });

class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        return (
            <div>
                <header className="Blog">
                    <nav>
                        <ul>
                            <li><NavLink 
                                    to="/posts" 
                                    exact
                                    activeClassName="my-active" 
                                    activeStyle={{
                                        borderBottom: '2px solid black'
                                    }}>Home</NavLink></li>
                            <li>
                                <NavLink to={{
                                pathname: '/new-post',
                                hash: '#something',
                                search: '?something=10' }}
                                exact >
                                    New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                   
                    {this.state.auth ? <Route path="/new-post" exact render={() =>
                        <Suspense fallback={<div>Loading...</div>}>
                            <AsyncNewPost />
                        </Suspense>} /> : null }  {/* component={AsnyNewPost} //old way */} 
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* <Redirect from="/" to="/posts" /> */}
                   
                    
                </Switch>
                
                
            </div>
        );
    }
}

export default Blog;
import React from 'react'
import { mount } from 'react-mounter'

import './main.html'

import './style/main.scss'

import Login from './containers/pages/Login.jsx'

import Layout from './containers/Layout.jsx'
import SinglePage from './containers/pages/SinglePage.jsx'
import ArticlesPage from './containers/pages/Articles.jsx'
import WorkPage from './containers/pages/Work.jsx'
import PageList from './containers/pages/PageList.jsx'
import UserList from './containers/pages/UserList.jsx'
import ArticleView from './containers/pages/ArticleView.jsx'
import ProjectView from './containers/pages/ProjectView.jsx'
import TagResults from './containers/pages/TagResults.jsx'

import ArticleEditor from './containers/editors/ArticleEditor.jsx'
import PageEditor from './containers/editors/PageEditor.jsx'
import ProjectEditor from './containers/editors/ProjectEditor.jsx'

import changePage from './actions/changePage';
import Store from './store/store';

FlowRouter.triggers.enter((context) => {
  const routeName = context.params.slug || context.route.name;

  Store.dispatch(changePage(routeName));
});

FlowRouter.route('/', {
  name: 'index',
  action: () => {
    mount(Layout, {
      content: <SinglePage slug='home' />
    })
  }
})

FlowRouter.route('/login', {
  name: 'login',
  action: (params) => {
    mount(Layout, {
      content: <Login {...params} />
    })
  }
})

FlowRouter.route('/tag/:tag', {
  name: 'tagResults',
  action: (params) => {
    mount(Layout, {
      content: <TagResults tag={params.tag} />
    })
  }
})

FlowRouter.route('/pages', {
  name: 'pages',
  action: (params) => {
    mount(Layout, {
      content: <PageList {...params} />
    })
  }
})

FlowRouter.route('/users', {
  name: 'users',
  action: (params) => {
    mount(Layout, {
      content: <UserList {...params} />
    })
  }
})

FlowRouter.route('/pages/add', {
  name: 'newPage',
  action: (params) => {
    mount(Layout, {
      content: <PageEditor {...params} newPage />
    })
  }
})

FlowRouter.route('/pages/:_id/edit', {
  name: 'pageEditor',
  action: (params) => {
    mount(Layout, {
      content: <PageEditor {...params} pageId={params._id} />
    })
  }
})

FlowRouter.route('/articles', {
  name: 'articles',
  action: (params) => {
    mount(Layout, {
      content: <ArticlesPage {...params} />
    })
  }
})

FlowRouter.route('/work', {
  name: 'work',
  action: (params) => {
    mount(Layout, {
      content: <WorkPage {...params} />
    })
  }
})

FlowRouter.route('/articles/add', {
  name: 'newArticle',
  action: (params) => {
    mount(Layout, {
      content: <ArticleEditor {...params} newArticle />
    })
  }
})

FlowRouter.route('/articles/:slug', {
  name: 'articleView',
  action: (params) => {
    mount(Layout, {
      content: <ArticleView {...params} slug={params.slug} />
    })
  }
})

FlowRouter.route('/articles/:_id/edit', {
  name: 'articleEditor',
  action: (params) => {
    mount(Layout, {
      content: <ArticleEditor {...params} articleId={params._id} />
    })
  }
})

FlowRouter.route('/work/add', {
  name: 'newProject',
  action: (params) => {
    mount(Layout, {
      content: <ProjectEditor {...params} newProject />
    })
  }
})

FlowRouter.route('/work/:slug', {
  name: 'projectView',
  action: (params) => {
    mount(Layout, {
      content: <ProjectView {...params} slug={params.slug} />
    })
  }
})

FlowRouter.route('/work/:_id/edit', {
  name: 'projectEditor',
  action: (params) => {
    mount(Layout, {
      content: <ProjectEditor {...params} projectId={params._id} />
    })
  }
})

FlowRouter.route('/:slug', {
  name: 'singlePage',
  action: (params) => {
    mount(Layout, {
      content: <SinglePage slug={params.slug} />
    })
  }
})

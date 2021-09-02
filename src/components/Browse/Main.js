import ArticleList from '../Article/ArticleList';
import React, {useEffect} from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {

  useEffect(() => {
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());

  }, [])
    // Update the document title using the browser API

  return (   
      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

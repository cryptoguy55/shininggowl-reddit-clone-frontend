import ArticleList from '../Article/ArticleList';
import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});



const MainView = props => {

 
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

export default connect(mapStateToProps)(MainView);

import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import ArticleActions from './ArticleActions';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import UpvoteIcon from "@material-ui/icons/ThumbUpAltOutlined"
import DownvoteIcon from "@material-ui/icons/ThumbDownAltOutlined"
import Badge from "@material-ui/core/Badge"
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DOMPurify from "dompurify"

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };
  const createMarkup = (html) => {
    console.log(html)
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <div className="flex w-full mb-4" >
    <div style={{borderRight: "1px solid"}} className="mr-2 pr-2 flex flex-col items-center">
      <UpvoteIcon/> 
      <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
      </button>
      <DownvoteIcon/> 
      <Badge badgeContent={5} color="primary" className="mt-3">
          <CommentOutlinedIcon/>
      </Badge>
    </div>
    <div className="w-full">
      <div className="flex"> 
        
         <img src={`http://localhost:8080/api/public/${article.author.image}`} alt={article.author.username} className="rounded-full" width="20"/>
          <Link className="author" to={`/@${article.author.username}`}>
          &nbsp; &nbsp; {article.author.username}
          </Link>
          <div className="flex-grow"></div>
          <span className="date">
            {new Date(article.createdAt).toLocaleString()}
          </span></div>
      <p className="text-xl underline-dark-600 text-center"><Link to = {`/browse/article/${article.slug}`}> -- {article.title} --</Link></p>
      <img src={`http://localhost:8080/api/public/${article.image}`} />
        <p dangerouslySetInnerHTML={createMarkup(article.body)}>
    
      </p>
      <br/>
      <ul className="tag-list flex">
        {
          article.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                <span className="border border-blue-500 mr-1 p-1  rounded-full"> {tag}</span>                
              </li>
            )
          })
        }
      </ul>
      <div className="text-right">
        <ArticleActions canModify={props.canModify} article={article} />
      </div>
    </div>
    </div>

    );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);

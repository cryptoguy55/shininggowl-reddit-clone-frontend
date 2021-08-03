import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import UpvoteIcon from "@material-ui/icons/ThumbUpAlt"
import DownvoteIcon from "@material-ui/icons/ThumbDownAlt"

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

  return (
    <div className="flex w-full mb-4" >
    <div style={{borderRight: "1px solid"}} className="mr-2 pr-2">
      <UpvoteIcon/> 
      <br/> <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button><br/>
      <DownvoteIcon/> 
    </div>
    <div>
    <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
      <p>r/football     <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span></p>
      <p className="text-xl underline-dark-600"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a></p>
      <p>
      I am trying out mpdecimate using ffmpeg-python library https://pypi.org/project/ffmpeg-python/. However, I get a file not found error for the simple code below. def remove_duplicate_ffmpeg...
      </p>
      <br/>
      <ul className="tag-list">
        {
          article.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                <span className="bg-blue-400 mr-1 p-1 text-white rounded-full"> {tag}</span>                
              </li>
            )
          })
        }
      </ul>
    </div>
    </div>

    );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);

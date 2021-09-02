import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import ArticleActions from './ArticleActions';
import { connect } from 'react-redux';
import { ADD_PRODUCT, ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import UpvoteIcon from "@material-ui/icons/ThumbUpAltOutlined"
import DownvoteIcon from "@material-ui/icons/ThumbDownAltOutlined"
import { IconButton } from '@material-ui/core';
import Badge from "@material-ui/core/Badge"
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import DOMPurify from "dompurify"
import { unfurl } from 'unfurl.js'
import striptags from 'striptags'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { SelectionState } from 'draft-js';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
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
  }),
  addp: article => dispatch({
    type: "ADD_PRODUCT",
    payload: article
  })
});

const ArticlePreview = props => {
  const [content, setContent] = React.useState([])
  const article = props.article;
  article.quantity =1
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
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  React.useEffect(() => {
    var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
   var matches = striptags(article.body).match(expression);
    if(matches) {
      matches.forEach(item => {
        unfurl(item).then( result => {
          setContent(value => value.concat(result))
         
        }, function(err) {
          console.log(err); // Error: "It broke"
        });
      })
   
    }
  }, []);
  console.log(content)
  return (
    <div className="flex w-full mb-4" >
    <div style={{borderRight: "1px solid"}} className="mr-2 pr-2 flex flex-col items-center">
       <IconButton  color="primary" onClick={handleClick}>
                  <UpvoteIcon  />
        </IconButton>
      {article.favoritesCount}
      <IconButton  color="secondary" onClick={handleClick}>
            <DownvoteIcon  />
        </IconButton>
      {/* <Badge badgeContent={5} color="primary" className="mt-3">
          <CommentOutlinedIcon/>
      </Badge> */}
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
        { 
          content.map((item, index) => {
            return  ( 
            <Card key = {index}>     
                     
              <CardContent>
              <a href = {item.twitter_card.url} target="_blank" className="underline underline-black" >{item.twitter_card.url}</a>                
              <img src={item.twitter_card.images[0].url} />
                <p className="font-bold text-lg">{item.twitter_card.title}</p>
                <p >
                  {item.twitter_card.description}
                </p>
                <p  className="flex">
               <img src= {item.favicon} width="20" />{item.twitter_card.site} 
              </p>
              </CardContent>
           
          </Card> 
            )
          })
       }
      <br/>
      <p>
        {article.price !=0 ? `${article.price} $` : "" }
        {article.price !=0 &&  
        <IconButton  color="secondary" onClick={()=> props.addp(article)}>
            <AddShoppingCartOutlinedIcon  />
        </IconButton> }
      </p>
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

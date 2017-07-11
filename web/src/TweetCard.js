import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Message,
} from 'semantic-ui-react'
import XHR from './xhr.js';

class TweetCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liking: false,
      liked: false,
      likeError: '',
      likeSuccess: '',
      retweeting: false,
      retweeted: false,
      retweetError: '',
      retweetSuccess: '',
    }
  }

  like = (event, button, data) => {
    this.setState({
      liking: true,
    });
    let params = {tid: this.props.tweet_id, au: true};
    XHR.postJson(
      XHR.domain + '/api/1.0/like',
      params,
    ).then((json) => {
        this.setState({
          liking: false,
          liked: true,
          likeSuccess: 'Successfully liked',
          likeError: '',
        });
    }).catch((response) => {
        this.setState({
          liking: false,
          liked: true,
          likeSuccess: '',
          likeError: 'Either you\'ve already liked this tweet, either it\'s not available anymore.',
        });
    });
  }

  retweet = (event, button, data) => {
    this.setState({
      retweeting: true,
    });
    let params = {tid: this.props.tweet_id, au: true};
    XHR.postJson(
      XHR.domain + '/api/1.0/retweet',
      params,
    ).then((json) => {
        this.setState({
          retweeting: false,
          retweeted: true,
          retweetSuccess: 'Successfully retweeted',
          retweetError: '',
        });
    }).catch((response) => {
        this.setState({
          retweeting: false,
          retweeted: true,
          retweetSuccess: '',
          retweetError: 'Either you\'ve already retweeted this tweet, either it\'s not available anymore.',
        });
    });
  }


  render() {
    return <Container>
        <Header size='tiny'>
          {this.props.screen_name}
        </Header>
        <p>
          {this.props.text}
        </p>
        <p>
          <a href={this.props.link}>{this.props.link}</a>
        </p>
        <p>{this.state.tweet_id}</p>
        <div>
          <Button disabled={this.state.liked} loading={this.state.liking} onClick={this.like}>
            Favorite
          </Button>
          <Button disabled={this.state.retweeted} loading={this.state.rewteeting} onClick={this.retweet}>
            Retweet
          </Button>
        </div>
        {this.state.likeSuccess && <Message color='green'>
            {this.state.likeSuccess}
          </Message>
        }
        {this.state.likeError && <Message color='red'>
            {this.state.likeError}
          </Message>
        }
        {this.state.retweetSuccess && <Message color='green'>
            {this.state.retweetSuccess}
          </Message>
        }
        {this.state.retweetError && <Message color='red'>
            {this.state.retweetError}
          </Message>
        }
      </Container>
  }
}

export default TweetCard;

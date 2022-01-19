import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Display from './Display';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMeme: "https://i.redd.it/zrbzm0zpcic81.jpg",
      enableButton: false,
    }
  }

  componentDidMount() {
    this.fetchMemes();
  }

  fetchMemes() {
    const memes = [];
    fetch("https://www.reddit.com/r/memes.json")
    .then(response => response.json())
    .then(body => {
      const entries = body.data.children;
      for (const entry of entries) {
        if (entry.data.post_hint === "image") {
          memes.push(entry.data.url_overridden_by_dest);
        }
      }
      this.setState({memes: memes, enableButton: true});
    });
  }

  changeMeme() {
    this.setState({enableButton: false});
    const i = Math.floor(Math.random() * this.state.memes.length);
    this.setState({currentMeme: this.state.memes[i], enableButton: true});
  }

  render() {
    return (
      <div className="App">
          <Display source = {this.state.currentMeme} />
          <button disabled={!this.state.enableButton} onClick={() => this.changeMeme()}>Change Meme</button>
      </div>
    );
  }
}

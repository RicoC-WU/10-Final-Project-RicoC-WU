import {Component} from "react";
import SearchTools from "./SearchTools";
import QuoteBlock from "./QuoteBlock";
import QuoteList from "./QuoteList";
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      btnSelect: "",
      quotes: [],
      input: "",
      genAmt: 0,
      curr_search: [],
      clicked: "",
      count: -1
    };
    this.genQuotes = this.genQuotes.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.genAll = this.genAll.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handleButtonChange(event){
    this.setState({
      btnSelect: event.target.value
    })
  }

  handleAmountChange(event){
    this.setState({
      genAmt: parseInt(event.target.value)
    })
  }

  handleSearchInput(event){
    this.setState({
      input: event.target.value
    })
  }

  handleArrowClick(event){
    const self = this;
    let id = event.currentTarget.id;
    console.log("THIS ARROW IS:" + id);
    var add;
    if(id === "downarr"){
      add = 10;
    }else if(id === "uparr"){
      add = -10;
    }else{
      add = 0;
    }
    let count = self.state.count + add;
    this.setState({
      clicked: id,
      count: count
    }, () => {
      self.genAll()
    }) 
  }

  handleCountChange(event){
    this.setState({
      count: 0
    })
  }

  genQuotes(event){
    this.setState({
      curr_search: [this.state.input,this.state.btnSelect],
      count: -1
    })
    if(this.state.btnSelect ==="" && event.target.id === "GoBtn"){
      let rem = document.getElementById("selErr");
      if(rem){
        rem.remove();
      }
      if(this.state.input === ""){
        let el = document.createElement("p");
        el.id = "selErr";
        el.innerText = "You...didn't even type a character or select a search type...are you even trying?";
        document.getElementsByClassName("SearchTools")[0].appendChild(el);
      }else{
        let el = document.createElement("p");
        el.id = "selErr";
        el.innerText = "Please select a search method";
        document.getElementsByClassName("SearchTools")[0].appendChild(el);
      }
    }else if(this.state.input === "" && event.target.id === "GoBtn"){
      let rem = document.getElementById("selErr");
      if(rem){
        rem.remove();
      }
      let el = document.createElement("p");
      el.id = "selErr";
      el.innerText = "Nah you needa type in a character name bruv";
      document.getElementsByClassName("SearchTools")[0].appendChild(el);
    }else if(this.state.genAmt !== 1 && this.state.genAmt !== 10){
      let rem = document.getElementById("selErr");
      if(rem){
        rem.remove();
      }
      let el = document.createElement("p");
      el.id = "selErr";
      el.innerText = "you needa select a number of quotes to generate!";
      document.getElementsByClassName("SearchTools")[0].appendChild(el);
    }else{
      let el = document.getElementById("selErr");
      let el2 = document.getElementById("noRes");
      if(el){
        el.remove();
      }
      if(el2){
        el2.remove();
      }
      const self = this;
      var url = "";
      if(event.target.id === "GoBtn"){
        if(this.state.btnSelect === "Character"){
          if(this.state.genAmt === 10){
            url ='https://animechan.vercel.app/api/quotes/character?name='+encodeURIComponent(this.state.input); 
          }else if(this.state.genAmt === 1){
            url ='https://animechan.vercel.app/api/random/character?name='+encodeURIComponent(this.state.input);
          }
        }else if(this.state.btnSelect === "Title"){
          if(this.state.genAmt === 10){
            url = 'https://animechan.vercel.app/api/quotes/anime?title='+encodeURIComponent(this.state.input);
          }else if(this.state.genAmt === 1){
            url = 'https://animechan.vercel.app/api/random/anime?title='+encodeURIComponent(this.state.input);
          }
        }
        this.setState({
          clicked: ""
        })
      }else if(event.target.id === "RandomBtn"){
        if(this.state.genAmt === 10){
          url = "https://animechan.vercel.app/api/quotes";
        }else if(this.state.genAmt === 1){
          url = "https://animechan.vercel.app/api/random";
        }
        this.setState({
          clicked: "random"
        })
      }
      console.log(url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
          console.log(this.response);
          var quotes = JSON.parse(this.response);
          if(self.state.genAmt === 10){ 
            self.setState({
              quotes: quotes
            })
          }else if(self.state.genAmt === 1){
            self.setState({
              quotes: [quotes]
            })
          }
        }else if((this.status === 404 || this.status === 500) && !document.getElementById("noRes")){
          let el = document.createElement("p");
          el.id = "noRes";
          self.setState({
            quotes: []
          })
          if(event.target.id === "GoBtn"){
            el.innerText = `Sorry, no results have been found for the ${self.state.btnSelect} "${self.state.input}"`
            document.getElementsByClassName("SearchTools")[0].appendChild(el);
          }else if(event.target.id === "RandomBtn"){
            el.innerText = "Sorry, we could not generate 10 quotes, try again later."
            document.getElementsByClassName("SearchTools")[0].appendChild(el);
          }
        }else if(this.status === 0 && this.readyState === 4 && !document.getElementById("noRes")){
          let el = document.createElement("p");
          el.id = "noRes";
          self.setState({
            quotes: []
          })
          el.innerText = "Sorry, no quotes could be generated at this time due to API limitations, please try again later."
          document.getElementsByClassName("SearchTools")[0].appendChild(el);
        }
      }
      xhttp.open("GET",url,true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send();
    }
  }

  genAll(event){
    let el = document.getElementById("selErr");
    let el2 = document.getElementById("noRes");
    if(el){
      el.remove();
    }
    if(el2){
      el2.remove();
    }
    const self = this;
    var url;
    if(this.state.curr_search[1] === "Character"){
      url = `https://animechan.vercel.app/api/quotes/character?name=${this.state.curr_search[0]}&page=${self.state.count}`;
    }else if(this.state.curr_search[1] === "Title"){
      url = `https://animechan.vercel.app/api/quotes/anime?title=${this.state.curr_search[0]}&page=${self.state.count}`;
    }
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
      console.log(this.status);
      if(this.readyState === 4 && this.status === 200){
        var quotes = JSON.parse(this.response);
        self.setState({
          quotes: quotes
        })
      }else if((this.status === 404 || this.status === 500) && !document.getElementById("noRes")){
          let el = document.createElement("p");
          el.id = "noRes";
          self.setState({
            count: self.state.count - 10
          })
          el.innerText = `There are no more quotes to yield for this search term .`
          document.getElementsByClassName("App")[0].appendChild(el);
      }else if(this.status === 0 && this.readyState === 4 && !document.getElementById("noRes")){
        let el = document.createElement("p");
        el.id = "noRes";
        self.setState({
          quotes: []
        })
        el.innerText = "Sorry, no quotes could be generated at this time due to API limitations, please try again later."
        document.getElementsByClassName("SearchTools")[0].appendChild(el);
      }
    }
    xhttp.open("GET",url,true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    console.log(url);
    self.setState({
      clicked: ""
    })
  
  }
  
  render(){
    return (
      <div className="App">
        <div className="header">
        <h2>ANIME QUOTE GENERATOR</h2>
          <img id="LuffySprite" alt="LuffySprite" src="Luffy.gif"/><br/>
          <img id="GokuSprite" alt="GokuSprite" src="Goku.gif"/><br/>
          <img id="NarutoSprite" alt="NaurtoSprite" src="Naruto.gif"/><br/>
          <img id="IchigoSprite" alt="IchigoSprite" src="Ichigo.gif"/><br/>
          <img id="GonSprite" alt="GonSprite" src="Gon.gif"/><br/>
          <h4>INSTRUCTIONS: Use the radio buttons to select whether you wish to find quotes by character or by anime title. Use the second set of radio buttons to select a number of quotes to generate. Then, use the Search Bar to search based on the chosen method. 
            When searching by character/title, a button will appear on the bottom of the page to see all of that search term's quotes. When this button is pressed, arrows will appear so that the user can scroll through the rest of that search term's quotes.</h4>
          <p>*Note: only 100 requests per hour is allowed for this generator due to API limitations. Please take this into consideration</p>
        </div>
        <SearchTools handleButtonChange={this.handleButtonChange} handleAmountChange={this.handleAmountChange} handleSearchInput={this.handleSearchInput} genQuotes={this.genQuotes} showQuotes={this.showQuotes}genAmt={this.state.genAmt}/>
        <QuoteList quotes={this.state.quotes}/>
        {((this.state.quotes.length < 10 && this.state.count === -1) || this.state.clicked === "random") ? <></> : this.state.count === -1 ? <><button id="seeAll" onClick={this.handleCountChange}>See all quotes by "{this.state.curr_search[0]}"</button></> : this.state.count === 0 ? 
        <><button id="downarr" onClick={this.handleArrowClick}><i className="fa-solid fa-arrow-down"></i></button></> : (this.state.count > 0 && this.state.quotes.length === 10) ? <> 
        <button id="uparr" onClick={this.handleArrowClick} ><i className="fa-solid fa-arrow-up"></i></button>
        <button id="downarr" onClick={this.handleArrowClick }><i className="fa-solid fa-arrow-down"></i></button></> : <><button id="uparr" onClick={this.handleArrowClick }><i className="fa-solid fa-arrow-up"></i></button></>
        }
      </div>
    );
  }
}

export default App;

import {Component} from "react";
import SearchTools from "./SearchTools";
import QuoteBlock from "./QuoteBlock";
import './App.css';
import { isElementOfType } from "react-dom/test-utils";


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
      count: 0
    };
    this.genQuotes = this.genQuotes.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.genAll = this.genAll.bind(this);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  // componentDidMount(){

  // }

  handleButtonChange(event){
    this.setState({
      btnSelect: event.target.value
    })
   // console.log(this.state.btnSelect);
  }

  handleAmountChange(event){
    this.setState({
      genAmt: parseInt(event.target.value)
    },()=>{console.log(this.state.genAmt)})
  }

  handleSearchInput(event){
    this.setState({
      input: event.target.value
    })
  //  console.log(this.state.input)
  }

  handleArrowClick(event){
    const self = this;
    let id = event.currentTarget.id;
    console.log("THIS ARROW IS:" + id);
    var add;
    if(id == "downarr"){
      add = 1;
    }else if(id == "uparr"){
      add = -1;
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
      count: 1
    })
  }

  genQuotes(event){
    //let send = true;
    this.setState({
      curr_search: [this.state.input,this.state.btnSelect]
    })
    if(this.state.btnSelect ==="" && event.target.id == "GoBtn"){
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
    }else if(this.state.input === "" && event.target.id == "GoBtn"){
      let rem = document.getElementById("selErr");
      if(rem){
        rem.remove();
      }
      let el = document.createElement("p");
      el.id = "selErr";
      el.innerText = "Nah you needa type in a character name bruv";
      document.getElementsByClassName("SearchTools")[0].appendChild(el);
    }else if(this.state.genAmt != 1 && this.state.genAmt != 10){
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
      if(event.target.id == "GoBtn"){
        if(this.state.btnSelect === "Character"){
          if(this.state.genAmt == 10){
            url ='https://animechan.vercel.app/api/quotes/character?name='+encodeURIComponent(this.state.input)+'&page='+this.state.count;   
          }else if(this.state.genAmt == 1){
            url ='https://animechan.vercel.app/api/random/character?name='+encodeURIComponent(this.state.input)+'&page='+this.state.count;   
          }
        }else if(this.state.btnSelect === "Title"){
          if(this.state.genAmt == 10){
            url = 'https://animechan.vercel.app/api/quotes/anime?title='+encodeURIComponent(this.state.input)+'&page='+this.state.count;
          }else if(this.state.genAmt == 1){
            url = 'https://animechan.vercel.app/api/random/anime?title='+encodeURIComponent(this.state.input)+'&page='+this.state.count;
          }
        }
      }else if(event.target.id == "RandomBtn"){
        if(this.state.genAmt == 10){
          url = "https://animechan.vercel.app/api/quotes";
        }else if(this.state.genAmt == 1){
          url = "https://animechan.vercel.app/api/random";
        }
      }
      console.log(url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
          console.log(this.response);
          var quotes = JSON.parse(this.response);
          //console.log(quotes);
          if(self.state.genAmt == 10){ 
            self.setState({
              quotes: quotes
            })
          }else if(self.state.genAmt == 1){
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
          if(event.target.id == "GoBtn"){
            el.innerText = `Sorry, no results have been found for the ${self.state.btnSelect} "${self.state.input}"`
            document.getElementsByClassName("SearchTools")[0].appendChild(el);
          }else if(event.target.id == "RandomBtn"){
            el.innerText = "Sorry, we could not generate 10 quotes, try again later."
            document.getElementsByClassName("SearchTools")[0].appendChild(el);
          }
        }else if(this.status === 0 && this.readyState == 4 && !document.getElementById("noRes")){
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
    this.setState({
      clicked: ""
    })
  }

  genAll(event){
    const self = this;
    //console.log(self.state.count);
    var url;
    if(this.state.curr_search[1] === "Character"){
      url = `https://animechan.vercel.app/api/quotes/character?name=${this.state.curr_search[0]}&page=${this.state.count}`;
    }else if(this.state.curr_search[1] === "Title"){
      url = `https://animechan.vercel.app/api/quotes/anime?title=${this.state.curr_search[0]}&page=${this.state.count}`;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        var quotes = JSON.parse(this.response);
        self.setState({
          quotes: quotes
        })
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
         <h2>ANIME QUOTE GENERATOR</h2>
         <img alt="LuffySprite" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaea9a95-2614-4b2a-ab10-580f594097f7/d5fwb6m-9f9381c7-f6d3-4168-8b75-29ffbf8313d1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VhZWE5YTk1LTI2MTQtNGIyYS1hYjEwLTU4MGY1OTQwOTdmN1wvZDVmd2I2bS05ZjkzODFjNy1mNmQzLTQxNjgtOGI3NS0yOWZmYmY4MzEzZDEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IRNZn-StYyX8gSMmd8dteLZ2KyKHVyFIdXO7A-J0Bf0"></img><br/>
         <h4>INSTRUCTIONS: Use the radio buttons to select whether you wish to find quotes by character or by anime title. Use the second set of radio buttons to select a number of quotes to generate. Then, use the Search Bar to search based on the chosen method.</h4>
         <p>*Note: only 100 requests per hour is allowed for this generator due to API limitations. Please take this into consideration</p>
         <SearchTools handleButtonChange={this.handleButtonChange} handleAmountChange={this.handleAmountChange} handleSearchInput={this.handleSearchInput} genQuotes={this.genQuotes} showQuotes={this.showQuotes}genAmt={this.state.genAmt}/>
         {this.state.quotes.map((info)=>(
          <QuoteBlock anime={info.anime} key={info.id} character={info.character} quote={info.quote}/>
         ))}
        {(this.state.quotes.length < 10 && this.state.count == 0) ? <></> : this.state.count == 0 ? <><button onClick={this.handleCountChange}>See all quotes by "{this.state.curr_search[0]}"</button></> : this.state.count == 1 ? 
        <><button id="downarr" onClick={this.handleArrowClick}><i class="fa-solid fa-arrow-down"></i></button></> : (this.state.count > 1 && this.state.quotes.length == 10) ? <> 
        <button id="uparr" onClick={this.handleArrowClick} ><i class="fa-solid fa-arrow-up"></i></button>
        <button id="downarr" onClick={this.handleArrowClick }><i class="fa-solid fa-arrow-down"></i></button></> : <><button id="uparr" onClick={this.handleArrowClick }><i class="fa-solid fa-arrow-up"></i></button></>
        }
      </div>
    );
  }
}

export default App;

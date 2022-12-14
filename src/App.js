import {Component} from "react";
import SearchTools from "./SearchTools";
import QuoteBlock from "./QuoteBlock";
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      btnSelect: "",
      quotes: [],
      input: "",
    };
    this.genQuotes = this.genQuotes.bind(this);
    this.handleButtonChange = this.handleButtonChange.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.showQuotes = this.showQuotes.bind(this);
  }

  // componentDidMount(){

  // }

  handleButtonChange(event){
    this.setState({
      btnSelect: event.target.value
    })
   // console.log(this.state.btnSelect);
  }

  handleSearchInput(event){
    this.setState({
      input: event.target.value
    })
  //  console.log(this.state.input)
  }

  showQuotes(){
    //console.log(this.state.quotes);
  }

  genQuotes(event){
    //let send = true;
    if(this.state.btnSelect ===""){
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
    }else if(this.state.input === ""){
      let rem = document.getElementById("selErr");
      if(rem){
        rem.remove();
      }
      let el = document.createElement("p");
      el.id = "selErr";
      el.innerText = "Nah you needa type in a character name bruv";
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
      var url;
      if(this.state.btnSelect === "Character"){
        url ='https://animechan.vercel.app/api/quotes/character?name='+encodeURIComponent(this.state.input);   
      }else if(this.state.btnSelect === "Title"){
        url = 'https://animechan.vercel.app/api/quotes/anime?title='+encodeURIComponent(this.state.input);
      }
      console.log(url);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
          var quotes = JSON.parse(this.response);
          //console.log(quotes);
          self.setState({
            quotes: quotes
          },()=> {
            console.log(self.state.quotes);
          });
        }else if((this.status === 404 || this.status === 500) && !document.getElementById("noRes")){
          let el = document.createElement("p");
          el.id = "noRes";
          el.innerText = `Sorry, no results have been found for the ${self.state.btnSelect} "${self.state.input}"`
          document.getElementsByClassName("SearchTools")[0].appendChild(el);
          self.setState({
            quotes: []
          })
        }
      }
      xhttp.open("GET",url,true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send();
    }
  }

  
  
  render(){
    return (
      <div className="App">
         <h2>ANIME QUOTE GENERATOR</h2>
         <img alt="LuffySprite" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaea9a95-2614-4b2a-ab10-580f594097f7/d5fwb6m-9f9381c7-f6d3-4168-8b75-29ffbf8313d1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VhZWE5YTk1LTI2MTQtNGIyYS1hYjEwLTU4MGY1OTQwOTdmN1wvZDVmd2I2bS05ZjkzODFjNy1mNmQzLTQxNjgtOGI3NS0yOWZmYmY4MzEzZDEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IRNZn-StYyX8gSMmd8dteLZ2KyKHVyFIdXO7A-J0Bf0"></img><br/>
         <h4>INSTRUCTIONS: Use the radio button to select whether you wish to find quotes by character or by anime title. Then, use the Search Bar to search based on the chosen method</h4>
         <SearchTools handleButtonChange={this.handleButtonChange} handleSearchInput={this.handleSearchInput} genQuotes={this.genQuotes} showQuotes={this.showQuotes}/>
         {this.state.quotes.map((info)=>(
          <QuoteBlock anime={info.anime} key={info.id} character={info.character} quote={info.quote}/>
         ))}
      </div>
    );
  }
}

export default App;

import { Component } from "react";

class SearchTools extends Component{
    render(){
        return(
            <div className="SearchTools"><input type="text" id="query" placeholder="Search" onChange={this.props.handleSearchInput}/><button onClick={this.props.genQuotes}>GO!</button><br/>
            <p>Search By:</p>
            <form>
                <input type="radio" id="select1" name="SearchType" value="Character" onClick={this.props.handleButtonChange}/>
                <label for="select1">Character</label>
                <input type="radio" id="select2" name="SearchType" value="Title" onClick={this.props.handleButtonChange}/> 
                <label for="select2">Title</label>
            </form>
            </div>
        );
    }
}

export default SearchTools;
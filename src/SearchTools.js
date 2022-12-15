import { Component } from "react";

class SearchTools extends Component{
    render(){
        return(
            <div className="SearchTools"><input type="text" id="query" placeholder="Search" onChange={this.props.handleSearchInput}/>
            <button id="GoBtn" onClick={this.props.genQuotes}>GO!</button><button id="RandomBtn" onClick={this.props.genQuotes}>Get Random Quote(s)</button><br/>
            <p>Search By:</p>
            <form> 
                Search Type: <input type="radio" id="select1" name="SearchType" value="Character" onClick={this.props.handleButtonChange}/>
                <label htmlFor="select1">Character</label>
                <input type="radio" id="select2" name="SearchType" value="Title" onClick={this.props.handleButtonChange}/> 
                <label htmlFor="select2">Title</label>
            </form>
            <form> 
                Quote Amount: <input type="radio" id="select1" name="AmountType" value="1" onClick={this.props.handleAmountChange}/>
                <label htmlFor="select1">1</label>
                <input type="radio" id="select2" name="AmountType" value="10" onClick={this.props.handleAmountChange}/> 
                <label htmlFor="select2">10</label>
            </form>
            </div>
        );
    }
}

export default SearchTools;
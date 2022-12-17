import { Component } from "react";

class SearchTools extends Component{
    render(){
        return(
            <div className="SearchTools"><input type="text" id="query" placeholder="Search" onChange={this.props.handleSearchInput}/>
            <button id="GoBtn" onClick={this.props.genQuotes}>GO!</button><button id="RandomBtn" onClick={this.props.genQuotes}>Get Random Quote(s)</button><br/>
            <p>Search By:</p>
            <form> 
                Search Type: &nbsp;
                <label htmlFor="select1" className="container">Character
                    <input type="radio" id="select1" name="SearchType" value="Character" onClick={this.props.handleButtonChange}/>
                    <span className="checkmark"></span>
                </label>
                <label htmlFor="select2" className="container">Title
                    <input type="radio" id="select2" name="SearchType" value="Title" onClick={this.props.handleButtonChange}/> 
                    <span className="checkmark"></span>
                </label>
            </form>
            <form> 
                &nbsp;Quote Amount: &nbsp;
                <label htmlFor="select3" className="container">1
                    <input type="radio" id="select3" name="AmountType" value="1" onClick={this.props.handleAmountChange}/>
                    <span className="checkmark"></span>
                </label>
                <label htmlFor="select4" className="container">10
                    <input type="radio" id="select4" name="AmountType" value="10" onClick={this.props.handleAmountChange}/> 
                    <span className="checkmark"></span>
                </label>
            </form>
            </div>
        );
    }
}

export default SearchTools;
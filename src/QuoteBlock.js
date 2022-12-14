import {Component} from "react";

class QuoteBlock extends Component{
    render(){
        return(
            <div className="QuoteBlock">
                <p>Anime: {this.props.anime} | Character: <em>{this.props.character}</em></p>
                <p>"{this.props.quote}"</p> 
                
            </div>
        )
    }
}
export default QuoteBlock;
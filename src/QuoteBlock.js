import {Component} from "react";

class QuoteBlock extends Component{
    render(){
        return(
            <div className="QuoteBlock">
                <p>"{this.props.quote}"</p>
                ~<em>{this.props.character}</em>
                <p>Anime: {this.props.anime}</p>
            </div>
        )
    }
}
export default QuoteBlock;
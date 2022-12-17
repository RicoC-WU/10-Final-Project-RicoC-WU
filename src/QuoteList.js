import { Component } from "react";
import QuoteBlock from "./QuoteBlock";

class QuoteList extends Component{
    render(){
        return(
            <div className="QuoteList">
                {this.props.quotes.map((info)=>(
                    <QuoteBlock anime={info.anime} key={info.id} character={info.character} quote={info.quote}/>
                ))}
            </div>
        )
    }
}

export default QuoteList;
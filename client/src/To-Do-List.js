
import React,{Component} from "React";
import axios from "axios";
import {Card,Header,Form,Input,Icon} from "semantic-ui-react";

let endpoint = "http://localhost:9000";
class ToDoList extends Component{
	constructor(props){
		super(props);
		this.state ={
			task:"",
			items:[],
		};
	}

ComponentDidMount(){
	this,getTask();
}

render(){
	return(
		<div>
			<div className="row"></div>
			<Header className="header" as="h2" color="yellow">

			</Header>
		</div>
	)
}
}
export default ToDoList;
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
			<div className="row">
			<Header className="header" as="h2" color="yellow">
TO DO LIST
			</Header>
			</div>
			<div className="row">
				<form onSubmit={this .onSubmit}>
					<input type="text" name="task" onChange={this.onChange} value={this.state.task
					} fluid placeholder="Create Task"></input>

				</form>
			</div>
		</div>
	)
}
}
export default ToDoList;
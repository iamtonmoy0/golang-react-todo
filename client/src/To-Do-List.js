import React,{Component} from "react";
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

       componentDidMount(){
	this.getTask();
          }
      onChange=(event)=>{
	this.setState({
		[event.target.name]:event.target.value,
	});
};


// onsubmit func

onSubmit=()=>{
	let {task}=this.state;
	if(task){
		axios.post(endpoint+"/api/task",
		{task,},
		{headers:{
			"Context-Type":"application/x-www-form-urlencoded",
		}}).then((res)=>{
			this.getTask();
			this.setState({
				task:"",
			});
			console.log(res);
		});
	}
};



// get-task func

getTask = ()=>{
axios.get(endpoint +"/api/task").then((res)=>{
	if(res.data){
		this.setState({
			items:res.data.map((item)=>{
				let color ="yellow";
				let style={
					wordWrap:"break-word",
				};
				if(item.status){
					color="green";
					style["textDecorationLine"]="line-through";
				}
				return(
					<Card key={item._id} color={color} fluid className="rough">
						<Card.Content>
							<Card.Header textAlign="left">
								<div style={style}>
									{item.task}
								</div>
							</Card.Header>
							<Card.Meta textAlign="right">
								<Icon 
								name="check circle"
								color="blue"
								onClick={()=> this.updateTask(item._id)}/>
								<span style={{paddingRight:10}}>Undo</span>
								<Icon
								name="delete"
								color="red"
								onClick={()=> this.deleteTask(item._id)}
								/>
								<span style={{paddingRight:10}}>Delete</span>
							</Card.Meta>
						</Card.Content>
					</Card>
				);
			}),
		});
	}else{
		this.setState({
			items:[],

		});
	};
});

};


// uprate task func

updateTask=(id)=>{
	axios.put(endpoint+"/api/task"+id,{
		header:{
			"Content-Type":"application/x-www-form-urlencoded",
		},
	}).then((res)=>{
		console.log(res);
		this.getTask();
	});
};


// undo task
undoTask=(id)=>{
	axios.put(endpoint +"api/undoTask"+id,{
		header:{
			"Content-Type":"application/x-www-form-urlencoded",
		},
	}).then((res)=>{
		console.log(res);
		this.getTask();
	});
};

// deleteTask
deleteTask=(id)=>{
	axios.delete(endpoint +"api/deleteTask"+id,{
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
	}).then((res)=>{
		console.log(res);
		this.getTask();
	});
};
render(){
	return(
		<div>
			<div className="row">
			<Header className="header" as="h2" color="yellow">
TO DO LIST
			</Header>
			</div>
			<div className="row">
				<form onSubmit={this.onSubmit}>
					<input type="text" name="task" onChange={this.onChange} value={this.state.task
					} fluid placeholder="Create Task"></input>


				</form>
			</div>
			<div  className="row">
				<Card.Group> {this.state.items} </Card.Group>

			</div>
		</div>
	)
}
}
export default ToDoList;
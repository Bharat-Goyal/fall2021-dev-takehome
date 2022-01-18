import React from 'react'
import TodoList, { TodoItem } from './TodoList'

export type MainFormProps = {
    id?: string
}
type Tag = {
    name: string 
    id: number
}
type State ={
    NewTag: string
    Title: string
    currentDate: Date
    AllTags: Array<Tag>
    ToDoList: Array<TodoItem>
}
export class MainForm extends React.Component<MainFormProps, State> {
    constructor(props: MainFormProps) {
        super(props);
        this.state={
            NewTag: "", 
            Title: "",
            currentDate: new Date(),
            ToDoList: [],
            AllTags: [],
            
        };
        this.newTagClicked=this.newTagClicked.bind(this);
        this.DateChange=this.DateChange.bind(this)
        this.submitClicked=this.submitClicked.bind(this)
        this.newTagClicked=this.newTagClicked.bind(this)
        this.TitleChange=this.TitleChange.bind(this)
        this.TagChange=this.TagChange.bind(this)
        this.deleteTag=this.deleteTag.bind(this)
    }
    submitClicked(event: React.FormEvent) {
        event.preventDefault();
        let curName=this.state.Title
        if(curName==="") {
            
            return}
        let curDate=this.state.currentDate
        if(curDate===new Date()) {
            //event.preventDefault();
            return}
        let TempList=this.state.ToDoList
        TempList.push({title: curName, dueDate:curDate, tagList: this.state.AllTags.map((cur:Tag) => {return cur.name} ), completed: false})
        this.setState({
            ToDoList:TempList
        })
    }
    newTagClicked() {
        let add=this.state.NewTag // add is the variable
        if(add==="") {
            return;
        }
        let tempList=this.state.AllTags
        tempList.push({name: add, id: 1});
        for(var i=0;i<tempList.length;i++) {
            tempList[i].id=i
        }
        this.setState({
            NewTag: "",
            AllTags: tempList
        });
        
    }
    TitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(
            {Title: e.target.value}
        );
    }
    TagChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(
            {NewTag: e.target.value }
        );
    }
    deleteTag(id: number) {
        let tempList=this.state.AllTags.filter( (st: Tag) =>
            {return st.id!==id;}
        )
        this.setState({AllTags: tempList});
    }
    DateChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState(
            {currentDate: new Date(e.target.value) }
        );
        console.log(this.state.currentDate.toString);
        console.log(this.state.currentDate);
    }

    render() {
        const listTags = this.state.AllTags.map( (st: Tag) =>
            <li> {st.name} 
                <button onClick={() => this.deleteTag(st.id)}> X </button>
            </li>
        );
        return (
          <form onSubmit={this.submitClicked}>
                <label>
                <div>
                Title: 
                <input type="text" value={this.state.Title} onChange={(e) =>this.TitleChange(e)} name="TitleInput"/>
                </div>
                </label>
                <br/>
                <label>
                <div>
                Tags 
                <input type="text" value={this.state.NewTag} name="NewTagInput" onChange={(e) =>this.TagChange(e)}/>
                <button onClick={this.newTagClicked} type="button">
                    Add tag
                </button>
                </div>
                </label>
                <br/>
                <ul> {listTags} </ul>
                 <label>
                 <div>
                    Due Date
                    <input type="DATE" onChange={(e) => this.DateChange(e)} value={this.state.currentDate.toLocaleString()}/>
                    </div>
                </label> 
                <div>
                <input type="submit" value="Submit" name="Add Task" onClick={(e) => this.submitClicked(e)}/>
                </div>
                <ul>{this.state.ToDoList.map( (st: TodoItem) =>
            <li> {st.title} <br>
            </li>
        )}</ul>
          </form>  
        );
    }
}

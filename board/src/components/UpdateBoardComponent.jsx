import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class UpdateBoardComponent extends Component {
    constructor(props){
        super(props);

        // this.state에 폼 양식에서 사용될 파라미터를 정의
        this.state={
            title:'',
            content:'',
            username:'',
            password:''
        }

        // 폼 양식에 값이 입력되면 this.state에 정의 된 변수의 값을 변경하도록 바인드
        // 글쓰기 버튼을 클릭시 API에 글 작성 리퀘스트를 보내는 함수를 바인드
        this.changeTitleHandler=this.changeTitleHandler.bind(this)
        this.changeContentHandler=this.changeContentHandler.bind(this)
        this.changeUsernameHandler=this.changeUsernameHandler.bind(this)
        this.changePasswordHandler=this.changePasswordHandler.bind(this)
        this.writeBoard = this.writeBoard.bind(this)
    }

    // this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언
    changeTitleHandler=(e)=>{
        this.setState({title: e.target.value});
    }

    changeContentHandler=(e)=>{
        this.setState({content: e.target.value});
    }

    changeUsernameHandler=(e)=>{
        this.setState({username: e.target.value});
    }

    changePasswordHandler=(e)=>{
        this.setState({password: e.target.value});
    }
    

    writeBoard=(e)=>{
        e.preventDefault(); // 새로고침을 막아줌
        let board = {
            title: this.state.title,
            content: this.state.content,
            username: this.state.username,
            password: this.state.password
        };
        if(board.title==null||board.title==""){
            return alert("title를 입력해주세요");
        }else{
            if(board.content==null||board.content==""){
                return alert("content를 입력해주세요");
            }else{
                if(board.username==null||board.username==""){
                    return alert("username을 입력해주세요");
                }else{
                    if(board.password==null||board.password==""){
                        return alert("비밀번호를 입력해주세요");
                    }
                }
            }
        }
        console.log("board =>"+JSON.stringify(board));
        BoardService.writeBoard(board).then(res => {
            window.location.href='/api/board';
        });
    }

    // 글 작성 취소시 글 목록페이지로 이동
    cancel(){
        window.location.href='/api/board';
    }


    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">글수정 페이지</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Title </label>
                                        <input placeholder="text" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler} required>
                                        </input>
                                    </div>
                                    <div className = "form-group">
                                        <label> Content </label>
                                        <input type="text" placeholder="content" name="content" className="form-control" 
                                        value={this.state.content} onChange={this.changeContentHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Username  </label>
                                        <input placeholder="username" name="username" className="form-control" 
                                        value={this.state.username} onChange={this.changeUsernameHandler} required/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Password  </label>
                                        <input type="password" placeholder="password" name="password" className="form-control" 
                                        value={this.state.password} onChange={this.changePasswordHandler} required/>
                                    </div>
                                    <button type='submit' className="btn btn-success" onClick={this.writeBoard}>Save</button>
                                    <button type='button' className="btn btn-danger" onClick={this.cancel} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}



export default UpdateBoardComponent;
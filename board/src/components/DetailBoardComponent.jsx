import React, { Component } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BoardService from '../service/BoardService';

class DetailBoardComponent extends Component {
    constructor(props){
        super(props);

        const location = useLocation;

        this.state={
            id: location.id,
            board: {}
        }
    }

    componentDidMount(){
        console.log(this.state);
        console.log("detailboard.compentDidMount.id"+parseFloat((this.state.id)));
        BoardService.detailBoard(this.state.id).then(res=>{
            this.setState({board: res.data});
        });
    }

    returnDate(cTime){
        return(
            <div className='row'>
                <label>작성일 : [{cTime}]</label>
            </div>
        )
    }

    goToList(){
        window.location.href='/api/board';
    }

    goToUpdate = (id,e) => {
        e.preventDefault();
        window.location.href=`/api/board/${this.state.id}`;
    }
    
    render() {
        return (
            <div>
                <div className='card col-md-6 offset-md-3'>
                    <h3 className='text-center'>상세보기 페이지</h3>
                    <div className='card-body'>
                        <div className='row'>
                            <label>Title</label>:{this.state.board.data?.title}
                        </div>
                        <div className='row'>
                            <label>Content</label>:{this.state.board.data?.content}
                        </div>
                        <div className='row'>
                            <label>Username</label>:{this.state.board.data?.username}
                        </div>
                        {this.returnDate(this.state.board.data?.createDate)}
                        <button type='button' className='btn btn-primary' onClick={this.goToList.bind(this)} style={{marginLeft:'10px'}}>글 목록</button>
                        <button type='button' className='btn btn-secondary' onClick={(e)=>{this.goToUpdate(this.state.id,e)}} style={{marginLeft:'10px'}}>글 수정</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailBoardComponent;
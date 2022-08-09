import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class DetailBoardComponent extends Component {
    constructor(props) {
        super(props);
        // console.log("detail props::::")
        let array = window.location.pathname.split("/") ?? null;
        let id = array[array.length - 1]
        console.log("detail props::::" + id);
        this.state = {
            board: {},
            id: id,
        }
        this.goToUpdate = this.goToUpdate.bind(this);
    }



    componentDidMount = () => {

        console.log("detailboard.compentDidMount.id" + this.state.id);
        BoardService.detailBoard(this.state.id).then(res => {
            this.setState({ board: res.data });
        });
        console.log("detailboard2.compentDidMount.id ===>" + this.state.id);
    }

    returnDate(cTime) {
        return (
            <div className='row'>
                <label>작성일 : [{cTime}]</label>
            </div>
        )
    }

    goToList() {
        window.location.href = '/api/board';
    }

    goToUpdate = (e) => {
        e.preventDefault();
        window.location.href = `/api/write/${this.state.id}`;
    }

    deleteBoard = async function () {
        if (window.confirm("글을 삭제하시겠습니까?")) {
            if (window.prompt("비밀번호를 입력해주세요.")) {
                BoardService.deleteBoard(this.state.id).then(res => {
                    console.log("delete result => " + JSON.stringify(res));
                    if (res.status == 200) {
                        window.location.href = '/api/board';
                    } else {
                        alert("글 삭제가 실패했습니다.\nusername혹은password를 다시 확인해주세요.");
                    }
                })
            }

        }
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
                        <button type='button' className='btn btn-primary' onClick={this.goToList.bind(this)} style={{ marginLeft: '10px' }}>글 목록</button>
                        <button type='button' className='btn btn-secondary' onClick={this.goToUpdate} style={{ marginLeft: '10px' }}>글 수정</button>
                        <button type='button' className='btn btn-danger' onClick={this.deleteBoard.bind(this)} style={{ marginLeft: '10px' }}>글 삭제</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailBoardComponent;
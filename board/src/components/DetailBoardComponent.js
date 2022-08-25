import React, { Component } from "react";
import BoardService from "../service/BoardService";

class DetailBoardComponent extends Component {
  constructor(props) {
    super(props);
    let array = window.location.pathname.split("/") ?? null;
    let id = array[array.length - 1];
    this.state = {
      board: {},
      id: id,
      p_num: 1
    };
    this.goToUpdate = this.goToUpdate.bind(this);
  }

  componentDidMount = () => {
    BoardService.detailBoard(this.state.id).then((res) => {
      this.setState({ board: res.data });
    });
  };

  returnDate(cTime) {
    return (
      <div className="row">
        <label>작성일 : [{cTime}]</label>
      </div>
    );
  }

  goToList() {
    let keyword = "안";
    let p_num = JSON.parse(window.sessionStorage.getItem("p_num"));
    console.log("goToList p_num : " + p_num);
    console.log("goToList keyword : " + keyword);
    BoardService.getSearch(keyword, p_num).then((res) => {
      this.setState({
        board: res.data.boardList,
        count: res.data.allCount,
      });
    });
    console.log("goToList p_num2 : " + p_num);
    window.location.href = "/board/" + `${p_num}`;
  }

  goToUpdate = (e) => {
    e.preventDefault();
    window.location.href = `/write/${this.state.id}`;
  };

  deleteBoard = async function () {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      let password = window.prompt("비밀번호를 입력해주세요.");
      if (password !== "") {
        let board = {
          id: this.state.id,
          password: password,
        };

        console.log("board =>" + JSON.stringify(board));

        await BoardService.deleteBoard(this.state.id, board).then((res) => {
          console.log("delete result => " + JSON.stringify(res));
          console.log("delete result code => " + JSON.stringify(res.data.code));
          let rsCode = res.data.code;
          if (rsCode === 1) {
            window.location.href = "/board";
          } else {
            alert("글 삭제가 실패했습니다. password를 다시 확인해주세요.");
          }
        });
      }
    }
  };

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">상세보기 페이지</h3>
          <div className="card-body">
            <div className="row">
              <label>Title</label>:{this.state.board.data?.title}
            </div>
            <div className="row">
              <label>Content</label>:{this.state.board.data?.content}
            </div>
            <div className="row">
              <label>Username</label>:{this.state.board.data?.username}
            </div>
            {this.returnDate(this.state.board.data?.createDate)}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.goToList.bind(this)}
              style={{ marginLeft: "10px" }}
            >
              글 목록
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.goToUpdate}
              style={{ marginLeft: "10px" }}
            >
              글 수정
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.deleteBoard.bind(this)}
              style={{ marginLeft: "10px" }}
            >
              글 삭제
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailBoardComponent;

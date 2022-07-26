import React, { Component } from "react";
import BoardService from "../service/BoardService";

class WriteBoardComponent extends Component {
  constructor(props) {
    super(props);
    console.log("location==>" + window.location.pathname);
    let array = window.location.pathname.split("/") ?? null;
    let id = array[array.length - 1];
    // this.state에 폼 양식에서 사용될 파라미터를 정의
    this.state = {
      id: id,
      title: "",
      content: "",
      username: "",
      password: "",
      file: ""
    };

    // 폼 양식에 값이 입력되면 this.state에 정의 된 변수의 값을 변경하도록 바인드
    // 글쓰기 버튼을 클릭시 API에 글 작성 리퀘스트를 보내는 함수를 바인드
    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changeFileHandler = this.changeFileHandler.bind(this);
    this.writeBoard = this.writeBoard.bind(this);
  }

  // this.setState로 this.state에 정의된 변수에 값을 대입하게 해주는 함수를 선언
  changeTitleHandler = (e) => {
    this.setState({ title: e.target.value });
  };

  changeContentHandler = (e) => {
    this.setState({ content: e.target.value });
  };

  changeUsernameHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  changePasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  changeFileHandler = (e) => {
    this.setState({ file: e.target.value });
  };

  writeBoard = (e) => {
    e.preventDefault(); // 새로고침을 막아줌
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("content", this.state.content);
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    console.log("formdata : : " + formData)
    let board = {
      title: this.state.title,
      content: this.state.content,
      username: this.state.username,
      password: this.state.password,
      file: this.state.file
    };
    if (board.title === null || board.title === "") {
      return alert("title를 입력해주세요");
    }

    if (board.content === null || board.content === "") {
      return alert("content를 입력해주세요");
    }

    if (board.username === null || board.username === "") {
      return alert("username을 입력해주세요");
    }

    if (board.password === null || board.password === "") {
      return alert("비밀번호를 입력해주세요");
    }
    console.log("board this.state.id=>" + this.state.id);
    if (this.state.id === "create") {
      console.log("board write=>" + JSON.stringify(board));
      BoardService.writeBoard(formData).then((res) => {
        window.location.href = "/board";
      });
    } else {
      console.log("board update=>" + JSON.stringify(board));
      if (window.confirm("글을 수정하시겠습니까?")) {
        let password = window.prompt("비밀번호를 입력해주세요.");
        if (password !== "") {
          let board2 = {
            id: this.state.id,
            title: board.title,
            content: board.content,
            username: board.username,
            password: password,
          };
          console.log("board =>" + JSON.stringify(board2));
          BoardService.updateBoard(this.state.id, board2).then((res) => {
            console.log("update result => " + JSON.stringify(res));
            console.log(
              "update result code => " + JSON.stringify(res.data.code)
            );
            let rsCode = res.data.code;
            if (rsCode === 1) {
              window.location.href = "/board";
            } else {
              alert("글 수정이 실패했습니다. password를 다시 확인해주세요.");
            }
          });
        }
      }
    }
  };

  // 글 작성 취소시 글 목록페이지로 이동
  cancel() {
    window.location.href = "/board";
  }

  getTitle() {
    if (this.state.id === "create") {
      return <h3 className="text-center">글쓰기 페이지</h3>;
    } else {
      return <h3 className="text-center">{this.state.id}번글 수정 페이지</h3>;
    }
  }

  componentDidMount() {
    if (this.state.id === "create") {
      return;
    } else {
      BoardService.detailBoard(this.state.id).then((res) => {
        let board = res.data;
        console.log("board => " + JSON.stringify(board));

        this.setState({
          title: board.data.title,
          content: board.data.content,
          username: board.data.username,
          password: board.data.password,
          file: board.data.file
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form encType="multipart/fom-data">
                  <div className="form-group">
                    <label> Title </label>
                    <input
                      placeholder="text"
                      maxLength="50"
                      name="title"
                      className="form-control"
                      value={this.state?.title || ""}
                      onChange={this.changeTitleHandler}
                      required
                    ></input>
                  </div>
                  <div className="form-group">
                    <label> Content </label>
                    <input
                      type="text"
                      placeholder="content"
                      maxLength="200"
                      name="content"
                      className="form-control"
                      value={this.state.content || ""}
                      onChange={this.changeContentHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label> Username </label>
                    <input
                      placeholder="username"
                      maxLength="50"
                      name="username"
                      className="form-control"
                      value={this.state.username || ""}
                      onChange={this.changeUsernameHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label> Password </label>
                    <input
                      type="password"
                      placeholder="password"
                      maxLength="50"
                      name="password"
                      className="form-control"
                      value={this.state.password || ""}
                      onChange={this.changePasswordHandler}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>File</label>
                    <input
                      type="file"
                      name="file"
                      value={this.state.file || ""}
                      onChange={this.changeFileHandler}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={this.writeBoard}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

export default WriteBoardComponent;

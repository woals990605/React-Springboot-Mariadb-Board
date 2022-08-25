import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);
    // 페이지에 표시될 글 목록데이터를 넣기위한 변수 board를 this.state에 선언
    // this.state에 선언한 변수의 값을 변경하기 위해서 setState를 사용해야함
    // let array = window.location.pathname.split("/") ?? null;
    // let a = array[array.length - 1];

    this.state = {
      board: [],
      keyword: "",
      p_num: 1,
      count: 0,
    };
    // 글 작성 버튼을 클릭 했을 때 동작하는 wirteBoard함수를 바인드
    this.writeBoard = this.writeBoard.bind(this);
    this.detailBoard = this.detailBoard.bind(this);
    this.searchBoard = this.searchBoard.bind(this);
  }
  // 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
  componentDidMount = () => {
    // window.localStorage.removeItem("p_num");
    let p_num = JSON.parse(window.sessionStorage.getItem("p_num"));
    console.log("p_num: : " + p_num);
    console.log("this.state.p_num: : " + this.state.p_num)
    let param = {};
    if (p_num === null) {
      param = {
        keyword: this.state.keyword,
        p_num: this.state.p_num,
      };
    } else {
      param = {
        keyword: this.state.keyword,
        p_num: p_num,
      };
    }

    BoardService.getSearch(param.keyword, param.p_num).then((res) => {
      this.setState({
        board: res.data.boardList,
        p_num: param.p_num,
        count: res.data.allCount,
      });

    });

    // BoardService.getSeach().then((res) => {
    //   this.setState({ keyword: res.data });
    // })

  };

  // 글 작성 버튼을 클릭시 글작성 페이지로 이동하게 해주는 함수를 정의한것.
  writeBoard() {
    window.location.href = "/write/create";
  }

  detailBoard(id) {
    window.sessionStorage.setItem("p_num", JSON.stringify(this.state.p_num));

    window.location.href = `/detail/${id}`;
  }

  searchBoard(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  clickBoard = (e) => {
    let param = {
      keyword: this.state.keyword,
      p_num: this.state.p_num,
    };
    BoardService.getSearch(param.keyword, param.p_num).then((res) => {
      this.setState({
        board: res.data.boardList,
        count: res.data.allCount,
      });
    });
  };

  listBoard(p_num, keyword) {
    let param = {
      keyword: keyword,
      p_num: p_num,
    };
    this.setState({ p_num: p_num });
    BoardService.getSearch(param.keyword, param.p_num).then((res) => {
      this.setState({
        board: res.data.boardList,
        count: res.data.allCount,
      });
      if (this.state.p_num === 0) {
        this.setState({
          p_num: 1,
        });
      }
    });
    window.sessionStorage.removeItem("p_num");
  }

  viewPaging(p_num, keyword) {
    let param = {};
    if (p_num === null) {
      param = {
        keyword: this.state.keyword,
        p_num: this.state.p_num,
      };
    } else {
      param = {
        keyword: this.state.keyword,
        p_num: p_num,
      };
    }
    console.log("viewpaging :: " + param.p_num);
    let pageCount = 5;
    let totalPage = Math.ceil(this.state.count / 10);
    let pageGroup = Math.ceil(param.p_num / pageCount);
    let last = pageGroup * pageCount;
    if (last > totalPage) {
      last = totalPage;
    }
    if (totalPage < pageCount) {
      pageCount = totalPage;
    }
    let first = last - (pageCount - 1);
    let pageNums = [];
    for (let i = first; i <= last; i++) {
      pageNums.push(i);
      if (param.p_num < last) {
        last = p_num;
      }
    }

    return pageNums.map((p_num) => (
      <li className="page-item" key={p_num.toString()}>
        <a
          className="page-link"
          onClick={() => this.listBoard(p_num, keyword)}
          style={
            this.state.p_num == p_num
              ? { color: "#4217b8", backgroundColor: "#337ab7" }
              : null
          }
        >
          {p_num}
        </a>
      </li>
    ));
  }

  isPagingPrev() {
    // < 앞페이지
    return (
      <li className="page-item">
        <a
          className="page-link"
          onClick={() =>
            this.listBoard(
              this.state.p_num === 1
                ? (this.state.p_num = 1)
                : this.state.p_num - 1,
              null
            )
          }
          tabIndex="-1"
        >
          &lt;
        </a>
      </li>
    );
  }

  isPagingNext() {
    // > 다음페이지
    return (
      <li className="page-item">
        <a
          className="page-link"
          onClick={() =>
            this.listBoard(
              this.state.p_num === Math.ceil(this.state.count / 10)
                ? this.state.p_num + 0
                : this.state.p_num + 1,
              null
            )
          }
          tabIndex="-1"
        >
          &gt;
        </a>
      </li>
    );
  }

  isMoveToFirstPage() {
    // << 처음페이지
    if (this.state.p_num !== 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(1, null)}
            tabIndex="-1"
          >
            &lt;&lt;
          </a>
        </li>
      );
    }
  }

  isMoveToLastPage() {
    // >> 마지막페이지
    if (this.state.p_num <= Math.ceil(this.state.count / 10)) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() =>
              this.listBoard(Math.ceil(this.state.count / 10), null)
            }
            tabIndex="-1"
          >
            &gt;&gt;({Math.ceil(this.state.count / 10)})
          </a>
        </li>
      );
    }
  }

  // render() 함수의 내용이 실제 웹페이지에 표시된다.
  // maps() 함수를 사용해서 boards의 데이터를 출력한다.
  render() {
    return (
      <div>
        <h2 className="text-center">Boards List</h2>
        <form className="d-flex justify-content-end">
          <input
            name="keyword"
            type="text"
            placeholder="Search"
            onKeyPress={this.searchBoard}
            onChange={this.searchBoard}
            value={this.state.value}
          />
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => this.clickBoard(this.state.keyword)}
          >
            검색
          </button>
        </form>
        <br />
        <div align="right">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.writeBoard}
          >
            글 작성
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>내용</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {this.state.board.map((board, index) => (
                <tr key={board.id}>
                  <td>
                    {Math.ceil(this.state.count - index) -
                      (this.state.p_num - 1) * 10}
                  </td>
                  <td onClick={() => this.detailBoard(board.id)}>
                    {board.title}
                  </td>
                  <td>{board.content}</td>
                  <td>{board.username}</td>
                  <td>{board.createDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {this.isMoveToFirstPage()}
              {this.isPagingPrev()}
              {this.viewPaging(this.state.p_num)}
              {this.isPagingNext()}
              {this.isMoveToLastPage()}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default ListBoardComponent;

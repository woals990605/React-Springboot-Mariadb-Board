import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);
    // 페이지에 표시될 글 목록데이터를 넣기위한 변수 board를 this.state에 선언
    // this.state에 선언한 변수의 값을 변경하기 위해서 setState를 사용해야함

    this.state = {
      board: [],
      keyword: "",
      paging: {},
      p_num: 1,
    };
    // 글 작성 버튼을 클릭 했을 때 동작하는 wirteBoard함수를 바인드
    this.writeBoard = this.writeBoard.bind(this);
    this.detailBoard = this.detailBoard.bind(this);
    this.searchBoard = this.searchBoard.bind(this);
  }
  // 리액트의 생명주기 메소드인 'componentDidMount'에서 'BoardService'의 메소드를 호출해서 데이터를 가져온다.
  componentDidMount = () => {
    BoardService.getBoards(this.state.p_num).then((res) => {
      this.setState({
        board: res.data.list,
        no: res.data.length,
        p_num: res.data.pagingData.currentPageNum,
        paging: res.data.pagingData,
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
    console.log("pass detail ::: " + id);
    window.location.href = `/detail/${id}`;
  }

  searchBoard(e) {
    this.setState({
      keyword: e.target.value,
    });
    console.log("tis ; key ::" + this.state.keyword);
  }

  clickBoard = () => {
    let param = {
      keyword: this.state.keyword,
    };
    BoardService.getSearch(param.keyword).then((res) => {
      console.log("tis ; key ==============::" + param);
      console.log("tis ; key ::" + this.state.keyword);
      console.log("tis ; keyres ::" + res.data);
      this.setState({ board: res.data });
    });
  };

  listBoard(page) {
    let nParam = {
      p_num: this.state.p_num,
    };
    console.log("pageNum : " + this.state.p_num);
    BoardService.getBoards(nParam.p_num).then((res) => {
      console.log("tis ; page ==============::" + nParam.p_num);
      console.log(res.data);
      console.log("page page : " + page);
      this.setState({ p_num: page });
      // this.setState({
      //   p_num: res.data.pagingData.currentPageNum,
      //   paging: res.data.pagingData,
      //   board: res.data.list,
      // });
    });
  }

  viewPaging() {
    const pageNums = [];

    console.log(pageNums);
    for (
      let i = this.state.paging.pageNumStart;
      i <= this.state.paging.pageNumEnd;
      i++
    ) {
      pageNums.push(i);
    }

    return pageNums.map((page) => (
      <li className="page-item" key={page.toString()}>
        <a className="page-link" onClick={() => this.listBoard(page)}>
          {page}
        </a>
      </li>
    ));
  }

  isPagingPrev() {
    // < 앞페이지
    if (this.state.paging.prev) {
      console.log("this.state.paging.prev" + this.state.paging.prev);
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.p_num - 1)}
            tabindex="-1"
          >
            &lt;
          </a>
        </li>
      );
    }
  }

  isPagingNext() {
    // > 다음페이지
    if (this.state.paging.next) {
      console.log("this.state.paging.next" + this.state.paging.next);
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.p_num + 1)}
            tabIndex="-1"
          >
            &gt;
          </a>
        </li>
      );
    }
  }

  isMoveToFirstPage() {
    // << 처음페이지
    if (this.state.p_num != 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(1)}
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
    if (this.state.p_num != this.state.paging.pageNumCountTotal) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)}
            tabIndex="-1"
          >
            &gt;&gt;({this.state.paging.pageNumCountTotal})
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
            onKeyUp={this.searchBoard}
            onChange={this.searchBoard}
            value={this.state.keyword}
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
              {this.state.board.map((board) => (
                <tr key={board.id}>
                  <td>{board.id}</td>
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
              {this.viewPaging()}
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

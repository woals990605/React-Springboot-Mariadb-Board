import axios from "axios";

// springboot api의 URL을 정의
const BOARD_API_BASE_URL = "/api";
const BOARD_API_LIST_URL = BOARD_API_BASE_URL + "/board";
const BOARD_API_SEARCH_URL = BOARD_API_BASE_URL + "/search";
const BOARD_API_WRITE_URL = BOARD_API_BASE_URL + "/write";
const BOARD_API_DETAIL_URL = BOARD_API_BASE_URL + "/detail";
const BOARD_API_UPDATE_URL = BOARD_API_BASE_URL + "/update";
const BOARD_API_DELETE_URL = BOARD_API_BASE_URL + "/delete";

class BoardService {
  // 글목록 데이터를 가져오는 함수
  getBoards() {
    return axios.get(BOARD_API_LIST_URL);
  }

  getSearch(keyword) {
    console.log("keyword++++++++++++++++++++" + keyword)
    return axios.get(BOARD_API_SEARCH_URL + "/" + keyword);
  }

  writeBoard(board) {
    return axios.post(BOARD_API_WRITE_URL, board);
  }

  detailBoard(id) {
    console.log("service.boardService.detailBoard.id" + id);
    return axios.get(BOARD_API_DETAIL_URL + "/" + id);
  }

  updateBoard(id, board) {
    return axios.post(BOARD_API_UPDATE_URL + "/" + id, board);
  }

  deleteBoard(id, board) {
    return axios.post(BOARD_API_DELETE_URL + "/" + id, board);
  }
}

export default new BoardService();

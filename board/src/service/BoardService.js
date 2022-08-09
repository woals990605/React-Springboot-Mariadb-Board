import axios from "axios";

// springboot api의 URL을 정의
const BOARD_API_BASE_URL = "/api/board";
const BOARD_API_WRITE_URL = "/api/write";
const BOARD_API_DETAIL_URL = "/api/detail";

class BoardService {
  // 글목록 데이터를 가져오는 함수
  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }

  writeBoard(board) {
    return axios.post(BOARD_API_WRITE_URL, board);
  }

  detailBoard(id) {
    console.log("service.boardService.detailBoard.id" + id);
    return axios.get(BOARD_API_DETAIL_URL + "/" + id);
  }

  updateBoard(id, board) {
    return axios.put(BOARD_API_WRITE_URL + "/" + id, board);
  }

  deleteBoard(id, board) {
    return axios.delete(BOARD_API_DETAIL_URL + "/" + id, board);
  }
}

export default new BoardService();

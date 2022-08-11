package com.example.board.web;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.board.Service.BoardService;
import com.example.board.domain.Board;
import com.example.board.web.dto.ResponseDto;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/api/board")
    public List<Board> list() {
        return boardService.list();
    }

    // @RequestMapping(value = "/api/search", method = RequestMethod.GET)
    // public List<Board> search(@RequestParam("keyword") String keyword) {
    // System.out.println("keyword : : :" + keyword);
    // return boardService.search(keyword);
    // }

    @GetMapping("/api/search/{keyword}")
    public List<Board> searchBoard(@PathVariable String keyword) {
        System.out.println("=================================");
        System.out.println(keyword);
        System.out.println("=================================");
        return boardService.search(keyword);
    }

    @PostMapping("/api/write")
    public ResponseDto<?> writeBoard(@RequestBody Board board) {
        System.out.println("=================================");
        System.out.println(board);
        System.out.println("=================================");
        boardService.write(board);
        return new ResponseDto<>(1, "성공", null);
    }

    @GetMapping("/api/detail/{id}")
    public ResponseDto<?> detail(@PathVariable Integer id) {
        Board boardEntity = boardService.detail(id);
        return new ResponseDto<>(1, "성공", boardEntity);
    }

    @PostMapping("/api/update/{id}")
    public ResponseDto<?> update(@PathVariable Integer id, @RequestBody Board board) {
        Board boardEntity = boardService.update(id, board);
        return new ResponseDto<>(1, "성공", boardEntity);
    }

    @PostMapping("/api/delete/{id}")
    public ResponseDto<?> delete(@PathVariable Integer id, @RequestBody Board board) {
        Board boardEntity = boardService.delete(id, board);
        System.out.println("=================================");
        System.out.println(boardEntity);
        System.out.println("=================================");
        if (boardEntity == null) {
            return new ResponseDto<>(-1, "실패", null);
        } else {
            return new ResponseDto<>(1, "성공", boardEntity);
        }
    }
}

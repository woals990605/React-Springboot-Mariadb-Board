package com.example.board.web;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public List<Board> list(){
        return boardService.list();
    }

    @PostMapping("/api/write")
    public Board writeBoard(@RequestBody Board board){
        return boardService.write(board);
    }

    @GetMapping("/api/detail/{id}")
    public ResponseDto<?> detail(@PathVariable Integer id){
        Board boardEntity = boardService.detail(id);
        return new ResponseDto<>(1,"성공",boardEntity);
    }
}

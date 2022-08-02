package com.example.board.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.domain.Board;
import com.example.board.domain.BoardRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
    
    private final BoardRepository boardRepository;

    @Transactional
    public List<Board> list(){
        return boardRepository.findAll();
    }

    @Transactional
    public Board write(Board board){
        return boardRepository.save(board);
    }

    @Transactional
    public Board detail(Integer id){
        Optional<Board> boardOp = boardRepository.findById(id);
        
        if(boardOp.isPresent()){
            Board boardEntity = boardOp.get();
            return boardEntity;
        }else{
            throw new RuntimeException("해당 아이디를 찾을 수 없습니다."+id);
        }
        
        
    }
}

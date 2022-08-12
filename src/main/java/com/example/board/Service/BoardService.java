package com.example.board.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.board.domain.Board;
import com.example.board.domain.BoardRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> list() {
        return boardRepository.findAll();
    }

    public List<Board> search(String keyword) {
        System.out.println("service search++++++++++++++++++++++++++++" + keyword);
        return boardRepository.mList(keyword);
    }

    @Transactional
    public Board write(Board board) {
        return boardRepository.save(board);
    }

    @Transactional
    public Board detail(Integer id) {
        Optional<Board> boardOp = boardRepository.findById(id);

        if (boardOp.isPresent()) {
            Board boardEntity = boardOp.get();
            return boardEntity;
        } else {
            throw new RuntimeException("해당 글을 찾을 수 없습니다." + id);
        }

    }

    @Transactional
    public Board update(Integer id, Board board) {
        Optional<Board> boardOpPw = boardRepository.checkPassword(id, board.getPassword());
        Optional<Board> boardOp = boardRepository.findById(id);
        if (boardOpPw.isPresent()) {
            System.out.println("update :: boardOp2 : " + boardOpPw);
            Board boardEntityPw = boardOp.get();
            System.out.println("update :: boardOp3 : " + boardEntityPw);
            if (boardOp.isPresent()) {
                Board boardEntity = boardOp.get();
                System.out.println("update :: boardOp1 : " + boardOp);
                System.out.println("board :" + board);
                boardEntity.setTitle(board.getTitle());
                boardEntity.setContent(board.getContent());
                boardEntity.setUsername(board.getUsername());
                boardEntity.setPassword(board.getPassword());

                System.out.println("update :: boardEntity : " + boardEntity);

                System.out.println("update :: boardOp3 : " + boardEntity);
                return boardEntity;
            }
            return boardEntityPw;
        } else {
            throw new RuntimeException("해당 아이디를 찾을 수 없습니다." + id);
        }
    }

    @Transactional
    public Board delete(Integer id, Board board) {
        // System.out.println("delete :: id : "+id);
        // System.out.println("delete :: pwd : "+board.getPassword());
        Optional<Board> boardOp = boardRepository.checkPassword(id, board.getPassword());
        // System.out.println("delete :: boardOp : "+boardOp);

        if (boardOp.isPresent()) {
            Board boardEntity = boardOp.get();
            System.out.println("delete :: boardOp : " + boardEntity);

            try {
                boardRepository.delete(board);
                return boardEntity;
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }
}

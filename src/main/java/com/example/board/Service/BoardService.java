package com.example.board.Service;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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

    public Map search(String keyword, Integer p_num) {
        int allCount = 0;
        System.out.println("service search++++++++++++++++++++++++++++" + keyword + p_num);
        int nowPage = p_num;
        int perPageNum = 10;
        int rowStart = ((nowPage - 1) * perPageNum);
        System.out.println("rowStart : : :" + rowStart);
        allCount = boardRepository.mListCount(keyword);
        Map map = new HashMap<>();
        map.put("boardList", boardRepository.mList(keyword, rowStart));
        map.put("allCount", allCount);
        return map;
    }

    @Transactional
    public void write(Board board, MultipartFile file) throws Exception {
        String filePath= System.getProperty("/home/woals990605/사진")+"/src/main/resources/static/files";
        System.out.println("=============================================");
        System.out.println(filePath);
        System.out.println("========================================filepath");
        UUID uuid =UUID.randomUUID();
        String fileName = uuid+"_"+file.getOriginalFilename();
        File saveFile = new File(filePath, fileName); 
        file.transferTo(saveFile);
        board.setFilename(fileName);
        board.setFilepath("/files/"+fileName);

        boardRepository.save(board);
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

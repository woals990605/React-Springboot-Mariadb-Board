package com.example.board;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
    
    @GetMapping("/api/hello")
    public String test(){
        return "안녕하세요 ㅎㅎㅎ";// 테스트
    }
}

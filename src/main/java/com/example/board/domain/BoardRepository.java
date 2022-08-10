package com.example.board.domain;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Query(value = "SELECT * FROM Board WHERE id = :id AND password = :password", nativeQuery = true)
    Optional<Board> checkPassword(@Param("id")Integer id,@Param("password") String password);
}

package com.example.board.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    @Query(value = "SELECT * FROM Board WHERE id = :id AND password = :password", nativeQuery = true)
    Optional<Board> checkPassword(@Param("id") Integer id, @Param("password") String password);

    @Query(value = "SELECT * FROM Board WHERE (:keyword is null or title LIKE %:keyword%) ORDER BY id DESC limit :p_num, 10", nativeQuery = true)
    List<Board> mList(@Param("keyword") String keyword, @Param("p_num") Integer p_num);

    @Query(value = "SELECT COUNT(*) FROM Board WHERE (:keyword is null or title LIKE %:keyword%)", nativeQuery = true)
    int mListCount(@Param("keyword") String keyword);
}

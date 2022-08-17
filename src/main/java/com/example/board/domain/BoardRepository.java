package com.example.board.domain;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

	@Query(value = " SELECT * FROM board WHERE 0<id ORDER BY id DESC LIMIT ?,10;", nativeQuery = true)
	List<Board> findFromTo(
			final Integer objectStartNum,
			final Integer objectEndNum);

    @Query(value = "SELECT * FROM Board WHERE id = :id AND password = :password", nativeQuery = true)
    Optional<Board> checkPassword(@Param("id") Integer id, @Param("password") String password);

    @Query(value = "SELECT * FROM Board WHERE title like %:keyword%", nativeQuery = true)
    List<Board> mList(@Param("keyword") String keyword);
}

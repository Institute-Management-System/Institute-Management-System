package com.ims.repository;

import com.ims.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    java.util.List<Notice> findTop5ByTargetRoleInOrderByPublishDateDesc(java.util.List<com.ims.entity.Role> roles);

    java.util.List<Notice> findAllByTargetRoleInOrderByPublishDateDesc(java.util.List<com.ims.entity.Role> roles);
}

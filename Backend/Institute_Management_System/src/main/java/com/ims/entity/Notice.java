package com.ims.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "notices")
@AttributeOverride(
    name = "id",
    column = @Column(name = "notice_id")
)
public class Notice extends BaseEntity {

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "publish_date")
    private LocalDate publishDate;

    //@Enumerated(EnumType.STRING)
    //@Column(name = "target_role")
    //private Role targetRole;


    }
}


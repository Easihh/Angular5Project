package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="NEWS")
@NamedQueries({
	@NamedQuery(name="News.findAllByOrderDesc",query="select n from News n Order by n.created DESC")
})
public class News {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NEWS_SEQ")
	@SequenceGenerator(name = "NEWS_SEQ",sequenceName = "NEWS_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="CREATED")
	private Long created;

	@Column(name="TITLE")
	private String title;

	@Column(name="CONTENT")
	private String content;
	
	public News() {}//default construct required

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public Long getCreated() {
		return created;
	}

	public void setCreated(Long created) {
		this.created = created;
	}
}

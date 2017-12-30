package com.asura.web;

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
@Table(name="TOPICS")
@NamedQueries({
	@NamedQuery(name="Topic.findByIdsOrderByLastUpdate",query="select t from Topic t Order by t.created DESC")
})
public class Topic {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TOPICS_SEQ")
	@SequenceGenerator(name = "TOPICS_SEQ",sequenceName = "TOPICS_SEQ", allocationSize = 1)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "TITLE")
	private String title;
	
	@Column(name = "AUTHOR")
	private String author;
	
	@Column(name = "CREATED")
	private Long created;
	
	private transient Long repliesCounter;
	private transient Long lastReplies;
	
	public Long getRepliesCounter() {
		return repliesCounter;
	}

	public void setRepliesCounter(Long repliesCounter) {
		this.repliesCounter = repliesCounter;
	}

	public Long getLastReplies() {
		return lastReplies;
	}

	public void setLastReplies(Long lastReplies) {
		this.lastReplies = lastReplies;
	}

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

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public Long getCreated() {
		return created;
	}

	public void setCreated(Long created) {
		this.created = created;
	}
	
}

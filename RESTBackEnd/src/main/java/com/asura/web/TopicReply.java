package com.asura.web;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="TOPIC_REPLIES")
public class TopicReply {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TOPIC_REPLIES_SEQ")
	@SequenceGenerator(name = "TOPIC_REPLIES_SEQ",sequenceName = "TOPIC_REPLIES_SEQ", allocationSize = 1)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="TOPIC_ID")
	private Long topicId;
	
	@Column(name = "AUTHOR")
	private String author;
	
	@Column(name="REPLY_TEXT")
	private String replyText;
	
	@Column(name = "CREATED")
	private Long created;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getReplyText() {
		return replyText;
	}

	public void setReplyText(String replyText) {
		this.replyText = replyText;
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
	
	public Long getTopicId() {
		return topicId;
	}

	public void setTopicId(Long topicId) {
		this.topicId = topicId;
	}
}

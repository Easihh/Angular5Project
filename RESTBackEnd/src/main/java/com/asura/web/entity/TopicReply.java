package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="TOPIC_REPLIES")
@NamedQueries({
	@NamedQuery(name="TopicReply.findByTopicId",query="select t from TopicReply t where t.topicId=:id Order by t.created ASC")
})
public class TopicReply {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TOPIC_REPLIES_SEQ")
	@SequenceGenerator(name = "TOPIC_REPLIES_SEQ",sequenceName = "TOPIC_REPLIES_SEQ", allocationSize = 1)
	@Column(name = "ID")
	private Long id;
	
	@Column(name="TOPIC_ID")
	private Long topicId;
	
	@OneToOne
	@JoinColumn(name="CREATED_BY", referencedColumnName="ID")
	private ApplicationUser createdBy;
	
	@Column(name="REPLY_COMMENT")
	private String replyComment;
	
	@Column(name = "CREATED")
	private Long created;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
	
	public String getReplyComment() {
		return replyComment;
	}

	public void setReplyComment(String replyComment) {
		this.replyComment = replyComment;
	}
	
	public ApplicationUser getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(ApplicationUser createdBy) {
		this.createdBy = createdBy;
	}
}

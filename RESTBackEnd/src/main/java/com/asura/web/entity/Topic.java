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
@Table(name="TOPICS")
@NamedQueries({
	@NamedQuery(name="Topic.findOrderByLastUpdate",query="select t from Topic t where t.forumId=:forumId Order by t.sticky desc,t.lastUpdated DESC")
})
public class Topic {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TOPICS_SEQ")
	@SequenceGenerator(name = "TOPICS_SEQ",sequenceName = "TOPICS_SEQ", allocationSize = 1)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "IS_LOCKED")
	private boolean locked;
	
	@Column(name = "IS_STICKY")
	private boolean sticky;

	@Column(name = "FORUM_ID")
	private Long forumId;
	
	@Column(name = "TITLE")
	private String title;
	
	@OneToOne
	@JoinColumn(name="CREATED_BY", referencedColumnName="ID")
	private ApplicationUser createdBy;
	
	@Column(name = "CREATED")
	private Long created;
	
	private transient Long repliesCounter;
	
	@Column(name="LAST_UPDATED")
	private Long lastUpdated;
	
	public Long getRepliesCounter() {
		return repliesCounter;
	}

	public void setRepliesCounter(Long repliesCounter) {
		this.repliesCounter = repliesCounter;
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

	public ApplicationUser getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(ApplicationUser createdBy) {
		this.createdBy = createdBy;
	}

	public Long getCreated() {
		return created;
	}

	public void setCreated(Long created) {
		this.created = created;
	}
	
	public Long getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(Long lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
	
	public Long getForumId() {
		return forumId;
	}

	public void setForumId(Long forumId) {
		this.forumId = forumId;
	}
	
	public boolean isLocked() {
		return locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}
	
	public boolean isSticky() {
		return sticky;
	}

	public void setSticky(boolean sticky) {
		this.sticky = sticky;
	}
}

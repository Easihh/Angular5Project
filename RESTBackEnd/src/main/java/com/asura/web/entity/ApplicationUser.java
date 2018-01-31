package com.asura.web.entity;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "DB_USERS")
@NamedQueries({
	@NamedQuery(name="ApplicationUser.findByUsername",query="select t from ApplicationUser t where t.username=:name")
})
/* Do not expose password in this class since this class information is sent via http response */
public class ApplicationUser {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DBUSERS_SEQ")
	@SequenceGenerator(name = "DBUSERS_SEQ", sequenceName = "DBUSERS_SEQ", allocationSize = 1)
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String username;
	
	@OneToOne
	@JoinColumn(name="ROLE_ID", referencedColumnName="ID")
	private Role role;
	
	@Column(name="POST_COUNT")
	private long postCount;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	public long getPostCount() {
		return postCount;
	}

	public void setPostCount(long postCount) {
		this.postCount = postCount;
	}
}

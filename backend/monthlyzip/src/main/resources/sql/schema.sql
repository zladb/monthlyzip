CREATE DATABASE monthlyzip;
USE monthlyzip;

CREATE TABLE member (
    member_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    user_type ENUM('임대인', '임차인') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE building (
    building_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id BIGINT NOT NULL,
    address VARCHAR(255) NOT NULL,
    building_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES member(member_id) ON DELETE CASCADE
);

CREATE TABLE room (
    room_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    property_id BIGINT NOT NULL,
    room_number VARCHAR(20) NOT NULL,
    floor BIGINT,
    area BIGINT,
    is_occupied TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT room_property_unique UNIQUE (property_id, room_number),
    FOREIGN KEY (property_id) REFERENCES building(building_id) ON DELETE CASCADE
);

CREATE TABLE contract (
    contract_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    landlord_id BIGINT NOT NULL,
    tenant_id BIGINT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    monthly_rent BIGINT NOT NULL,
    deposit BIGINT NOT NULL,
    payment_day BIGINT NOT NULL,
    bank_account VARCHAR(100),
    is_active_landlord TINYINT(1) DEFAULT 1,
    is_active_tenant TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE,
    FOREIGN KEY (landlord_id) REFERENCES member(member_id),
    FOREIGN KEY (tenant_id) REFERENCES member(member_id)
);

CREATE TABLE payment (
    payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    contract_id BIGINT NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    due_date TIMESTAMP NOT NULL,
    amount BIGINT NOT NULL,
    payment_status ENUM('미납', '납부완료', '확인중') DEFAULT '미납',
    payment_proof TINYINT(1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES rental_contract(contract_id) ON DELETE CASCADE
);

CREATE TABLE message (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    parent_message_id BIGINT,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    message_type ENUM('수리요청', '문의', '기타') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_message_id) REFERENCES message(message_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES member(member_id),
    FOREIGN KEY (receiver_id) REFERENCES member(member_id)
);

CREATE TABLE message_attachment (
    attachment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES message(message_id) ON DELETE CASCADE
);

CREATE TABLE notification (
    notification_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type ENUM('월세', '계약', '문의', '기타') NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);

CREATE TABLE inquiry (
    inquiry_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    member_id BIGINT NOT NULL,
    contract_id BIGINT NOT NULL,
    inquiry_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT '접수',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (contract_id) REFERENCES rental_contract(contract_id) ON DELETE CASCADE
);

CREATE TABLE inquiry_reply (
    reply_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    inquiry_id BIGINT NOT NULL,
    member_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (inquiry_id) REFERENCES inquiry(inquiry_id) ON DELETE CASCADE,
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

CREATE INDEX idx_email ON member(email);
CREATE INDEX idx_user_type ON member(user_type);
CREATE INDEX idx_owner ON building(owner_id);
CREATE INDEX idx_property ON room(property_id);
CREATE INDEX idx_occupied ON room(is_occupied);
CREATE INDEX idx_room ON contract(room_id);
CREATE INDEX idx_landlord ON contract(landlord_id);
CREATE INDEX idx_tenant ON contract(tenant_id);
CREATE INDEX idx_dates ON contract(start_date, end_date);
CREATE INDEX idx_contract ON payment(contract_id);
CREATE INDEX idx_status ON payment(payment_status);
CREATE INDEX idx_due_date ON payment(due_date);
CREATE INDEX idx_sender ON message(sender_id);
CREATE INDEX idx_receiver ON message(receiver_id);
CREATE INDEX idx_parent_message ON message(parent_message_id);
CREATE INDEX idx_read ON message(is_read);
CREATE INDEX idx_message ON message_attachment(message_id);
CREATE INDEX idx_user ON notification(member_id);
CREATE INDEX idx_read_notification ON notification(is_read);
CREATE INDEX idx_type_notification ON notification(type);
CREATE INDEX idx_inquiry ON inquiry(contract_id);
CREATE INDEX idx_inquiry_status ON inquiry(status);
CREATE INDEX idx_inquiry_type ON inquiry(inquiry_type);
CREATE INDEX idx_user_inquiry ON inquiry(member_id);
CREATE INDEX idx_user_reply ON inquiry_reply(member_id);

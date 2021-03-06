const db = require('./db')

const createContact = (contact) => {
  return db.query(`
    INSERT INTO
      contacts (first_name, last_name)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      contact.f_name,
      contact.l_name,
    ])
    .catch(error => error)
}

const getContacts = function(){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    `, [])
  .catch(error => error)
}

const getContact = (contactId) => {
  return db.one(`
    SELECT * FROM contacts WHERE id=$1::int LIMIT 1
    `,
    [contactId])
    .catch(error => error);
}

const deleteContact = (contactId) => {
  return db.query(`
    DELETE FROM
      contacts
    WHERE
      id=$1::int
    `, contactId)
    .catch(error => error)
}

const searchForContact = function(searchQuery){
  return db.query(`
    SELECT
      *
    FROM
      contacts
    WHERE
      lower(last_name || ' ' || first_name) LIKE $1::text
    `,
    [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`])
    .catch(error => error);
}

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact
}

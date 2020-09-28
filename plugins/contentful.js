const contentful = require('contentful')

const config = (process.env.NODE_ENV === 'development') ? {
  space: "p0gx8l77fr63",
  accessToken: "8h9JGA5AGTST6xRKi5_c6pvxEL8Ej-cIA5in_EPPD9A",
  host: 'preview.contentful.com'
} : {
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
}



module.exports = {
  createClient() {
    return contentful.createClient(config)
  }
}

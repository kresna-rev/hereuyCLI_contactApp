/*================= SYSTEM =================*/
// File System
const fs = require('fs')
//chalk
const chalk = require('chalk')
//validator
const validator = require('validator');
/*=========================================*/

//membuat folder data jika belum ada
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}

//membuat contacts.json jika belum ada
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

// fungsi untuk me-load data
const loadContact = () => {
  const file = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(file)
  return contacts
}

// fungsi untuk menyimpan data kontak
const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp }
  /*const file = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(file)*/
  const contacts = loadContact()

  //cek duplicate nama
  const duplikatNama = contacts.find((contact) => contact.nama === nama)
  if (duplikatNama) {
    console.log(
      chalk.red.inverse.bold('======== Contact sudah terdaftar, gunakan nama lain! ========')
      )
    return false
  }
  
  //cek email 
  if (!validator.isEmail(email)) {
    console.log(
      chalk.red.inverse.bold('======== Masukan email yang valid! ========')
    )
    return false
  }
  
  //cek no HP 
  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log(
      chalk.red.inverse.bold('======== Masukan nomor HP yang valid! ========')
    )
    return false
  }


  contacts.push(contact)
  
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

  console.log(chalk.green.inverse.bold('======== Data baru telah ditambahkan! ========'))
  
}

// fungsi untuk menampilkan daftar kontak
const listContact = () => {
  const contacts = loadContact()
  console.log(chalk.cyan.inverse.bold('======== Daftar Kontak ========'))
  contacts.forEach((contact, i) => {
    console.log(chalk.blue.inverse.italic(`${i + 1}. ~ ${contact.nama} : ${contact.noHp} `))
  })
}

// fungsi untuk menampilkan detail kontak
const detailContact = (nama) => {
  const contacts = loadContact()
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
  
  if (!contact) {
    console.log(
      chalk.red.inverse.bold(`======== ${nama} tidak terdaftar! ========`)
    )
    return false
  }
  
  console.log(chalk.cyan.inverse.bold('======== Detail Kontak ========'))
  console.log(chalk.blue.italic('~Nama : '+contact.nama))
  console.log(chalk.blue.italic('~No. Hp : '+contact.noHp))
  if (contact.email) {
    console.log(chalk.blue.italic('~Email : '+contact.email))
  }
}

// fungsi untuk menghapus kontak
const removeContact = (nama) => {
  const contacts = loadContact()
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
  
  if (contacts.length === newContacts.length) {
    console.log(
      chalk.red.inverse.bold(`======== ${nama} tidak ditemukan! ========`)
    )
    return false
  }
  
  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

  console.log(chalk.green.inverse.bold(`======== Data kontak ${nama} berhasil dihapus! ========`))
}


module.exports = { simpanContact, listContact, detailContact, removeContact }
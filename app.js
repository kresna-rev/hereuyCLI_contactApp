const yargs = require('yargs');
const { simpanContact, listContact, detailContact, removeContact } = require('./contacts');


// mengambil argument dari command line
// Menambahkan kontak baru
yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string',
    },
    noHp: {
      describe: 'Nomor HP',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHp)
  }
}).demandCommand()

// menampilkan daftar nama & no contact
yargs.command({
  command: 'list',
  describe: 'Menampilkan daftar nama & no hp contact',
  handler(){
    listContact()
  },
})

// Menampilkan detail contact
yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  }, 
  handler(argv){
    detailContact(argv.nama)
  },
})

// menghapus kontak berdasarkan nama
yargs.command({
  command: 'remove',
  describe: 'Menghapus sebuah contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  }, 
  handler(argv){
    removeContact(argv.nama)
  },
})


yargs.parse()





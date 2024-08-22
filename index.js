import express from "express";
import db from "./koneksi.js";
import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT

// http://localhost:3000/
//
// app.get("/", (req, res) => {
//   // select semua data dari table mahasiswa
//   const sql = "SELECT * FROM mahasiswa";
//   // mengirim query ke databse mysql
//   db.query(sql, (error, result) => {
//     // mengirim data ke client browser
//     res.send(result)
//   });
// });

// http://localhost:3000/find?nim=1001
// app.get("/find", (req, res) => {
//   // menangkap data query url
//   const nim = req.query.nim;
//   // menangkap semua data dari table mahasiswa berdasarkan nim
//   const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
//   // mengirim query ke databse mysql
//   db.query(sql, (error, result) => {
//     // mengirim data hasil ke client browser
//     res.json(result);
//   });
// });

// http://localhost:3000/create
app.post("/create", (req, res) => {
  // menangkap body dari response yang dikirim oleh thunderclient
  const { nim, nama_lengkap, kelas, alamat } = req.body;
  // insert ke mahasiswa dengan nilai nim, nama_lengkap, kelas, alamat dari body
  const sql =
    "INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (?,?,?,?)";
  db.query(sql, [nim, nama_lengkap, kelas, alamat], (error, result) => {
    // jika terdapat error
    if (error) {
      res.status(400);
      res.send(error);
    }
    // jika tidak ada error
    res.status(201);
    res.json(result);
  });
});

// http://localhost:3000/delete?nim=1001
// app.delete("/delete", (req, res) => {
//   const nim = req.query.nim;
//   const sql = "DELETE FROM mahasiswa WHERE nim = ?";
//   db.query(sql, [nim], (error, result) => {
//     if (error) {
//       res.status(400);
//       res.send(error);
//     }
//     res.status(200);
//     res.json("data berhasil dihapus");
//   });
// });

// user mengakses method put pada localhost:3000/update
// app.put("/update", (req, res) => {
//   // nim, query nim
//   const nim = req.query.nim;

//   //   menangkap req body
//   const { nama_lengkap, kelas, alamat } = req.body;
//   //   mengecek nim, nama
//   if (nim || nama_lengkap || kelas || alamat) {
//     // query Update table mahasiswa
//     const query = `UPDATE mahasiswa SET nama_lengkap = "${nama_lengkap}", kelas = "${kelas}", alamat= "${alamat}" WHERE nim = ${nim}`;

//     // mengirim query ke database
//     db.query(query, (error, result) => {
//       if (error) res.status(400).send(error.message);

//       res.json(result);
//     });
//   } else {
//     res.send("isi body nya");
//   }
// });

app.use("/", router);

app.listen(3000, () => {
  console.log("server berjalan di http://localhost:" + PORT);
});

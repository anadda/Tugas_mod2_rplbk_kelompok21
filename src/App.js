import "./App.css";

import React from "react";
import Form from "./component/Form";
import Card from "./component/Card";

function App() {
  const [Mahasiswa, setMahasiswa] = React.useState(null);
  const addMahasiswaHandler = (data) => {
    console.log(data);
    setMahasiswa(data);
  };
  const removeMahasiswaHandler = () => {
    setMahasiswa(null);
  };
  return (
    <div className="App">
      <h1>Kartu Mahasiswa</h1>
      <Form onAddMahasiswa={addMahasiswaHandler} />
      {/* Conditional rendering */}
      {Mahasiswa && (
        <>
          <Card
            nama_lengkap={Mahasiswa.nama_lengkap}
            nama_panggilan={Mahasiswa.nama_panggilan}
            nomor_telepon={Mahasiswa.nomor_telepon}
            id_line={Mahasiswa.id_line}
            tanggal_lahir={Mahasiswa.tanggal_lahir}
            nim={Mahasiswa.nim}
            email={Mahasiswa.email}
            hobi={Mahasiswa.hobi}
          />
          <button className="delete" onClick={removeMahasiswaHandler}>
            Hapus
          </button>
        </>
      )}
    </div>
  );
}

export default App;

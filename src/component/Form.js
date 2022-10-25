import React, { useEffect } from "react";
import "./Form.css";

const finddata = (mhs_data, data_search) => {
  let res;
  var mhs;
  res = mhs_data.filter((mhs) => {
    const lower = Object.values(mhs).map((val) => val.toString().toLowerCase());
    return (
      lower.findIndex((val) => val.includes(data_search.toLowerCase())) !== -1
    );
  });
  if (res.length === 0) {
    console.log("Data tidak ditemukan");
  } else if (res.length > 1) {
    console.log("Beberapa data ditemukan, mohon lebih spesifik");
  } else {
    mhs = res[0];
  }
  console.log(res);
  return res;
};

function Form(props) {
  const [nama, setNama] = React.useState("");
  const [kelompok, setKelompok] = React.useState("");
  const [namaIsValid, setNamaIsValid] = React.useState(null);
  const [kelompokIsValid, setKelompokIsValid] = React.useState(null);
  const [formIsValid, setFormIsValid] = React.useState(false);
  const data_url =
    "https://gist.githubusercontent.com/d4em0n/aa26675e79cacd3dfcfab1552e3ae37e/raw/997b218a855f76aad5e319aaee65f636d235b1e9/data_aegis.txt";
  useEffect(() => {
    console.log("Dipanggil nih bos");
    fetch(data_url)
      .then((result) => {
        return result.text();
      })
      .then((text) => {
        console.log(text);
        setDataMhs(eval(text));
      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      let result = finddata(datamhs, nama);

      if (result.length === 0) {
        console.log("gaada");
      } else if (result.lenght > 1) {
        console.log("ada banyak");
      } else {
        props.onAddMahasiswa({
          nama_lengkap: result[0].nama_lengkap,
          nama_panggilan: result[0].nama_panggilan,
          nomer_telepon: result[0].nomer_telepon,
          id_line: result[0].id_line,
          tanggal_lahir: result[0].tanggal_lahir,
          nim: result[0].nim,
          email: result[0].email,
          hobi: result[0].hobi,
        });
      }

      // console.log(result[0].nama_lengkap);
      setNama("");
    } else {
      alert("Form is not valid");
    }
  };
  const changeNamaHandler = (event) => {
    //* Set the value of the nama input to the value of the input
    setNamaIsValid(event.target.value.trim().length > 0);
    setNama(event.target.value);
  };

  useEffect(() => {
    // Similiar to componentDidMount and componentDidUpdate:
    //? This is called after the first render and after every update
    setFormIsValid(namaIsValid);
  }, [namaIsValid]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="nama">Search</label>
        <input
          className={namaIsValid === false ? "invalid" : ""}
          autoComplete="off"
          type="text"
          id="nama"
          nama="nama"
          value={nama}
          onChange={changeNamaHandler}
          onBlur={changeNamaHandler}
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

export default Form;

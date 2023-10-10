import { useState } from "react";
import "../App.css";
import { Alert } from "../components/Alert";
import { Bill } from "../components/Bill";
import fetch from "cross-fetch";

const App = () => {
  const [bills, setBills] = useState(undefined);
  const [pathFiles, setPathFiles] = useState("");
  const [show, setShow] = useState({ visible: false, message: "" });

  const handlePathChange = (e) => {
    const { value } = e.target;
    setPathFiles(value);
  };

  const fetchHello = (path) => {
    const apiUrl = `https://t8cza1119h.execute-api.us-east-1.amazonaws.com/AccountingStage/hello?folder=${path}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBills(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        return undefined;
      });
  };

  const handleFetch = (path) => {
    fetchHello(path);
  };

  return (
    <div className={"body"}>
      <div className={"header"}>{"Mi app contable"}</div>
      <Alert timeout={5000} show={show} setShow={setShow} />
      <div
        className={"form"}
        style={{
          boxShadow:
            pathFiles !== ""
              ? "#a6f4c5 0px 8px 12px 0px"
              : "rgba(16, 24, 40, 0.15) 0px 8px 12px 0px",
        }}
      >
        <div className={"input-container"}>
          <label>{"Ruta archivos"}</label>
          <input
            type={"text"}
            name={"path"}
            className={"input"}
            value={pathFiles}
            onChange={handlePathChange}
          />
          {pathFiles !== "" ? (
            <button
              className={"button"}
              onClick={() => handleFetch(pathFiles)}
              type={"submit"}
              style={{ marginTop: "8px" }}
            >
              {"Agregar facturas"}
            </button>
          ) : undefined}
        </div>
      </div>

      {bills !== undefined && bills.data !== undefined ? (
        <div className={"bills"}>
          {bills.data.map((bill) => {
            return (
              <Bill
                key={`${bill.issue_date}${bill.id}`}
                values={bill}
                billsList={bills.data}
                setBills={setBills}
                show={show}
                setShow={setShow}
              />
            );
          })}
        </div>
      ) : undefined}
    </div>
  );
};

export default App;

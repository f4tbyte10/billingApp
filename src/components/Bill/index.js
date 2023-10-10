import { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Alert } from "../Alert";
import { filledFields, filledFieldsArray } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-regular-svg-icons";

const Bill = ({ values, billsList, setBills, show, setShow }) => {
  const [form, setForm] = useState(values);
  const [collapse, setCollapse] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleNestedInputChange = (e, index) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      items: form.items.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      ),
    });
  };

  const handleSubmit = () => {
    setShow({ visible: true, message: `Factura ${form.id} registrada` });
    setCanSubmit(false);
    const newBills = billsList.filter((bill) => bill.id !== form.id);
    setBills({ data: newBills });
  };

  useEffect(() => {
    setCanSubmit(filledFields(form) && filledFieldsArray(form.items));
  }, [form]);

  console.log(form)

  return (
    <div className={"bill-container"}>
      <Alert
        message={"Movimiento registrado"}
        timeout={5000}
        show={show}
        setShow={setShow}
      />
      <div className={"form"}>
        <div className={"form-header"} onClick={handleCollapse}>
          <span>{`${form.company_name} / ${form.id} / ${form.issue_date}`}</span>
          <FontAwesomeIcon
            icon={collapse ? faArrowAltCircleUp : faArrowAltCircleDown}
          />
        </div>
        {collapse ? (
          <Fragment>
            <div className={"input-container"}>
              <label>{"Fecha de Emisión"}</label>
              <input
                type={"date"}
                name={"issue_date"}
                className={"input"}
                value={form.issue_date}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Tipo identificador"}</label>
              <input
                type={"text"}
                name={"company_id_type"}
                className={"input"}
                value={form.company_id_type}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"ID"}</label>
              <input
                type={"text"}
                name={"company_id"}
                className={"input"}
                value={form.company_id}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Número Consecutivo"}</label>
              <input
                type={"text"}
                name={"company_verification_digit"}
                className={"input"}
                value={form.company_verification_digit}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Identificador cuenta"}</label>
              <input
                type={"text"}
                name={"account_id"}
                className={"input"}
                value={form.account_id}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Nombre de la cuenta"}</label>
              <input
                type={"text"}
                name={"account_name"}
                className={"input"}
                value={form.account_name}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"CIIU"}</label>
              <input
                type={"text"}
                name={"ciiu"}
                className={"input"}
                value={form.ciiu}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Razón Social"}</label>
              <input
                type={"text"}
                name={"company_name"}
                className={"input"}
                value={form.company_name}
                onChange={handleInputChange}
              />
            </div>
            <div className={"input-container"}>
              <label>{"Términos de Pago"}</label>
              <input
                type={"text"}
                name={"payment_type"}
                className={"input"}
                value={form.payment_type}
                onChange={handleInputChange}
              />
            </div>
            <div className={"detail-input-container"}>
              <label>{"Detalles"}</label>
              <div className={"detail-inputs"}>
                <div className={"detail-input"}>
                  <label>{"Articulo"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Precio"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Cantidad"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Impuesto"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Porcentaje impuesto"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Descuento"}</label>
                </div>
                <div className={"detail-input"}>
                  <label>{"Total"}</label>
                </div>
              </div>
              {form.items.map((_, index) => {
                return (
                  <div
                    key={`${index}`}
                    className={"detail-inputs"}
                  >
                    <div className={"detail-input"}>
                      <input
                        type={"text"}
                        name={"name"}
                        className={"input"}
                        value={form.items[index].name}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"number"}
                        name={"price"}
                        className={"input"}
                        value={form.items[index].price}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"number"}
                        name={"quantity"}
                        className={"input"}
                        value={form.items[index].quantity}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"number"}
                        name={"tax"}
                        className={"input"}
                        value={form.items[index].tax}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"text"}
                        name={"tax_type"}
                        className={"input"}
                        value={form.items[index].tax_type}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"number"}
                        name={"discount"}
                        className={"input"}
                        value={form.items[index].discount}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                    <div className={"detail-input"}>
                      <input
                        type={"number"}
                        name={"total"}
                        className={"input"}
                        value={form.items[index].total}
                        onChange={(e) => handleNestedInputChange(e, index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={"input-container"}>
              <label>{"Total"}</label>
              <input
                type={"number"}
                name={"total"}
                className={"input"}
                value={form.total}
                onChange={handleInputChange}
              />
            </div>
            {canSubmit ? (
              <div className={"button-container w-100"}>
                <button
                  className={"button form-button"}
                  type={"submit"}
                  onClick={() => handleSubmit()}
                >
                  {"Guardar"}
                </button>
              </div>
            ) : undefined}
          </Fragment>
        ) : undefined}
      </div>
    </div>
  );
};

export { Bill };

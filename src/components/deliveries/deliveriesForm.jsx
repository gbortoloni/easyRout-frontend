import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";

export default function DeliveriesForm({addDelivery}) {
  const API_KEY = "AIzaSyCOi3ME8PSOY24X9tcFvC8s6vwLPS4-iLs";  
  const googleGeolocation =
    "https://maps.googleapis.com/maps/api/geocode/json?address=";

    const [data, setData] = useState({
      delivery: {
        nomeCliente: "",
        pesoCarga: "",
        enderecoEntrega: {
          logradouro: "",
          numero: "",
          bairro: "",
          complemento: "",
          cidade: "",
          estado: "",
          pais: "",
          geolocalizacao: {
            latitude: "",
            longitude: ""
          }
        }
      }
    });

  let objeto = {
    nomeCliente: "",
    pesoCarga: "",
    enderecoEntrega: ""
  };

  useEffect(() => {
    // console.log(data);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    addDelivery(data)
  };

  const handleLocation = e => {
    e.preventDefault();
    let endereco = objeto.enderecoEntrega;
    const tratar = endereco.split(" ");
    for (let i = 0; i < tratar.length; i++) {
      endereco = endereco.replace(" ", "+");
    }

    const response = axios.get(
      `${googleGeolocation}${endereco}&key=${API_KEY}`
    );
    response.then(resp => {
      const { results } = resp.data;
      setData({
        delivery: {
          nomeCliente: objeto.nomeCliente,
          pesoCarga: objeto.pesoCarga,
          enderecoEntrega: {
            logradouro: results[0].address_components[1].long_name,
            numero: results[0].address_components[0].long_name,
            bairro: results[0].address_components[2].long_name,
            complemento: "",
            cidade: results[0].address_components[3].long_name,
            estado: results[0].address_components[4].long_name,
            pais: results[0].address_components[5].long_name,
            geolocalizacao: {
              latitude: results[0].geometry.location.lat,
              longitude: results[0].geometry.location.lng
            }
          }
        }
      });
    });
  };

  return (
    <div className="formulario">
      <Form>
        <FormGroup>
          <Input
            type="text"
            name="nomeCliente"
            id="nomeCliente"
            placeholder="Nome Cliente"
            onChange={e =>
              (objeto = { ...objeto, nomeCliente: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="pesoEntrega"
            id="pesoEntrega"
            placeholder="Peso da Entrega"
            onChange={e =>
              (objeto = {
                ...objeto,
                pesoCarga: e.target.value
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <div className="buttonInside">
            <Input
              type="text"
              name="enderecoEntrega"
              id="enderecoEntrega"
              placeholder="Endereço Cliente"
              onChange={e =>
                (objeto = {
                  ...objeto,
                  enderecoEntrega: e.target.value
                })
              }
            />
            <button className="find" onClick={handleLocation}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                name="latitude"
                id="latitude"
                placeholder="Latitude"
                value={data.delivery.enderecoEntrega.geolocalizacao.latitude}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                name="longitude"
                id="longitude"
                placeholder="Longitude"
                value={data.delivery.enderecoEntrega.geolocalizacao.longitude}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <Button onClick={handleSubmit} color="success">CADASTRAR CLIENTE</Button>
          </Col>
          <Col md={6}>
            <Button color="danger">RESETAR CADASTRO</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

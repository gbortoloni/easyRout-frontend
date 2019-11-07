import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";

import Mapa from "../map/map";
import DeliveriesList from "../deliveries/deliveriesList";
import DeliveriesForm from "../deliveries/deliveriesForm";

export default function Deliveries() {
  const BASE_URL = "http://localhost:3003/api";

  const [deliveries, setDeliveries] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [remove, setRemove] = useState([]);


  async function fetchData() {
    const response = await axios.get(`${BASE_URL}/deliveries`);
    const { data } = await response;

    setDeliveries(data);
  }

  const addDelivery = data => {
    axios.post(`${BASE_URL}/deliveries`, data).then(resp => {
      setDelivery(resp.data);
    });
  };

  const removeDelivery = data => {
    axios.delete(`${BASE_URL}/deliveries/${data._id}`).then(resp => {
      setRemove(data);
    })
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [delivery]);

  useEffect(() => {
    fetchData();
  }, [remove]);

  return (
    <Row>
      <Col xs="4">
        <DeliveriesForm addDelivery={addDelivery}></DeliveriesForm>
      </Col>
      <Col xs="8">
        <Mapa deliveries={deliveries}></Mapa>
      </Col>
      <DeliveriesList
        deliveries={deliveries}
        removeDelivery={removeDelivery}
      ></DeliveriesList>
    </Row>
  );
}

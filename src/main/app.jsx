import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
import { Container } from "reactstrap";

// import Map from "../components/map/map";
import Deliveries from "../components/deliveries/deliveries";

export default props => (
  <Container>
    <Deliveries></Deliveries>
  </Container>
);

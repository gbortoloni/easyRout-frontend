import React from "react";
import { Table, Button } from "reactstrap";

export default function DeliveriesList({ deliveries }) {
  function renderRows() {
    return deliveries.map(delivery => (
      <tr key={delivery._id}>
        <td>{delivery.nomeCliente}</td>
        <td>{delivery.enderecoEntrega.logradouro}</td>
        <td>{delivery.enderecoEntrega.cidade}</td>
        <td>{delivery.enderecoEntrega.pais}</td>
        <td>{delivery.pesoCarga}</td>
        <td>{delivery.enderecoEntrega.geolocalizacao.latitude}</td>
        <td>{delivery.enderecoEntrega.geolocalizacao.longitude}</td>
        <td>
          <Button color="danger">
            <i className="fa fa-trash-o"></i>
          </Button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="tabela">
      <Table hover>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Rua</td>
            <td>Cidade</td>
            <td>País</td>
            <td>Peso</td>
            <td>Lat</td>
            <td>Lng</td>
            <td>Ação</td>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </div>
  );
}

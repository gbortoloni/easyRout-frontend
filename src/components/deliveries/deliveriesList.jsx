import React from "react";
import { Table, Button } from "reactstrap";

export default function DeliveriesList({ deliveries }) {
  const countClientes = deliveries.length;
  const totalClientes = `Total de Clientes: ${countClientes}; `;
  const cargas = deliveries.map(delivery => delivery.pesoCarga);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const somaCargas = cargas.reduce(reducer, 0);
  const totalCargas = `Peso Total: ${somaCargas} kg; `;
  const media = `Ticket Médio: ${somaCargas / countClientes}`;

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
      <h3>
        {totalClientes}
        {totalCargas}
        {media}
      </h3>
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

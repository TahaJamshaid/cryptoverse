import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isLoading } = useGetCryptosQuery();

  const cryptos = cryptoList?.data?.coins;
  const [coinsList, setCoinsList] = useState();

  return (
    <Row gutter={[24, 24]} className="crypto-card-container">
      {cryptos.map((crypto) => (
        <Col xs={24} sm={12} lg={6} key={crypto.uuid}>
          <Link to={`/crypto/${crypto.name}`}>
            <Card
              key={crypto.uuid}
              className="crypto-card"
              title={`${crypto.rank}. ${crypto.name}`}
              hoverable
              extra={
                <img
                  src={crypto.iconUrl}
                  alt="crypto icon"
                  className="crypto-image"
                />
              }
            >
              <p>Price: {millify(crypto.price)}$</p>
              <p>Market Cap: {millify(crypto.marketCap)}$</p>
              <p>Daily Change: {millify(crypto.change)}%</p>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default Cryptocurrencies;

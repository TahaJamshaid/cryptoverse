import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Input, Card, Row, Col } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  // const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching, error } = useGetCryptosQuery();

  const crypto = simplified
    ? cryptoList?.data?.coins.slice(0, 10)
    : cryptoList?.data?.coins;

  const [coinsList, setCoinsList] = useState(crypto);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(crypto);

  // let filteredCoins = cryptos;
  useEffect(() => {
    if (isFetching || error) {
      setCoinsList([]);
      return;
    }

    const filteredCoins = crypto.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoinsList(filteredCoins);
  }, [searchTerm, error, isFetching]);

  if (isFetching) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Please Check your internet connection. Network Request Failed</p>;
  }

  console.log(coinsList);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            type="text"
            placeholder="Search Cryptocurrencies"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      )}
      <Row gutter={[24, 24]} className="crypto-card-container">
        {coinsList.map((crypto) => (
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
    </>
  );
};

export default Cryptocurrencies;

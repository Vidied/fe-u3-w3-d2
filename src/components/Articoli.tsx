import { useState, useEffect } from "react";
import { Alert, Container, Spinner, Row, Col, Card } from "react-bootstrap";
import type { SpaceFlightNews } from "../interfaces/Articolo";
import dataArticolo from "./dataArticolo";
import { Link } from "react-router";

const Articoli = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [articoli, setArticoli] = useState<SpaceFlightNews[]>([]);

  useEffect(() => {
    const fetchArticoli = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v4/articles/",
        );
        const data = await response.json();
        setArticoli(data.results);
      } catch (err) {
        console.error("Errore nella fetch", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticoli();
  }, []);
  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) return <Alert variant="danger">Errore!</Alert>;

  return (
    <Container>
      <h1>Missioni spaziali!</h1>
      <Row>
        {articoli.map((article) => (
          <Col key={article.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm" style={{ cursor: "pointer" }}>
              <Card.Img
                variant="top"
                src={article.image_url}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h5">{article.title}</Card.Title>
                <Card.Text className="text-muted small">
                  Pubblicato il: {dataArticolo(article.published_at)} -
                  {article.summary.substring(0, 150)}...
                </Card.Text>
                <Link
                  to={`/dettaglio/${article.id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  Leggi di più
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articoli;

import { useParams } from "react-router";
import type { SpaceFlightNews } from "../interfaces/Articolo";
import { useEffect, useState } from "react";
import { Spinner, Alert, Container } from "react-bootstrap";
import DataArticolo from "./dataArticolo";

const DettaglioArticolo = () => {
  const { id } = useParams<{ id: string }>();
  const [articolo, setArticolo] = useState<SpaceFlightNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDettaglio = async () => {
      try {
        const response = await fetch(
          `https://api.spaceflightnewsapi.net/v4/articles/${id}`,
        );
        const data = await response.json();
        setArticolo(data);
      } catch (err) {
        console.error("Errore nel fetch", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDettaglio();
  }, [id]);

  const renderContent = () => {
    if (loading)
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    if (error || !articolo) return <Alert variant="danger">Errore!</Alert>;

    return (
      <Container className="mt-5">
        <h1>{articolo.title}</h1>
        <img
          src={articolo.image_url}
          alt={articolo.title}
          className="img-fluid my-4"
        />
        <p className="lead space-text2">{articolo.summary}</p>
        <div className="d-flex justify-content-between">
          <p>Fonte: {articolo.news_site}</p>Pubblicato il:{" "}
          {DataArticolo(articolo.published_at)}
        </div>
      </Container>
    );
  };
  return (
    <Container className="mt-0 min-vh-100 bg-space pt-5">
      {renderContent()}
    </Container>
  );
};

export default DettaglioArticolo;

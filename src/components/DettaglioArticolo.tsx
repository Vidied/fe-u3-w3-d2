import { useParams } from "react-router";
import type { SpaceFlightNews } from "../interfaces/Articolo";
import { useEffect, useState } from "react";
import { Spinner, Alert, Container } from "react-bootstrap";

const DettaglioArticolo = () => {
  const { id } = useParams<{ id: string }>();
  const [articolo, setArticolo] = useState<SpaceFlightNews>(null);
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

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) return <Alert variant="danger">Errore!</Alert>;

  return (
    <Container className="mt-5">
      <h1>{articolo.title}</h1>
      <img
        src={articolo.image_url}
        alt={articolo.title}
        className="img-fluid my-4"
      />
      <p className="lead">{articolo.summary}</p>
      <p>Fonte: {articolo.news_site}</p>
    </Container>
  );
};

export default DettaglioArticolo;

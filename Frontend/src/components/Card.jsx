import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function MyCard(props) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body
          className="d-flex flex-column m-auto"
          style={{ justifyContent: "space-between" }}
        >
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Button
            variant="success"
            onClick={() => (window.location.href = `${props.link}`)}
          >
            Know more
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default MyCard;

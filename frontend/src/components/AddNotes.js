import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Axios from'axios';

function AddNotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [impWords, setimpWords] = useState("");

  const handleSubmit = (e) => {
    //to prevent default refresh
    e.preventDefault();
    console.log({ title, content, impWords });
    Axios.post('http://localhost:4000/notes/add',{title : title,content : content , imp_words : impWords})
    .then(() => alert("Notes Created"))
    .catch(() => alert("Error Occured"))
    setTitle("");
    setContent("");
    setimpWords("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the Content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="imp_words">
          <Form.Label>Add important words relevant to the content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the important words"
            onChange={(e) => setimpWords(e.target.value)}
            value={impWords}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddNotes;

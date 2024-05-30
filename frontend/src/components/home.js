import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function ListNotes() {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:4000/notes")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:4000/notes/de/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
        alert("Note Deleted");
      })
      .catch((err) => {
        console.error(err);
        alert("Error Occurred: " + err.message);
      });
  };

  const handleEdit = (note) => {
    setEditNote(note);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:4000/notes/update/${editNote._id}`, editNote)
      .then(() => {
        setNotes(notes.map(note => (note._id === editNote._id ? editNote : note)));
        setEditNote(null);
        alert("Note Updated");
      })
      .catch((err) => {
        console.error(err);
        alert("Error Occurred: " + err.message);
      });
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Content</th>
            <th>Important Words</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{note.imp_words}</td>
              <td><Button variant="warning" onClick={() => handleEdit(note)}>Edit</Button>{' '}</td>
              <td><Button variant="danger" onClick={() => handleDelete(notes.id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={!!editNote} onHide={() => setEditNote(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editNote && (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="editTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={editNote.title}
                  onChange={(e) => setEditNote({
                    ...editNote,
                    title: e.target.value
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="editContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Content"
                  value={editNote.content}
                  onChange={(e) => setEditNote({
                    ...editNote,
                    content: e.target.value
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="editImpWords">
                <Form.Label>Important Words</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the important words"
                  value={editNote.imp_words}
                  onChange={(e) => setEditNote({
                    ...editNote,
                    imp_words: e.target.value
                  })}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ListNotes;

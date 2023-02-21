import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Comment post</Form.Label>
        <Form.Control
          placeholder="Enter Comment"
          className="formInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          as="textarea"
          style={{ height: "100px" }}
        />
      </Form.Group>
      <div class="commentbtn">
      <button className="btn-comment">{submitLabel}</button>
      </div>
    </Form>
  );
}

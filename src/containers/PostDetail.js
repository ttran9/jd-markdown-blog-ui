import React, { useState } from "react";
import { Container, Header, Image, Button, Modal } from "semantic-ui-react";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { useFetch } from "../helpers";

const DeleteModal = ({ title, postSlug, thumbnail, props }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  function handleSubmit() {
    setLoading(true);
    axios
      .delete(api.posts.delete(postSlug), {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token 0ad282a6d3b70edba402d703fe4b554875c26ba9",
        },
      })
      .then((res) => {
        setLoading(false);
        // history.push("/"); // redirect back to the post list.
        props.history.push("/"); // redirect back to the post list.
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message || err);
      });
  }

  const [open, toggle] = useState(false);

  return (
    <Modal
      trigger={
        <Button secondary floated="right" onClick={() => toggle(true)}>
          Delete post
        </Button>
      }
      open={open}
      onClose={() => toggle(false)}
      small="small"
    >
      <Modal.Header>Delete Post</Modal.Header>
      <Modal.Content image>
        <Image wrapped size="medium" src={thumbnail} />
        <Modal.Description>
          <Header>{title}</Header>
          {error && <Message danger message={error} />}
          <p>Are you sure you want to delete this post?</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => toggle(false)}>
          No
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Confirm delete"
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
        />
      </Modal.Actions>
    </Modal>
  );
};

const PostDetail = (props) => {
  // can get params from a hook from react router dom package.
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));

  return (
    <Container text>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {data && (
        <div>
          <Image src={data.thumbnail} />
          <Header as="h1">{data.title}</Header>
          <Header as="h4">
            Last Updated:{" "}
            {`${new Date(data.last_updated).toLocaleDateString()}`}
          </Header>
          {<p>{data.content}</p>}
          <DeleteModal
            postSlug={postSlug}
            title={data.title}
            thumbnail={data.thumbnail}
            props={props}
          />
        </div>
      )}
    </Container>
  );
};

export default PostDetail;

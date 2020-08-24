import React, { useState } from "react";
import {
  Container,
  Header,
  Image,
  Button,
  Modal,
  Divider,
} from "semantic-ui-react";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, NavLink } from "react-router-dom";
import { api } from "../api";
import { useFetch } from "../helpers";
import ReactMarkdown from "react-markdown";
import { authAxios } from "../services";

const DeleteModal = ({ title, postSlug, thumbnail, props }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  function handleSubmit() {
    setLoading(true);
    authAxios
      .delete(api.posts.delete(postSlug))
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

const Blockquote = (props) => {
  return <blockquote>{props.value ? props.value : props.children}</blockquote>;
};

const Renderers = {
  blockquote: Blockquote,
};

const PostDetail = (props) => {
  // can get params from a hook from react router dom package.
  const { postSlug } = useParams();
  const { data, loading, error } = useFetch(api.posts.retrieve(postSlug));

  return (
    <Container text style={{ paddingTop: 10, paddingBottom: 10 }}>
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
          <ReactMarkdown source={data.content} renderers={Renderers} />
          <Divider />

          {data.is_author && (
            <>
              <NavLink to={`/posts/${postSlug}/update`}>
                <Button color="yellow">Update</Button>
              </NavLink>
              <DeleteModal
                postSlug={postSlug}
                title={data.title}
                thumbnail={data.thumbnail}
                props={props}
              />
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default PostDetail;

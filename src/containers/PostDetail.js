import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // can get params from a hook from react router dom package.
  const { postSlug } = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // the response is asynchronous so we can use await (wait for the call from axios)
        const res = await axios.get(
          `http://127.0.0.1:8000/api/posts/${postSlug}`
        );
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Container text>
      <Header>{post && post.title}</Header>
      {error && <Message negative message={error} />}
      {loading && <Loader />}
      {post && <p>{post.content}</p>}
    </Container>
  );
};

export default PostDetail;

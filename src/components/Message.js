import React from "react";
import { Message } from "semantic-ui-react";

export default ({ message, info, positive, warning, negative }) => (
  // properties are passed into the message component.
  <Message info positive warning negative>
    {message}
  </Message>
);

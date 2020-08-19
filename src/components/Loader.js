import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

// anonymous function because there is already a loader from semantic ui.
export default () => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      ;
    </Segment>
  );
};

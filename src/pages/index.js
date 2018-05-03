import React from 'react';

import { Heading1, Paragraph } from '../components/common/styled/typography';

import Button from '../components/common/Button/index'

const IndexPage = () => {
  return (
    <main>
      <Heading1>Create polls on the go!</Heading1>
      <Paragraph>
        Built from the ground up - Ut pariatur velit eu fugiat ut. Veniam
        commodo non esse proident ut anim irure voluptate commodo aliqua tempor
        Lorem excepteur cupidatat. Nulla commodo ex laboris eu sit nisi
        exercitation dolore labore qui elit non Lorem minim. Voluptate pariatur
        anim esse irure ipsum ut pariatur. Mollit occaecat velit occaecat sint
        pariatur tempor. Consectetur culpa tempor dolore amet officia dolore
        nulla nisi sunt ea.
      </Paragraph>
      
      <Button to="/new" type="positive" icon="add-circle" iconSize={18}>New Poll</Button>
      
    </main>
  );
};

export default IndexPage;

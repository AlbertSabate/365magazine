import React from 'react';
import SchemaTypes from './types';

const StepPreview = ({ step }) => (
  <div style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
  >
    <span>{step}</span>
  </div>
);

const RecipeStep = {
  name: SchemaTypes.RecipeStep,
  title: 'Recipe Step',
  type: 'object',
  fields: [
    {
      name: 'step',
      title: 'Step',
      type: 'number',
    },
    {
      name: 'content',
      title: 'Content',
      type: SchemaTypes.RecipeStepContent,
    },
  ],

  preview: {
    select: {
      step: 'step',
      content: 'content',
    },
    prepare: ({ step, content }) => ({
      media: <StepPreview step={step} />,
      title: content && content[0]?.children.find((c) => !!c.text).text.concat('...'),
    }),
  },
};

export default RecipeStep;

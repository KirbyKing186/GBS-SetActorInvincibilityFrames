const id = "EVENT_SET_ACTOR_INVINCIBILITY_FRAMES";
const groups = ["EVENT_GROUP_ACTOR"];
const subgroups = ["EVENT_GROUP_ACTOR"];
const name = "Set Actor Invincibility Frames";

const fields = [

  {
    key: "frames",
    label: "Invincibility Frames",
    type: "number",
    min: 0,
    max: 255,
    defaultValue: {
        type: "number",
        value: 20,
		},
    },
];

const compile = (input, helpers) => {
  const { 
    engineFieldSetToValue,
  } = helpers;
  engineFieldSetToValue("custom_iframes", input.frames);
};

module.exports = {
  id,
  name,
  groups,
  fields,
  compile,
  allowedBeforeInitFade: true,
};
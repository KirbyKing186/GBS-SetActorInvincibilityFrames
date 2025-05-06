const id = "EVENT_STORE_ACTOR_INVINCIBILITY_FRAMES";
const groups = ["EVENT_GROUP_ACTOR"];
const subgroups = ["EVENT_GROUP_ACTOR"];
const name = "Store Actor Invincibility Frames In Variable";

const fields = [
  {
    key: "variable",
    label: "Variable",
    type: "variable",
    defaultValue: "LAST_VARIABLE",
  },
];

const compile = (input, helpers) => {
  const { appendRaw, getVariableAlias, _addComment } = helpers;
  const variableAlias = getVariableAlias(input.variable);
  
  _addComment("Store Actor Invincibility Frames In Variable");
  appendRaw(
    `VM_GET_UINT8 ${variableAlias}, _custom_iframes`
  );
};

module.exports = {
  id,
  name,
  groups,
  fields,
  compile,
  allowedBeforeInitFade: true,
};
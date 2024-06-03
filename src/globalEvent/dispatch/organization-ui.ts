const prefix = "organization-ui";

export const me = (data: Object) => {
  const eventName = `${prefix}_me`;
  const event = new CustomEvent(eventName, {
    detail: data,
  } as object);
  window.dispatchEvent(event);
};

export default {
  me,
};

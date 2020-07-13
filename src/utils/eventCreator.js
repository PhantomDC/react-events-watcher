export const eventCreator = (name, data) => {
  return new CustomEvent(name, { detail: data });
}
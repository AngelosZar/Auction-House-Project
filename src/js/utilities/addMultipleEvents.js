export const addMultipleEvents = function (element, events, handler) {
  events.forEach((event) => element.addEventListener(event, handler));
  return () => {
    events.forEach((event) => element?.removeEventlistener(event, handler));
  };
};

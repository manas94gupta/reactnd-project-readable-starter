export const genericAsyncErrorWrapper = fn =>
  fn.catch(err => console.error(err));

export const firstToUpperCase = text =>
  `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;

export const catchAsyncActionsErrors = fn => dispatch =>
  fn(dispatch).catch(err => {
    console.error(err);
  });

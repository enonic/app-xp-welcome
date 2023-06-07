type CustomMouseKeyboardEvent<T extends HTMLElement = HTMLElement> = React.MouseEvent<T> | React.KeyboardEvent<T>;
export type MouseKeyboardEvent = CustomMouseKeyboardEvent<HTMLElement>;

export type ReactKeyboardHandler<T> = (event: React.KeyboardEvent<T>) => void;
export type ReactMouseHandler<T> = (event: React.MouseEvent<T>) => void;

export type KeyboardHandler = (event: KeyboardEvent) => void;
export type MouseHandler = (event: MouseEvent) => void;

export interface KeyboardEventWithTarget<T extends HTMLElement = HTMLElement>
  extends React.KeyboardEvent<T> {
  target: T;
}
export type TargetedKeyboardHandler<T extends HTMLElement> = (event: KeyboardEventWithTarget<T>) => void;

//
//* KEYBOARD & MOUSE
//

export function createKeyboardSelectionHandler<T extends HTMLElement = HTMLElement>(
  callback: TargetedKeyboardHandler<T>,
): ReactKeyboardHandler<T> {
  return (event: React.KeyboardEvent<T>): void => {
    if (isSelectKey(event) && hasTarget(event)) {
      stopFurtherEvents(event);
      callback(event);
    }
  };
}

export function createKeyboardApplyHandler<T extends HTMLElement = HTMLElement>(
  callback: TargetedKeyboardHandler<T>,
): ReactKeyboardHandler<T> {
  return (event: React.KeyboardEvent<T>): void => {
    if (isApplyKey(event) && hasTarget(event)) {
      stopFurtherEvents(event);
      callback(event);
    }
  };
}

export function createMouseHandler<T extends HTMLElement = HTMLElement>(
  callback: ReactMouseHandler<T>,
): ReactMouseHandler<T> {
  return (event: React.MouseEvent<T>): void => {
    stopFurtherEvents(event);
    callback(event);
  };
}

function hasTarget<T extends HTMLElement>(event: React.KeyboardEvent<T>): event is KeyboardEventWithTarget<T> {
  return event.target instanceof HTMLElement;
}

export function stopFurtherEvents(event: MouseKeyboardEvent): void {
  event.stopPropagation();
  event.preventDefault();
}

export function isApplyKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return event.code === 'Enter' || event.code === 'NumpadEnter';
}

export function isSelectKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isApplyKey(event) || event.code === 'Space';
}

export function isEscapeKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return event.code === 'Escape';
}

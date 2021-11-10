import React from "react";

// You can import global CSS files here.

import "../src/styles/main.css"
import { CoreApp } from "src/pages/_app";

// No-op wrapper.
export const Wrapper: React.FC = ({ children }) => {
  return (
    <CoreApp>{children}</CoreApp>
  );
};

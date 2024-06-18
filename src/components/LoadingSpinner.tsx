import { Spinner } from "@nextui-org/react";
import React, { ReactElement } from "react";

interface LoadingSpinnerProps {
  label?: string;
}

function LoadingSpinner({ label }: LoadingSpinnerProps): ReactElement {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner label={label || "Loading..."} color="secondary" labelColor="secondary" />
    </div>
  );
}

export default LoadingSpinner;

import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react";
import React, { ReactElement, ReactNode } from "react";

interface Props {
  header: ReactNode | string;
  body: ReactNode;
  footer?: ReactNode;
}

function CardInnerWrapper({ header, body, footer }: Props): ReactElement {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-pink-600 italic">
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-secondary">{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  );
}

export default CardInnerWrapper;

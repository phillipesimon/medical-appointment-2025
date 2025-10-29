import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../../error/custom.error";
import { JWTToken } from "../../token/jwt.token";

export const ensureAuthenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const headerAuth = request.headers.authorization;

  if (!headerAuth) {
    return response.status(401).json({
      error: "Header is missing",
    });
  }

  const [, token] = headerAuth.split(" ");

  if (!token) {
    return response.status(401).json({
      error: "Token is missing",
    });
  }

  const verifyToken = new JWTToken().validate(token);

  if (verifyToken) {
    request.userId = verifyToken.sub;
    return next();
  }

  return response.status(401).json({
    error: "Token invalid",
  });
};

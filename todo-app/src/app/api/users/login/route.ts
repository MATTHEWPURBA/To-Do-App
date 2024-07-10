import { getUserByEmail } from "@/db/models/user";

import { NextResponse } from "next/server";
import { string, z } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const rahasia = process.env.JWT_SECRET as string;

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const user = await getUserByEmail(body.email);
    if (!user) {
      return NextResponse.json(
        {
          message: "invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = bcryptjs.compareSync(body.password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "invalid username or password",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      rahasia
    );

    const response = NextResponse.json({
      message: "User login Successfully",

    });

    response.cookies.set("Authorization", `Bearer ${accessToken}`, { httpOnly: true, secure: true, maxAge: 3600 });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.issues[0].message }, { status: 400 }); // Bad request status for validation errors
    } else {
      return NextResponse.json({ error: "Failed to authenticate user" }, { status: 500 }); // Internal server error for other errors
    }
  }
};

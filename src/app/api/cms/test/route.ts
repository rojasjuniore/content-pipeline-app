import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { platform, siteUrl, username, apiKey } = await req.json();

    if (platform === "wordpress") {
      const response = await fetch(`${siteUrl}/wp-json/wp/v2/users/me`, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${username}:${apiKey}`).toString("base64")}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        return NextResponse.json({
          success: true,
          message: `Connected as ${user.name}`,
          user: { id: user.id, name: user.name },
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Authentication failed. Check credentials.",
        });
      }
    }

    return NextResponse.json({
      success: false,
      message: `Platform ${platform} not yet supported`,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: String(error),
    });
  }
}

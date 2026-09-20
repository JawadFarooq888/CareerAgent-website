// Paddle Billing configuration. All values come from your Paddle dashboard
// (Developer Tools > Authentication for the client-side token, and Catalog >
// Products for price IDs). Leave PADDLE_CLIENT_TOKEN unset to keep pricing
// CTAs pointing at the consultation/contact flow instead of checkout.
export const paddleConfig = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? "",
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV ?? "sandbox") as "sandbox" | "production",
};

export function isPaddleConfigured(): boolean {
  return paddleConfig.clientToken.length > 0;
}

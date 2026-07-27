# install (npm install)
@aws-sdk/client-s3
@aws-sdk/s3-request-presigner

npm uninstall @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install @vercel/blob

# obtener credenciales de vercel
npx vercel env pull .env.local


# para:
Error: Your codebase isn’t linked to a project on Vercel.
Run `vercel link` to begin.
# entonces: el CLI todavía no sabe cuál de tus proyectos en Vercel corresponde a esta carpeta local.
npx vercel link
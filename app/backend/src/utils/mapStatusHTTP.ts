export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'UNAUTHORIZED': return 401;
    case 'NOT_FOUND': return 404;
    case 'BAD_REQUEST': return 400;
    case 'CONFLICT': return 409;
    case 'SUCCESSFUL': return 200;
    case 'CREATED': return 201;
    case 'UNPROCESSABLE_ENTITY': return 422;
    default: return 500;
  }
}

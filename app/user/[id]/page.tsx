export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <div>User Profile: {id}</div>;
}

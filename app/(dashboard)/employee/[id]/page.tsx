export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  return <div className="w-full h-full pt-10">My Post: {id}</div>;
}

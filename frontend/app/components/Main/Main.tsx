export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      {children}
    </main>
  );
}

import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaRegSmile } from "react-icons/fa";

// Server Component
export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Next.js Full Stack Application</h1>
      <h3 className="text-2xl font-semibold">User Session Data</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              variant="bordered"
              startContent={<FaRegSmile size={20} />}
              color="primary"
            >
              Sign Out
            </Button>
          </form>
        </div>
      ) : (
        "Not Sign In"
      )}
    </div>
  );
}
